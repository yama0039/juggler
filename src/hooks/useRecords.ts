
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { JugglerRecord } from '../types';

export const useRecords = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addRecord = async (record: Omit<JugglerRecord, 'id' | 'created_at' | 'user_id'>) => {
        setLoading(true);
        setError(null);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('ログインが必要です');
            }

            const { error: insertError } = await supabase
                .from('juggler_records')
                .insert([
                    { ...record, user_id: user.id }
                ]);

            if (insertError) {
                throw insertError;
            }

            return true;
        } catch (err: any) {
            console.error('Error adding record:', err);
            setError(err.message || 'データの保存に失敗しました');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getRecords = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('ログインが必要です');

            const { data, error: fetchError } = await supabase
                .from('juggler_records')
                .select('*')
                .order('date', { ascending: false });

            if (fetchError) throw fetchError;
            return data as JugglerRecord[];
        } catch (err: any) {
            console.error('Error fetching records:', err);
            setError(err.message || 'データの取得に失敗しました');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const deleteRecord = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error: deleteError } = await supabase
                .from('juggler_records')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;
            return true;
        } catch (err: any) {
            console.error('Error deleting record:', err);
            setError(err.message || 'データの削除に失敗しました');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        addRecord,
        getRecords,
        deleteRecord,
        loading,
        error,
    };
};
