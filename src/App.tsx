import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
// ... imports

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="analyzer" element={<AnalyzerPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="record" element={<RecordPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="counter" element={<CounterPage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
