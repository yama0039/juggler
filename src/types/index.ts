
export interface JugglerRecord {
    id: string;
    user_id: string;
    created_at: string;
    date: string;
    hall_name: string;
    machine_type: string;
    machine_number?: number;
    total_spins: number;
    isolated_big?: number;
    cherry_big?: number;
    isolated_reg?: number;
    cherry_reg?: number;
    grape?: number;
    non_overlapping_cherry?: number;
    investment: number;
    recovery: number;
    memo?: string;
}
