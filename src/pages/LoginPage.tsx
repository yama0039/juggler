import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, Mail, UserPlus, LogIn } from 'lucide-react';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/');
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: window.location.hostname === 'yama0039.github.io'
                            ? 'https://yama0039.github.io/juggler/'
                            : window.location.origin,
                    },
                });
                if (error) throw error;
                setMessage('確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。');
            }
        } catch (err: any) {
            setError(err.message || 'エラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </h2>
                    <p className="text-gray-400">
                        {isLogin ? 'アカウントにログインしてください' : '新しいアカウントを作成します'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded text-sm">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-900/50 border border-green-500 text-green-200 p-4 rounded text-sm">
                        {message}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            メールアドレス
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-juggler-neonPink focus:border-transparent"
                                placeholder="example@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            パスワード
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-juggler-neonPink focus:border-transparent"
                                placeholder="••••••••"
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-juggler-neonYellow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-juggler-neonPink disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {loading ? (
                            '処理中...'
                        ) : isLogin ? (
                            <>
                                <LogIn className="mr-2 h-4 w-4" /> ログイン
                            </>
                        ) : (
                            <>
                                <UserPlus className="mr-2 h-4 w-4" /> アカウント作成
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError(null);
                            setMessage(null);
                        }}
                        className="text-sm text-juggler-neonPink hover:text-pink-400 transition-colors duration-200"
                    >
                        {isLogin
                            ? 'アカウントをお持ちでない方はこちら（新規登録）'
                            : 'すでにアカウントをお持ちの方はこちら（ログイン）'}
                    </button>
                </div>

                {/* Debug Info */}
                <div className="mt-4 p-4 bg-gray-900 rounded text-xs text-gray-400 break-all">
                    <p className="font-bold mb-1">Debug Info:</p>
                    <p>Hostname: {window.location.hostname}</p>
                    <p>Redirect URL: {
                        window.location.hostname === 'yama0039.github.io'
                            ? 'https://yama0039.github.io/juggler/'
                            : window.location.origin
                    }</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
