import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GasProvider } from './context/GasContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <GasProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </GasProvider>
  );
}

export default App;
