
export type JugglerModel = 'im_ex' | 'my_v' | 'funky_2' | 'happy_v3' | 'gogo_3' | 'girls_ss' | 'mr_j' | 'ultra_miracle' | 'neo_im';

export interface Probability {
    big: number;
    reg: number;
    grape?: number;
    payout: number; // チェリー狙い（詳細版サイト準拠）
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
        name: 'SアイムジャグラーEX',
        settings: {
            1: { big: 273.1, reg: 439.8, grape: 6.020, payout: 97.9, isolatedBig: 343.1, cherryBig: 1337.5, isolatedReg: 668.7, cherryReg: 1337.5, cherry: 35.5 },
            2: { big: 269.7, reg: 399.6, grape: 6.020, payout: 99.0, isolatedBig: 339.6, cherryBig: 1310.7, isolatedReg: 606.8, cherryReg: 1170.3, cherry: 35.3 },
            3: { big: 269.7, reg: 331.0, grape: 6.020, payout: 100.1, isolatedBig: 339.6, cherryBig: 1310.7, isolatedReg: 504.1, cherryReg: 963.8, cherry: 35.0 },
            4: { big: 259.0, reg: 315.1, grape: 6.020, payout: 101.9, isolatedBig: 326.0, cherryBig: 1260.3, isolatedReg: 481.9, cherryReg: 910.2, cherry: 34.8 },
            5: { big: 259.0, reg: 255.0, grape: 6.020, payout: 104.5, isolatedBig: 326.0, cherryBig: 1260.3, isolatedReg: 390.1, cherryReg: 736.4, cherry: 34.5 },
            6: { big: 255.0, reg: 255.0, grape: 5.780, payout: 106.8, isolatedBig: 321.3, cherryBig: 1236.5, isolatedReg: 390.1, cherryReg: 736.4, cherry: 34.3 }
        }
    },
    {
        id: 'my_v',
        name: 'マイジャグラーⅤ',
        settings: {
            1: { big: 273.1, reg: 409.6, grape: 5.910, payout: 98.1, isolatedBig: 366.1, cherryBig: 1074.4, isolatedReg: 630.2, cherryReg: 1170.3, cherry: 35.5 },
            2: { big: 270.8, reg: 385.5, grape: 5.870, payout: 99.3, isolatedBig: 364.1, cherryBig: 1057.0, isolatedReg: 585.1, cherryReg: 1129.9, cherry: 35.3 },
            3: { big: 266.4, reg: 336.1, grape: 5.830, payout: 101.5, isolatedBig: 358.1, cherryBig: 1040.3, isolatedReg: 512.0, cherryReg: 978.1, cherry: 35.1 },
            4: { big: 254.0, reg: 290.0, grape: 5.800, payout: 104.1, isolatedBig: 341.3, cherryBig: 993.0, isolatedReg: 436.9, cherryReg: 862.3, cherry: 34.9 },
            5: { big: 240.1, reg: 268.6, grape: 5.760, payout: 106.3, isolatedBig: 324.4, cherryBig: 923.0, isolatedReg: 404.5, cherryReg: 809.1, cherry: 34.6 },
            6: { big: 229.1, reg: 229.1, grape: 5.670, payout: 110.6, isolatedBig: 309.1, cherryBig: 885.6, isolatedReg: 344.9, cherryReg: 689.8, cherry: 34.4 }
        }
    },
    {
        id: 'funky_2',
        name: 'ファンキージャグラー2',
        settings: {
            1: { big: 266.4, reg: 439.8, grape: 5.946, payout: 98.2, isolatedBig: 343.1, cherryBig: 1191.6, isolatedReg: 668.7, cherryReg: 1285.0, cherry: 37.0 },
            2: { big: 259.0, reg: 407.1, grape: 5.900, payout: 99.5, isolatedBig: 334.4, cherryBig: 1149.8, isolatedReg: 618.3, cherryReg: 1191.6, cherry: 36.6 },
            3: { big: 256.0, reg: 366.1, grape: 5.830, payout: 101.2, isolatedBig: 331.0, cherryBig: 1129.9, isolatedReg: 555.4, cherryReg: 1074.4, cherry: 36.3 },
            4: { big: 249.2, reg: 322.8, grape: 5.810, payout: 103.5, isolatedBig: 322.8, cherryBig: 1092.3, isolatedReg: 492.7, cherryReg: 936.2, cherry: 35.8 },
            5: { big: 240.1, reg: 299.3, grape: 5.750, payout: 105.8, isolatedBig: 310.7, cherryBig: 1057.0, isolatedReg: 442.8, cherryReg: 910.2, cherry: 35.5 },
            6: { big: 219.9, reg: 262.1, grape: 5.670, payout: 110.3, isolatedBig: 284.9, cherryBig: 963.8, isolatedReg: 397.2, cherryReg: 771.0, cherry: 35.1 }
        }
    },
    {
        id: 'happy_v3',
        name: 'ハッピージャグラーV Ⅲ',
        settings: {
            1: { big: 273.1, reg: 397.2, grape: 6.040, payout: 98.0, isolatedBig: 436.9, cherryBig: 1489.5, isolatedReg: 636.3, cherryReg: 1057.0, cherry: 61.9 },
            2: { big: 270.8, reg: 362.1, grape: 6.010, payout: 99.2, isolatedBig: 431.2, cherryBig: 1489.5, isolatedReg: 569.9, cherryReg: 993.0, cherry: 62.9 },
            3: { big: 263.2, reg: 332.7, grape: 5.980, payout: 101.0, isolatedBig: 412.2, cherryBig: 1489.5, isolatedReg: 532.8, cherryReg: 885.6, cherry: 62.9 },
            4: { big: 254.0, reg: 300.6, grape: 5.840, payout: 103.9, isolatedBig: 414.8, cherryBig: 1213.6, isolatedReg: 478.4, cherryReg: 809.1, cherry: 65.4 },
            5: { big: 239.2, reg: 273.1, grape: 5.810, payout: 106.9, isolatedBig: 376.6, cherryBig: 1213.6, isolatedReg: 436.9, cherryReg: 728.2, cherry: 64.4 },
            6: { big: 226.0, reg: 256.0, grape: 5.790, payout: 110.1, isolatedBig: 344.9, cherryBig: 1213.6, isolatedReg: 425.6, cherryReg: 642.5, cherry: 66.0 }
        }
    },
    {
        id: 'gogo_3',
        name: 'ゴーゴージャグラー3',
        settings: {
            1: { big: 259.0, reg: 354.2, grape: 6.250, payout: 98.2, isolatedBig: 350.5, cherryBig: 993.0, isolatedReg: 478.4, cherryReg: 1365.3, cherry: 35.5 },
            2: { big: 258.0, reg: 332.7, grape: 6.200, payout: 99.5, isolatedBig: 348.6, cherryBig: 993.0, isolatedReg: 448.9, cherryReg: 1285.0, cherry: 35.3 },
            3: { big: 257.0, reg: 306.2, grape: 6.130, payout: 101.5, isolatedBig: 346.7, cherryBig: 993.0, isolatedReg: 412.2, cherryReg: 1191.6, cherry: 35.0 },
            4: { big: 254.0, reg: 268.6, grape: 6.060, payout: 104.0, isolatedBig: 343.1, cherryBig: 978.1, isolatedReg: 362.1, cherryReg: 1040.3, cherry: 34.8 },
            5: { big: 247.3, reg: 247.3, grape: 6.000, payout: 106.5, isolatedBig: 334.4, cherryBig: 949.8, isolatedReg: 332.7, cherryReg: 963.8, cherry: 34.5 },
            6: { big: 234.9, reg: 234.9, grape: 5.950, payout: 110.1, isolatedBig: 316.6, cherryBig: 910.2, isolatedReg: 316.6, cherryReg: 910.2, cherry: 34.2 }
        }
    },
    {
        id: 'girls_ss',
        name: 'ジャグラーガールズSS',
        settings: {
            1: { big: 273.070, reg: 381.020, grape: 6.010, payout: 98.0, isolatedBig: 368.1, cherryBig: 1057.0, isolatedReg: 618.3, cherryReg: 993.0, cherry: 33.610 },
            2: { big: 270.810, reg: 350.460, grape: 6.010, payout: 99.2, isolatedBig: 364.1, cherryBig: 1057.0, isolatedReg: 569.9, cherryReg: 910.2, cherry: 33.510 },
            3: { big: 260.060, reg: 316.600, grape: 6.010, payout: 101.1, isolatedBig: 350.5, cherryBig: 1008.2, isolatedReg: 512.0, cherryReg: 830.6, cherry: 33.300 },
            4: { big: 250.140, reg: 281.270, grape: 6.010, payout: 103.8, isolatedBig: 336.1, cherryBig: 978.1, isolatedReg: 455.1, cherryReg: 736.4, cherry: 33.200 },
            5: { big: 243.630, reg: 270.810, grape: 5.920, payout: 106.1, isolatedBig: 327.7, cherryBig: 949.8, isolatedReg: 436.9, cherryReg: 712.3, cherry: 33.100 },
            6: { big: 225.990, reg: 252.060, grape: 5.890, payout: 110.1, isolatedBig: 304.3, cherryBig: 873.8, isolatedReg: 407.1, cherryReg: 662.0, cherry: 32.900 }
        }
    },
    {
        id: 'mr_j',
        name: 'ミスタージャグラー',
        settings: {
            1: { big: 268.6, reg: 374.5, grape: 6.290, payout: 98.0, isolatedBig: 356.2, cherryBig: 1092.3, isolatedReg: 585.1, cherryReg: 1040.3, cherry: 40.0 },
            2: { big: 267.5, reg: 354.2, grape: 6.220, payout: 99.2, isolatedBig: 354.2, cherryBig: 1092.3, isolatedReg: 555.4, cherryReg: 978.1, cherry: 39.5 },
            3: { big: 260.1, reg: 331.0, grape: 6.150, payout: 101.3, isolatedBig: 344.9, cherryBig: 1057.0, isolatedReg: 520.1, cherryReg: 910.2, cherry: 39.0 },
            4: { big: 249.2, reg: 291.3, grape: 6.090, payout: 104.2, isolatedBig: 331.0, cherryBig: 1008.2, isolatedReg: 458.3, cherryReg: 799.2, cherry: 38.5 },
            5: { big: 240.9, reg: 257.0, grape: 6.020, payout: 107.0, isolatedBig: 321.3, cherryBig: 963.8, isolatedReg: 404.5, cherryReg: 704.7, cherry: 38.0 },
            6: { big: 237.4, reg: 237.4, grape: 5.960, payout: 110.1, isolatedBig: 317.2, cherryBig: 949.8, isolatedReg: 374.5, cherryReg: 648.9, cherry: 37.5 }
        }
    },
    {
        id: 'ultra_miracle',
        name: 'ウルトラミラクルジャグラー',
        settings: {
            1: { big: 267.5, reg: 425.6, grape: 5.930, payout: 98.1, isolatedBig: 333.7, cherryBig: 1337.5, isolatedReg: 595.8, cherryReg: 1489.5, cherry: 35.1 },
            2: { big: 261.1, reg: 402.1, grape: 5.930, payout: 99.4, isolatedBig: 333.3, cherryBig: 1213.6, isolatedReg: 545.7, cherryReg: 1524.1, cherry: 35.0 },
            3: { big: 256.0, reg: 350.5, grape: 5.930, payout: 101.4, isolatedBig: 328.8, cherryBig: 1170.3, isolatedReg: 489.6, cherryReg: 1236.5, cherry: 34.8 },
            4: { big: 242.7, reg: 322.8, grape: 5.930, payout: 104.3, isolatedBig: 310.7, cherryBig: 1109.6, isolatedReg: 436.5, cherryReg: 1236.5, cherry: 34.7 },
            5: { big: 233.2, reg: 297.9, grape: 5.870, payout: 106.9, isolatedBig: 304.3, cherryBig: 1008.2, isolatedReg: 415.9, cherryReg: 1040.3, cherry: 33.5 },
            6: { big: 216.3, reg: 277.7, grape: 5.810, payout: 110.5, isolatedBig: 281.8, cherryBig: 936.2, isolatedReg: 379.9, cherryReg: 1040.3, cherry: 33.0 }
        }
    },
    {
        id: 'neo_im',
        name: 'ネオアイムジャグラーEX',
        settings: {
            1: { big: 273.1, reg: 439.8, grape: 6.020, payout: 97.9, isolatedBig: 343.1, cherryBig: 1337.5, isolatedReg: 668.7, cherryReg: 1337.5, cherry: 35.5 },
            2: { big: 269.7, reg: 399.6, grape: 6.020, payout: 99.0, isolatedBig: 339.6, cherryBig: 1310.7, isolatedReg: 606.8, cherryReg: 1170.3, cherry: 35.3 },
            3: { big: 269.7, reg: 331.0, grape: 6.020, payout: 100.1, isolatedBig: 339.6, cherryBig: 1310.7, isolatedReg: 504.1, cherryReg: 963.8, cherry: 35.0 },
            4: { big: 259.0, reg: 315.1, grape: 6.020, payout: 101.9, isolatedBig: 326.0, cherryBig: 1260.3, isolatedReg: 481.9, cherryReg: 910.2, cherry: 34.8 },
            5: { big: 259.0, reg: 255.0, grape: 6.020, payout: 104.5, isolatedBig: 326.0, cherryBig: 1260.3, isolatedReg: 390.1, cherryReg: 736.4, cherry: 34.5 },
            6: { big: 255.0, reg: 255.0, grape: 5.780, payout: 106.8, isolatedBig: 321.3, cherryBig: 1236.5, isolatedReg: 390.1, cherryReg: 736.4, cherry: 34.3 }
        }
    }
];
