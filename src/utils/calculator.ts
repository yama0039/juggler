
import type { MachineSpec } from '../data/machineSpecs';

interface InputData {
    totalSpins: number;
    bigCount: number;
    regCount: number;
    grapeCount: number;
}

export interface SettingResult {
    setting: number;
    probability: number; // 0-100%
    likelihood: number; // Raw likelihood value
}

// 二項分布の確率質量関数 (近似)
// P(X=k) = nCk * p^k * (1-p)^(n-k)
// 対数で計算してアンダーフローを防ぐ
function logBinomialProbability(n: number, k: number, p: number): number {
    if (p <= 0 || p >= 1) return -Infinity;
    // nCk の計算は定数項として比較時は無視できるため省略可能だが、
    // 厳密な尤度比を出すなら必要。今回はスターリング近似などで代用もできるが、
    // 設定間の比較だけであれば nCk は共通なので無視してよい。
    // log(L) = k * log(p) + (n - k) * log(1 - p)
    return k * Math.log(p) + (n - k) * Math.log(1 - p);
}

export const calculateSettingLikelihood = (
    machine: MachineSpec,
    data: InputData
): SettingResult[] => {
    const settings = Object.keys(machine.settings).map(Number);
    const logLikelihoods: { setting: number; val: number }[] = [];

    settings.forEach((setting) => {
        const specs = machine.settings[setting];

        // 確率分母から確率へ変換
        const pBig = 1 / specs.big;
        const pReg = 1 / specs.reg;
        const pGrape = specs.grape ? 1 / specs.grape : 0;

        let logLikelihood = 0;

        // BIG
        if (data.totalSpins > 0) {
            logLikelihood += logBinomialProbability(data.totalSpins, data.bigCount, pBig);
        }

        // REG
        if (data.totalSpins > 0) {
            logLikelihood += logBinomialProbability(data.totalSpins, data.regCount, pReg);
        }

        // Grape (入力がある場合のみ)
        if (data.grapeCount > 0 && pGrape > 0) {
            // ブドウ確率は分母ではなく確率(1/x)で与えられているか確認 -> specs.grapeは分母(6.02など)
            // 1/6.02 として計算
            // ブドウの試行回数は通常totalSpinsと同一とみなす
            logLikelihood += logBinomialProbability(data.totalSpins, data.grapeCount, 1 / specs.grape!);
        }

        logLikelihoods.push({ setting, val: logLikelihood });
    });

    // 対数尤度から確率へ (ソフトマックス正規化)
    // オーバーフロー対策: 最大値を引く
    const maxLogL = Math.max(...logLikelihoods.map((i) => i.val));

    const likelihoods = logLikelihoods.map((item) => {
        return {
            setting: item.setting,
            expVal: Math.exp(item.val - maxLogL)
        };
    });

    const totalLikelihood = likelihoods.reduce((sum, item) => sum + item.expVal, 0);

    return likelihoods.map((item) => ({
        setting: item.setting,
        probability: (item.expVal / totalLikelihood) * 100,
        likelihood: item.expVal
    })).sort((a, b) => b.setting - a.setting); // 設定6から順に表示したいため降順ソートなどお好みで。今回は一旦そのまま。
};
