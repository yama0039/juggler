import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Hall {
    id: string;
    name: string;
}

export const useHalls = () => {
    const { user } = useAuth();
    const [halls, setHalls] = useState<Hall[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHalls = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('halls')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setHalls(data || []);
        } catch (err: any) {
            console.error('Error fetching halls:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const addHall = async (name: string) => {
        if (!user) return null;
        try {
            const { data, error } = await supabase
                .from('halls')
                .insert([{ user_id: user.id, name }])
                .select()
                .single();

            if (error) throw error;
            setHalls(prev => [data, ...prev]);
            return data;
        } catch (err: any) {
            console.error('Error adding hall:', err);
            setError(err.message);
            return null;
        }
    };

    const deleteHall = async (id: string) => {
        if (!user) return false;
        try {
            const { error } = await supabase
                .from('halls')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setHalls(prev => prev.filter(hall => hall.id !== id));
            return true;
        } catch (err: any) {
            console.error('Error deleting hall:', err);
            setError(err.message);
            return false;
        }
    };

    useEffect(() => {
        fetchHalls();
    }, [fetchHalls]);

    return { halls, loading, error, addHall, deleteHall, refreshHalls: fetchHalls };
};
