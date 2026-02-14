import { jStat } from 'jstat';

export interface SettingResult {
    setting: number;
    probability: number;
    pValue: number;
}

interface InputData {
    totalSpins: number;
    bigCount: number;
    regCount: number;
    grapeCount: number;
    // 詳細判別用（Optional）
    isolatedBig?: number;
    cherryBig?: number;
    isolatedReg?: number;
    cherryReg?: number;
}

/**
 * ベイズ推定とカイ二乗検定による設定判別ロジック
 */
export const calculateSettingLikelihood = (
    machine: MachineSpec,
    data: InputData
): SettingResult[] => {
    const { totalSpins, bigCount, regCount, grapeCount } = data;

    if (totalSpins === 0) {
        return [];
    }

    // 詳細モードかどうかを判定
    const isDetailedMode =
        (data.isolatedBig !== undefined || data.cherryBig !== undefined ||
            data.isolatedReg !== undefined || data.cherryReg !== undefined);

    // 各設定の対数尤度とカイ二乗値を計算
    const logLikelihoods: { [key: number]: number } = {};
    const chiSquares: { [key: number]: { chi2: number; df: number } } = {};

    Object.keys(machine.settings).map(Number).forEach(setting => {
        const specs = machine.settings[setting];
        const pGrape = specs.grape ? (1 / specs.grape) : 0;

        // --- 確率と観測数の整理 ---
        let probs: number[] = [];
        let observed: number[] = [];

        if (isDetailedMode && specs.isolatedBig && specs.cherryBig && specs.isolatedReg && specs.cherryReg) {
            // 詳細モード
            probs.push(1 / specs.isolatedBig);
            observed.push(data.isolatedBig || 0);

            probs.push(1 / specs.cherryBig);
            observed.push(data.cherryBig || 0);

            probs.push(1 / specs.isolatedReg);
            observed.push(data.isolatedReg || 0);

            probs.push(1 / specs.cherryReg);
            observed.push(data.cherryReg || 0);
        } else {
            // 通常モード
            probs.push(1 / specs.big);
            observed.push(bigCount);

            probs.push(1 / specs.reg);
            observed.push(regCount);
        }

        // ブドウは任意入力
        if (specs.grape && grapeCount > 0) {
            probs.push(1 / specs.grape);
            observed.push(grapeCount);
        }

        // ハズレ (その他)
        const pTotalEvents = probs.reduce((sum, p) => sum + p, 0);
        const pMiss = 1 - pTotalEvents;

        // 観測されたハズレ回数
        const observedTotalEvents = observed.reduce((sum, o) => sum + o, 0);
        const missCount = totalSpins - observedTotalEvents;

        probs.push(pMiss);
        observed.push(missCount);

        // --- ベイズ推定 (対数尤度) ---
        let logL = 0;
        for (let i = 0; i < probs.length; i++) {
            // Math.log(0) 回避
            if (observed[i] > 0) {
                logL += observed[i] * Math.log(probs[i]);
            }
        }
        logLikelihoods[setting] = logL;

        // --- カイ二乗検定 (適合度検定) ---
        let chi2 = 0;
        // 期待度数が0に近いとカイ二乗検定は不安定になるが、ここでは簡易的な指標として計算
        for (let i = 0; i < probs.length; i++) {
            const expected = totalSpins * probs[i];
            if (expected > 0) {
                chi2 += Math.pow(observed[i] - expected, 2) / expected;
            }
        }

        // 自由度 = カテゴリ数 - 1
        chiSquares[setting] = { chi2, df: probs.length - 1 };
    });

    // --- 事後確率の計算 (Bayes) ---
    const maxLogLikelihood = Math.max(...Object.values(logLikelihoods));
    const likelihoods: { [key: number]: number } = {};
    let totalLikelihood = 0;

    Object.keys(logLikelihoods).map(Number).forEach(setting => {
        const l = Math.exp(logLikelihoods[setting] - maxLogLikelihood);
        likelihoods[setting] = l;
        totalLikelihood += l;
    });

    // 結果の生成
    const results: SettingResult[] = Object.keys(likelihoods).map(Number).map(setting => {
        const { chi2, df } = chiSquares[setting];
        // p値の計算 (右側確率) = 1 - CDF
        // jStat.chisquare.cdf(x, df)
        const pValue = 1 - jStat.chisquare.cdf(chi2, df);

        return {
            setting: setting,
            probability: (likelihoods[setting] / totalLikelihood) * 100,
            pValue: pValue * 100 // %単位に変換
        };
    });

    return results.sort((a, b) => a.setting - b.setting);
};
