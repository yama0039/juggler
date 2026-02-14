
const Home = () => {
    return (
        <div className="text-center py-10">
            <h1 className="text-4xl font-bold mb-6 text-juggler-neonPink drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                GOGO! Analyzer
            </h1>
            <p className="text-xl mb-8">
                最強のジャグラー設定判別＆収支管理ツール
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-juggler-neonPink transition-colors">
                    <h2 className="text-2xl font-bold mb-2 text-juggler-neonYellow">設定判別</h2>
                    <p>小役確率から設定を推測！</p>
                </div>
                <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-juggler-neonPink transition-colors">
                    <h2 className="text-2xl font-bold mb-2 text-juggler-neonYellow">データ保存</h2>
                    <p>詳細な稼働データをクラウド保存</p>
                </div>
                <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-juggler-neonPink transition-colors">
                    <h2 className="text-2xl font-bold mb-2 text-juggler-neonYellow">収支分析</h2>
                    <p>グラフで収支を一目で確認</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
