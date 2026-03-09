
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
            1: { big: 273.0667, reg: 439.8389, grape: 6.0240, payout: 97.9, isolatedBig: 387.7870, cherryBig: 923.0423, isolatedReg: 636.2718, cherryReg: 1424.6956, cherry: 35.2400 },
            2: { big: 269.6955, reg: 399.6098, grape: 6.0240, payout: 99.0, isolatedBig: 381.0233, cherryBig: 923.0423, isolatedReg: 569.8783, cherryReg: 1337.4694, cherry: 35.2400 },
            3: { big: 269.6955, reg: 330.9899, grape: 6.0240, payout: 100.1, isolatedBig: 381.0233, cherryBig: 923.0423, isolatedReg: 471.4820, cherryReg: 1110.7797, cherry: 35.2400 },
            4: { big: 259.0356, reg: 315.0769, grape: 6.0240, payout: 101.9, isolatedBig: 370.2599, cherryBig: 862.3158, isolatedReg: 445.8231, cherryReg: 1074.3607, cherry: 35.2400 },
            5: { big: 259.0356, reg: 255.0039, grape: 6.0240, payout: 104.5, isolatedBig: 370.2599, cherryBig: 862.3158, isolatedReg: 362.0774, cherryReg: 862.3158, cherry: 35.2400 },
            6: { big: 255.0039, reg: 255.0039, grape: 5.8480, payout: 106.8, isolatedBig: 362.0774, cherryBig: 862.3158, isolatedReg: 362.0774, cherryReg: 862.3158, cherry: 35.2400 },
        }
    },
    {
        id: 'my_v',
        name: 'マイジャグラーⅤ',
        settings: {
            1: { big: 273.1000, reg: 409.6000, grape: 5.9100, payout: 98.1, isolatedBig: 420.1030, cherryBig: 1365.333, isolatedReg: 655.3600, cherryReg: 1092.2670, cherry: 38.1000 },
            2: { big: 270.8000, reg: 385.5000, grape: 5.8700, payout: 99.3, isolatedBig: 414.7850, cherryBig: 1365.333, isolatedReg: 595.7820, cherryReg: 1092.2670, cherry: 38.1000 },
            3: { big: 266.4000, reg: 336.1000, grape: 5.8300, payout: 101.5, isolatedBig: 404.5430, cherryBig: 1365.333, isolatedReg: 496.4850, cherryReg: 1040.2540, cherry: 36.8200 },
            4: { big: 254.0000, reg: 290.0000, grape: 5.8000, payout: 104.1, isolatedBig: 376.6440, cherryBig: 1365.333, isolatedReg: 404.5430, cherryReg: 1024.0000, cherry: 35.6200 },
            5: { big: 240.1000, reg: 268.6000, grape: 5.7600, payout: 106.3, isolatedBig: 348.5960, cherryBig: 1337.469, isolatedReg: 390.0950, cherryReg: 862.3160, cherry: 35.6200 },
            6: { big: 229.1000, reg: 229.1000, grape: 5.6700, payout: 110.6, isolatedBig: 341.3330, cherryBig: 1129.931, isolatedReg: 327.6800, cherryReg: 762.0470, cherry: 35.6200 },
        }
    },
    {
        id: 'funky_2',
        name: 'ファンキージャグラー2',
        settings: {
            1: { big: 266.4000, reg: 439.8000, grape: 5.9400, payout: 98.2, isolatedBig: 404.5000, cherryBig: 1425.0000, isolatedReg: 630.2000, cherryReg: 1456.4000, cherry: 35.4700 },
            2: { big: 259.0000, reg: 407.1000, grape: 5.9300, payout: 99.5, isolatedBig: 397.2000, cherryBig: 1365.0000, isolatedReg: 585.1000, cherryReg: 1337.5000, cherry: 35.4700 },
            3: { big: 256.0000, reg: 366.1000, grape: 5.8800, payout: 101.2, isolatedBig: 394.8000, cherryBig: 1365.0000, isolatedReg: 512.0000, cherryReg: 1285.0000, cherry: 35.4700 },
            4: { big: 249.2000, reg: 322.8000, grape: 5.8300, payout: 103.5, isolatedBig: 383.3000, cherryBig: 1365.0000, isolatedReg: 448.9000, cherryReg: 1149.8000, cherry: 35.4700 },
            5: { big: 240.1000, reg: 299.3000, grape: 5.8000, payout: 105.8, isolatedBig: 374.5000, cherryBig: 1285.0000, isolatedReg: 404.5000, cherryReg: 1149.8000, cherry: 35.4700 },
            6: { big: 219.9000, reg: 262.1000, grape: 5.7700, payout: 110.3, isolatedBig: 334.4000, cherryBig: 1260.0000, isolatedReg: 352.3000, cherryReg: 1024.0000, cherry: 35.4700 },
        }
    },
    {
        id: 'happy_v3',
        name: 'ハッピージャグラーV Ⅲ',
        settings: {
            1: { big: 273.0667, reg: 397.1879, grape: 6.0402, payout: 98.0, isolatedBig: 358.1202, cherryBig: 1149.7544, isolatedReg: 682.6667, cherryReg: 949.7971, cherry: 35.2400 },
            2: { big: 270.8099, reg: 362.0774, grape: 6.0103, payout: 99.2, isolatedBig: 354.2486, cherryBig: 1149.7544, isolatedReg: 612.4860, cherryReg: 885.6216, cherry: 35.2400 },
            3: { big: 263.1968, reg: 332.6701, grape: 5.9801, payout: 101.0, isolatedBig: 348.5957, cherryBig: 1074.3607, isolatedReg: 574.8772, cherryReg: 789.5904, cherry: 35.2400 },
            4: { big: 254.0155, reg: 300.6239, grape: 5.8598, payout: 103.9, isolatedBig: 341.3333, cherryBig: 992.9697, isolatedReg: 496.4848, cherryReg: 762.0465, cherry: 35.2400 },
            5: { big: 239.1825, reg: 273.0667, grape: 5.8400, payout: 106.9, isolatedBig: 319.6878, cherryBig: 949.7971, isolatedReg: 455.1111, cherryReg: 682.6667, cherry: 35.2400 },
            6: { big: 225.9862, reg: 256.0000, grape: 5.8202, payout: 110.1, isolatedBig: 297.8909, cherryBig: 936.2286, isolatedReg: 439.8389, cherryReg: 612.4860, cherry: 35.2400 },
        }
    },
    {
        id: 'gogo_3',
        name: 'ゴーゴージャグラー3',
        settings: {
            1: { big: 259.0360, reg: 354.2490, grape: 6.2499, payout: 98.2, isolatedBig: 346.7510, cherryBig: 1024.0000, isolatedReg: 471.4820, cherryReg: 1424.6960, cherry: 35.3666 },
            2: { big: 258.0160, reg: 332.6700, grape: 6.2002, payout: 99.5, isolatedBig: 344.9260, cherryBig: 1024.0000, isolatedReg: 448.8770, cherryReg: 1285.0200, cherry: 35.3666 },
            3: { big: 257.0040, reg: 306.2430, grape: 6.1502, payout: 101.5, isolatedBig: 343.1200, cherryBig: 1024.0000, isolatedReg: 417.4270, cherryReg: 1149.7540, cherry: 35.3666 },
            4: { big: 254.0160, reg: 268.5900, grape: 6.0698, payout: 104.0, isolatedBig: 343.1200, cherryBig: 978.1490, isolatedReg: 362.0770, cherryReg: 1040.2540, cherry: 35.3666 },
            5: { big: 247.3060, reg: 247.3060, grape: 5.9998, payout: 106.5, isolatedBig: 332.6700, cherryBig: 963.7650, isolatedReg: 330.9900, cherryReg: 978.1490, cherry: 35.3666 },
            6: { big: 234.8960, reg: 234.8960, grape: 5.9201, payout: 110.1, isolatedBig: 316.5990, cherryBig: 910.2220, isolatedReg: 316.5990, cherryReg: 910.2220, cherry: 35.3666 },
        }
    },
    {
        id: 'girls_ss',
        name: 'ジャグラーガールズSS',
        settings: {
            1: { big: 273.0667, reg: 381.0233, grape: 6.0100, payout: 98.0, isolatedBig: 387.7870, cherryBig: 923.0420, isolatedReg: 520.1270, cherryReg: 1424.6960, cherry: 35.7200 },
            2: { big: 270.8099, reg: 350.4599, grape: 6.0100, payout: 99.2, isolatedBig: 381.0230, cherryBig: 936.2290, isolatedReg: 481.8820, cherryReg: 1285.0200, cherry: 35.7200 },
            3: { big: 260.0635, reg: 316.5990, grape: 6.0100, payout: 101.1, isolatedBig: 370.2600, cherryBig: 873.8130, isolatedReg: 436.9070, cherryReg: 1149.7540, cherry: 35.7200 },
            4: { big: 250.1374, reg: 281.2704, grape: 6.0100, payout: 103.8, isolatedBig: 350.4600, cherryBig: 873.8130, isolatedReg: 397.1880, cherryReg: 963.7650, cherry: 35.7200 },
            5: { big: 243.6283, reg: 270.8099, grape: 5.9200, payout: 106.1, isolatedBig: 337.8140, cherryBig: 873.8130, isolatedReg: 383.2510, cherryReg: 923.0420, cherry: 35.7200 },
            6: { big: 225.9862, reg: 252.0615, grape: 5.8900, payout: 110.1, isolatedBig: 312.0760, cherryBig: 819.2000, isolatedReg: 358.1200, cherryReg: 851.1170, cherry: 35.7200 },
        }
    },
    {
        id: 'mr_j',
        name: 'ミスタージャグラー',
        settings: {
            1: { big: 268.5900, reg: 374.4910, grape: 6.2178, payout: 98.0, isolatedBig: 348.5957, cherryBig: 1170.2857, isolatedReg: 512.0000, cherryReg: 1394.3830, cherry: 38.5506 },
            2: { big: 267.4940, reg: 354.2490, grape: 6.1640, payout: 99.2, isolatedBig: 348.5957, cherryBig: 1149.7544, isolatedReg: 478.3650, cherryReg: 1365.3333, cherry: 38.5506 },
            3: { big: 260.0630, reg: 330.9900, grape: 6.1209, payout: 101.3, isolatedBig: 337.8144, cherryBig: 1129.9310, isolatedReg: 439.8389, cherryReg: 1337.4694, cherry: 38.5506 },
            4: { big: 249.1860, reg: 291.2710, grape: 6.0867, payout: 104.2, isolatedBig: 324.4356, cherryBig: 1074.3606, isolatedReg: 378.8208, cherryReg: 1260.3077, cherry: 38.5506 },
            5: { big: 240.9410, reg: 257.0040, grape: 6.0530, payout: 107.0, isolatedBig: 315.0769, cherryBig: 1024.0000, isolatedReg: 327.6800, cherryReg: 1191.5636, cherry: 38.5506 },
            6: { big: 237.4490, reg: 237.4490, grape: 6.0152, payout: 110.1, isolatedBig: 310.5972, cherryBig: 1008.2462, isolatedReg: 297.8909, cherryReg: 1170.2857, cherry: 38.5506 },
        }
    },
    {
        id: 'ultra_miracle',
        name: 'ウルトラミラクルジャグラー',
        settings: {
            1: { big: 267.4900, reg: 425.5600, grape: 5.9400, payout: 98.1, isolatedBig: 334.3673, cherryBig: 1337.4694, isolatedReg: 595.7818, cherryReg: 1489.4545, cherry: 35.54 },
            2: { big: 261.1000, reg: 402.0600, grape: 5.9380, payout: 99.4, isolatedBig: 332.6701, cherryBig: 1213.6296, isolatedReg: 546.1333, cherryReg: 1524.0930, cherry: 35.54 },
            3: { big: 256.0000, reg: 350.4600, grape: 5.9360, payout: 101.4, isolatedBig: 329.3266, cherryBig: 1149.7544, isolatedReg: 489.0746, cherryReg: 1236.5283, cherry: 35.54 },
            4: { big: 242.7300, reg: 322.8400, grape: 5.9340, payout: 104.3, isolatedBig: 310.5972, cherryBig: 1110.7797, isolatedReg: 436.9067, cherryReg: 1236.5283, cherry: 35.54 },
            5: { big: 233.2200, reg: 297.8900, grape: 5.9330, payout: 106.9, isolatedBig: 304.8186, cherryBig: 992.9697, isolatedReg: 414.7848, cherryReg: 1057.0323, cherry: 35.54 },
            6: { big: 216.2900, reg: 277.6900, grape: 5.9290, payout: 110.5, isolatedBig: 281.2704, cherryBig: 936.2286, isolatedReg: 378.8208, cherryReg: 1040.2540, cherry: 35.54 },
        }
    },
    {
        id: 'neo_im',
        name: 'ネオアイムジャグラーEX',
        settings: {
            1: { big: 273.0667, reg: 439.8389, grape: 6.0240, payout: 97.9, isolatedBig: 387.7870, cherryBig: 923.0423, isolatedReg: 636.2718, cherryReg: 1424.6956, cherry: 35.2400 },
            2: { big: 269.6955, reg: 399.6098, grape: 6.0240, payout: 99.0, isolatedBig: 381.0233, cherryBig: 923.0423, isolatedReg: 569.8783, cherryReg: 1337.4694, cherry: 35.2400 },
            3: { big: 269.6955, reg: 330.9899, grape: 6.0240, payout: 100.1, isolatedBig: 381.0233, cherryBig: 923.0423, isolatedReg: 471.4820, cherryReg: 1110.7797, cherry: 35.2400 },
            4: { big: 259.0356, reg: 315.0769, grape: 6.0240, payout: 101.9, isolatedBig: 370.2599, cherryBig: 862.3158, isolatedReg: 445.8231, cherryReg: 1074.3607, cherry: 35.2400 },
            5: { big: 259.0356, reg: 255.0039, grape: 6.0240, payout: 104.5, isolatedBig: 370.2599, cherryBig: 862.3158, isolatedReg: 362.0774, cherryReg: 862.3158, cherry: 35.2400 },
            6: { big: 255.0039, reg: 255.0039, grape: 5.8480, payout: 106.8, isolatedBig: 362.0774, cherryBig: 862.3158, isolatedReg: 362.0774, cherryReg: 862.3158, cherry: 35.2400 },
        }
    }
];
