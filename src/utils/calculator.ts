import { jStat } from 'jstat';
import type { MachineSpec } from '../data/machineSpecs';

export interface SettingResult {
    setting: number;
    probability: number;
    pValue: number;
    payout: number; // その設定自体の機械割
}

export interface EstimationResult {
    settingResults: SettingResult[];
    expectedPayout: number; // 推定期待機械割 (加重平均)
    expectedDifference: (games: number) => number; // 次のNゲームでの期待差枚
}

interface InputData {
    totalSpins: number;
    bigCount: number;
    regCount: number;
    grapeCount: number;
    diffCoins?: number; // ブドウ逆算用
    // 詳細判別用（Optional）
    isolatedBig?: number;
    cherryBig?: number;
    isolatedReg?: number;
    cherryReg?: number;
    // 設定配分 (Prior probabilities) - 合計100%になる配列
    priors?: { [key: number]: number };
}

/**
 * ベイズ推定とカイ二乗検定による設定判別ロジック
 */
export const calculateSettingLikelihood = (
    machine: MachineSpec,
    data: InputData
): EstimationResult | null => {
    const { totalSpins, bigCount, regCount, grapeCount, priors } = data;

    if (totalSpins === 0) {
        return null;
    }

    // デフォルトの事前確率（均等）
    const defaultPriors: { [key: number]: number } = {};
    const settings = Object.keys(machine.settings).map(Number);
    settings.forEach(s => {
        defaultPriors[s] = 100 / settings.length;
    });

    const activePriors = priors || defaultPriors;

    // 詳細モードかどうかを判定
    const isDetailedMode =
        (data.isolatedBig !== undefined || data.cherryBig !== undefined ||
            data.isolatedReg !== undefined || data.cherryReg !== undefined);

    // 各設定の対数尤度とカイ二乗値を計算
    const logLikelihoods: { [key: number]: number } = {};
    const chiSquares: { [key: number]: { chi2: number; df: number } } = {};

    settings.forEach(setting => {
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
            probs.push(pGrape);
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
            if (observed[i] > 0) {
                // p=0の場合の対数(マイナス無限大)を回避
                const p = Math.max(probs[i], 1e-10);
                logL += observed[i] * Math.log(p);
            }
        }
        logLikelihoods[setting] = logL;

        // --- カイ二乗検定 (適合度検定) ---
        let chi2 = 0;
        for (let i = 0; i < probs.length; i++) {
            const expected = totalSpins * probs[i];
            if (expected > 0) {
                chi2 += Math.pow(observed[i] - expected, 2) / expected;
            }
        }
        chiSquares[setting] = { chi2, df: probs.length - 1 };
    });

    // --- 事後確率の計算 (Bayes) ---
    // P(Setting | Data) ∝ P(Data | Setting) * P(Setting)
    // 対数空間で計算: log(P_post) = log(P_likelihood) + log(P_prior)
    const logPosteriors: { [key: number]: number } = {};
    settings.forEach(s => {
        // 事前確率が0の設定は除外
        if (activePriors[s] <= 0) {
            logPosteriors[s] = -Infinity;
        } else {
            logPosteriors[s] = logLikelihoods[s] + Math.log(activePriors[s] / 100);
        }
    });

    const maxLogPosterior = Math.max(...Object.values(logPosteriors).filter(v => isFinite(v)));
    const postLikelihoods: { [key: number]: number } = {};
    let totalPostLikelihood = 0;

    settings.forEach(s => {
        if (logPosteriors[s] === -Infinity) {
            postLikelihoods[s] = 0;
        } else {
            const l = Math.exp(logPosteriors[s] - maxLogPosterior);
            postLikelihoods[s] = l;
            totalPostLikelihood += l;
        }
    });

    // 結果の生成
    const settingResults: SettingResult[] = settings.map(setting => {
        const { chi2, df } = chiSquares[setting];
        const pValue = 1 - jStat.chisquare.cdf(chi2, df);

        return {
            setting: setting,
            probability: (postLikelihoods[setting] / totalPostLikelihood) * 100,
            pValue: pValue * 100,
            payout: machine.settings[setting].payout
        };
    });

    // 期待機械割の計算 (加重平均)
    const expectedPayout = settingResults.reduce((sum, r) => {
        return sum + (r.payout * (r.probability / 100));
    }, 0);

    return {
        settingResults: settingResults.sort((a, b) => a.setting - b.setting),
        expectedPayout,
        expectedDifference: (games: number) => {
            // (期待機械割 - 100) / 100 * 投入枚数(games * 3)
            return ((expectedPayout - 100) / 100) * (games * 3);
        }
    };
};

/**
 * 差枚数からブドウ回数を逆算
 * 払い出し = 差枚 + 投入
 * ブドウ投入分 = 払い出し - (BIG*240? + REG*96?) ... 機種による
 */
export const backCalculateGrapes = (
    machine: MachineSpec,
    totalSpins: number,
    bigCount: number,
    regCount: number,
    diffCoins: number
): number => {
    // 投入枚数 = 総回転数 * 3
    const totalIn = totalSpins * 3;
    // 総払い出し = 投入枚数 + 差枚数
    const totalOut = totalIn + diffCoins;

    // ボーナスによる払い出し (6号機ジャグラーの標準値)
    // アイム/マイV/ファンキー2等: BIG 240枚, REG 96枚
    let bonusOut = 0;
    if (machine.id === 'happy_v3') {
        bonusOut = bigCount * 240 + regCount * 96; // ハッピーも同様だが、機種によって微調整が必要な場合あり
    } else {
        bonusOut = bigCount * 240 + regCount * 96;
    }

    // チェリーによる払い出し (簡易計算: 1/35で2枚)
    const cherryCount = Math.round(totalSpins / 35);
    const cherryOut = cherryCount * 2;

    // 残りがブドウとリプレイ
    // リプレイは 1/7.3 で3枚払い出し(投入を相殺するので実質0だが、totalOutには含まれる)
    // totalOut = リプレイ(3) + ブドウ(8) + チェリー(2) + ボーナス
    // リプレイ回数 = totalSpins / 7.3
    const replayCount = Math.round(totalSpins / 7.3);
    const replayOut = replayCount * 3;

    const remainingOut = totalOut - bonusOut - cherryOut - replayOut;

    // ブドウの払い出しは8枚 (6号機ジャグラー)
    const grapeCount = Math.max(0, Math.round(remainingOut / 8));

    return grapeCount;
};
