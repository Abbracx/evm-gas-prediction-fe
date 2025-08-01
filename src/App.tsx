import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GasProvider } from './context/GasContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Calculator } from './pages/Calculator';
import { Historical } from './pages/Historical';

function App() {
  return (
    <GasProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/historical" element={<Historical />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </Layout>
      </Router>
    </GasProvider>
  );
}

export default App;
