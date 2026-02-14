
export type JugglerModel = 'im_ex' | 'my_v' | 'funky_2' | 'happy_v3' | 'gogo_3' | 'girls_ss' | 'mr_j' | 'ultra_miracle' | 'neo_im';

export interface Probability {
    big: number;
    reg: number;
    grape?: number;
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
            1: { big: 273.1, reg: 439.8, grape: 6.02 },
            2: { big: 269.7, reg: 399.6, grape: 6.02 },
            3: { big: 269.7, reg: 331.0, grape: 6.02 },
            4: { big: 259.0, reg: 315.1, grape: 5.90 },
            5: { big: 259.0, reg: 255.0, grape: 5.78 },
            6: { big: 255.0, reg: 255.0, grape: 5.78 },
        },
    },
    {
        id: 'my_v',
        name: 'マイジャグラーV',
        settings: {
            1: { big: 273.1, reg: 409.6, grape: 5.90 },
            2: { big: 270.8, reg: 385.5, grape: 5.84 },
            3: { big: 266.4, reg: 336.1, grape: 5.80 },
            4: { big: 254.0, reg: 290.0, grape: 5.75 },
            5: { big: 240.9, reg: 277.7, grape: 5.70 },
            6: { big: 229.1, reg: 229.1, grape: 5.66 },
        },
    },
    {
        id: 'funky_2',
        name: 'ファンキージャグラー2',
        settings: {
            1: { big: 266.4, reg: 439.8, grape: 5.85 },
            2: { big: 259.0, reg: 407.1, grape: 5.80 },
            3: { big: 256.0, reg: 366.1, grape: 5.74 },
            4: { big: 249.2, reg: 322.8, grape: 5.69 },
            5: { big: 240.9, reg: 299.3, grape: 5.65 },
            6: { big: 219.9, reg: 262.1, grape: 5.60 },
        },
    },
    {
        id: 'happy_v3',
        name: 'ハッピージャグラーV III',
        settings: {
            1: { big: 273.1, reg: 409.6, grape: 6.05 },
            2: { big: 270.8, reg: 364.1, grape: 5.95 },
            3: { big: 263.2, reg: 341.3, grape: 5.90 },
            4: { big: 254.0, reg: 315.1, grape: 5.82 },
            5: { big: 239.2, reg: 287.4, grape: 5.78 },
            6: { big: 226.0, reg: 256.0, grape: 5.74 },
        },
    },
    {
        id: 'gogo_3',
        name: 'ゴーゴージャグラー3',
        settings: {
            1: { big: 259.0, reg: 354.2, grape: 6.25 },
            2: { big: 258.0, reg: 332.7, grape: 6.20 },
            3: { big: 257.0, reg: 306.2, grape: 6.15 },
            4: { big: 254.0, reg: 268.6, grape: 6.10 },
            5: { big: 247.3, reg: 255.0, grape: 6.05 },
            6: { big: 234.9, reg: 234.9, grape: 6.00 },
        },
    },
    {
        id: 'girls_ss',
        name: 'ジャグラーガールズSS',
        settings: {
            1: { big: 273.1, reg: 381.0, grape: 6.01 },
            2: { big: 270.8, reg: 350.5, grape: 6.01 },
            3: { big: 260.1, reg: 316.6, grape: 6.01 },
            4: { big: 250.1, reg: 281.3, grape: 6.01 },
            5: { big: 243.6, reg: 270.8, grape: 5.92 },
            6: { big: 226.0, reg: 252.1, grape: 5.89 },
        },
    },
    {
        id: 'mr_j',
        name: 'ミスタージャグラー',
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
            // 6号機で実在する場合の推測値（検索結果に基づく）
            1: { big: 267.5, reg: 425.6, grape: 6.05 },
            2: { big: 261.1, reg: 402.1, grape: 6.05 },
            3: { big: 256.0, reg: 350.5, grape: 6.00 },
            4: { big: 242.7, reg: 322.8, grape: 5.95 },
            5: { big: 233.2, reg: 297.9, grape: 5.90 },
            6: { big: 216.3, reg: 277.7, grape: 5.85 },
        },
    },
    {
        id: 'neo_im',
        name: 'ネオアイムジャグラーEX',
        // 6号機アイムジャグラーEXと同スペック
        settings: {
            1: { big: 273.1, reg: 439.8, grape: 6.02 },
            2: { big: 269.7, reg: 399.6, grape: 6.02 },
            3: { big: 269.7, reg: 331.0, grape: 6.02 },
            4: { big: 259.0, reg: 315.1, grape: 5.90 },
            5: { big: 259.0, reg: 255.0, grape: 5.78 },
            6: { big: 255.0, reg: 255.0, grape: 5.78 },
        },
    },
];
