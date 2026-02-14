
export type JugglerModel = 'im_ex' | 'my_v' | 'funky_2' | 'happy_v3' | 'gogo_3' | 'girls_ss' | 'mr_j' | 'ultra_miracle' | 'neo_im';

export interface Probability {
    big: number;
    reg: number;
    grape?: number;
    // 詳細判別用 (分母)
    isolatedBig?: number;
    cherryBig?: number;
    isolatedReg?: number;
    cherryReg?: number;
    cherry?: number; // 非重複チェリー確率
}

export interface MachineSpec {
    id: JugglerModel;
    name: string;
    settings: {
        [key: number]: Probability;
    };
}

export const machineSpecs: MachineSpec[] = [
    {
        id: 'im_ex',
        name: 'アイムジャグラーEX(6号機)',
        settings: {
            1: { big: 273.1, reg: 439.8, grape: 6.02, isolatedBig: 387.79, cherryBig: 923.04, isolatedReg: 636.27, cherryReg: 1424.70 },
            2: { big: 269.7, reg: 399.6, grape: 6.02, isolatedBig: 381.02, cherryBig: 923.04, isolatedReg: 569.88, cherryReg: 1337.47 },
            3: { big: 269.7, reg: 331.0, grape: 6.02, isolatedBig: 381.02, cherryBig: 923.04, isolatedReg: 471.48, cherryReg: 1110.78 },
            4: { big: 259.0, reg: 315.1, grape: 5.90, isolatedBig: 370.26, cherryBig: 862.32, isolatedReg: 445.82, cherryReg: 1074.36 },
            5: { big: 259.0, reg: 255.0, grape: 5.78, isolatedBig: 370.26, cherryBig: 862.32, isolatedReg: 362.08, cherryReg: 862.32 },
            6: { big: 255.0, reg: 255.0, grape: 5.78, isolatedBig: 362.08, cherryBig: 862.32, isolatedReg: 362.08, cherryReg: 862.32 },
        },
    },
    {
        id: 'my_v',
        name: 'マイジャグラーV',
        settings: {
            1: { big: 273.1, reg: 409.6, grape: 5.91, isolatedBig: 420.103, cherryBig: 1365.333, isolatedReg: 655.360, cherryReg: 1092.267 },
            2: { big: 270.8, reg: 385.5, grape: 5.87, isolatedBig: 414.785, cherryBig: 1365.333, isolatedReg: 595.782, cherryReg: 1092.267 },
            3: { big: 266.4, reg: 336.1, grape: 5.83, isolatedBig: 404.543, cherryBig: 1365.333, isolatedReg: 496.485, cherryReg: 1040.254 },
            4: { big: 254.0, reg: 290.0, grape: 5.80, isolatedBig: 376.644, cherryBig: 1365.333, isolatedReg: 404.543, cherryReg: 1024.000 },
            5: { big: 240.1, reg: 268.6, grape: 5.76, isolatedBig: 348.596, cherryBig: 1337.469, isolatedReg: 390.095, cherryReg: 862.316 },
            6: { big: 229.1, reg: 229.1, grape: 5.67, isolatedBig: 341.333, cherryBig: 1129.931, isolatedReg: 327.680, cherryReg: 762.047 },
        },
    },
    {
        id: 'funky_2',
        name: 'ファンキージャグラー2',
        settings: {
            1: { big: 315.1, reg: 439.8, grape: 5.94, isolatedBig: 404.54, cherryBig: 1424.70, isolatedReg: 630.15, cherryReg: 1456.36 },
            2: { big: 307.7, reg: 407.1, grape: 5.93, isolatedBig: 397.19, cherryBig: 1365.33, isolatedReg: 585.14, cherryReg: 1337.47 },
            3: { big: 306.2, reg: 366.1, grape: 5.88, isolatedBig: 394.80, cherryBig: 1365.33, isolatedReg: 512.00, cherryReg: 1285.02 },
            4: { big: 299.3, reg: 322.8, grape: 5.83, isolatedBig: 383.25, cherryBig: 1365.33, isolatedReg: 448.88, cherryReg: 1149.75 },
            5: { big: 290.0, reg: 299.3, grape: 5.80, isolatedBig: 374.49, cherryBig: 1285.02, isolatedReg: 404.54, cherryReg: 1149.75 },
            6: { big: 264.3, reg: 262.1, grape: 5.77, isolatedBig: 334.37, cherryBig: 1260.31, isolatedReg: 352.34, cherryReg: 1024.00 },
        },
    },
    {
        id: 'happy_v3',
        name: 'ハッピージャグラーV III',
        settings: {
            1: { big: 273.1, reg: 397.2, grape: 6.05, isolatedBig: 358.12, cherryBig: 1149.75, isolatedReg: 682.67, cherryReg: 936.23 },
            2: { big: 270.8, reg: 362.1, grape: 5.95, isolatedBig: 354.25, cherryBig: 1149.75, isolatedReg: 612.49, cherryReg: 885.62 },
            3: { big: 263.2, reg: 332.7, grape: 5.90, isolatedBig: 348.60, cherryBig: 1149.75, isolatedReg: 574.88, cherryReg: 789.59 },
            4: { big: 254.0, reg: 300.6, grape: 5.82, isolatedBig: 341.33, cherryBig: 936.23, isolatedReg: 496.49, cherryReg: 762.05 },
            5: { big: 239.2, reg: 273.1, grape: 5.78, isolatedBig: 322.84, cherryBig: 923.04, isolatedReg: 455.11, cherryReg: 682.67 },
            6: { big: 226.0, reg: 256.0, grape: 5.74, isolatedBig: 296.54, cherryBig: 949.80, isolatedReg: 439.84, cherryReg: 612.49 },
        },
    },
    {
        id: 'gogo_3',
        name: 'ゴーゴージャグラー3',
        settings: {
            1: { big: 259.0, reg: 354.2, grape: 6.00, isolatedBig: 346.75, cherryBig: 1024.00, isolatedReg: 471.48, cherryReg: 1424.70 },
            2: { big: 258.0, reg: 332.7, grape: 6.00, isolatedBig: 344.93, cherryBig: 1024.00, isolatedReg: 448.88, cherryReg: 1285.02 },
            3: { big: 257.0, reg: 306.2, grape: 6.00, isolatedBig: 343.12, cherryBig: 1024.00, isolatedReg: 417.43, cherryReg: 1149.75 },
            4: { big: 254.0, reg: 268.6, grape: 6.00, isolatedBig: 343.12, cherryBig: 978.15, isolatedReg: 362.08, cherryReg: 1040.25 },
            5: { big: 247.3, reg: 247.3, grape: 6.00, isolatedBig: 332.67, cherryBig: 963.77, isolatedReg: 330.99, cherryReg: 978.15 },
            6: { big: 234.9, reg: 234.9, grape: 6.00, isolatedBig: 316.60, cherryBig: 910.22, isolatedReg: 316.60, cherryReg: 910.22 },
        },
    },
    {
        id: 'girls_ss',
        name: 'ジャグラーガールズSS',
        // 単独・チェリー詳細データ未提供のため全体確率のみ
        settings: {
            1: { big: 273.07, reg: 381.02, grape: 6.01 },
            2: { big: 270.81, reg: 350.46, grape: 6.01 },
            3: { big: 260.06, reg: 316.60, grape: 6.01 },
            4: { big: 250.14, reg: 281.27, grape: 6.01 },
            5: { big: 243.63, reg: 270.81, grape: 5.92 },
            6: { big: 226.0, reg: 252.1, grape: 5.89 },
        },
    },
    {
        id: 'mr_j',
        name: 'ミスタージャグラー',
        // 単独・チェリー詳細データ未提供のため全体確率のみ
        settings: {
            1: { big: 268.6, reg: 374.5, grape: 6.29 },
            2: { big: 267.5, reg: 354.2, grape: 6.22 },
            3: { big: 260.1, reg: 331.0, grape: 6.15 },
            4: { big: 249.2, reg: 291.3, grape: 6.09 },
            5: { big: 240.9, reg: 257.0, grape: 6.02 },
            6: { big: 237.4, reg: 237.4, grape: 5.96 },
        },
    },
    {
        id: 'ultra_miracle',
        name: 'ウルトラミラクルジャグラー',
        settings: {
            1: { big: 267.5, reg: 425.6, grape: 5.94, isolatedBig: 334.37, cherryBig: 1337.47, isolatedReg: 595.78, cherryReg: 1489.45 },
            2: { big: 261.1, reg: 402.1, grape: 5.94, isolatedBig: 332.67, cherryBig: 1213.63, isolatedReg: 546.13, cherryReg: 1524.09 },
            3: { big: 256.0, reg: 350.5, grape: 5.94, isolatedBig: 329.33, cherryBig: 1149.75, isolatedReg: 489.07, cherryReg: 1236.53 },
            4: { big: 242.7, reg: 322.8, grape: 5.93, isolatedBig: 310.60, cherryBig: 1110.78, isolatedReg: 436.91, cherryReg: 1236.53 },
            5: { big: 233.2, reg: 297.9, grape: 5.93, isolatedBig: 304.82, cherryBig: 992.97, isolatedReg: 414.78, cherryReg: 1057.03 },
            6: { big: 216.3, reg: 277.7, grape: 5.93, isolatedBig: 281.27, cherryBig: 936.23, isolatedReg: 378.82, cherryReg: 1040.25 },
        },
    },
    {
        id: 'neo_im',
        name: 'ネオアイムジャグラーEX',
        // アイムジャグラーEXと同様
        settings: {
            1: { big: 273.1, reg: 439.8, grape: 6.02, isolatedBig: 387.79, cherryBig: 923.04, isolatedReg: 636.27, cherryReg: 1424.70 },
            2: { big: 269.7, reg: 399.6, grape: 6.02, isolatedBig: 381.02, cherryBig: 923.04, isolatedReg: 569.88, cherryReg: 1337.47 },
            3: { big: 269.7, reg: 331.0, grape: 6.02, isolatedBig: 381.02, cherryBig: 923.04, isolatedReg: 471.48, cherryReg: 1110.78 },
            4: { big: 259.0, reg: 315.1, grape: 5.90, isolatedBig: 370.26, cherryBig: 862.32, isolatedReg: 445.82, cherryReg: 1074.36 },
            5: { big: 259.0, reg: 255.0, grape: 5.78, isolatedBig: 370.26, cherryBig: 862.32, isolatedReg: 362.08, cherryReg: 862.32 },
            6: { big: 255.0, reg: 255.0, grape: 5.78, isolatedBig: 362.08, cherryBig: 862.32, isolatedReg: 362.08, cherryReg: 862.32 },
        },
    },
];
