import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import TeamDetail from './pages/TeamDetail';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team/:id" element={<TeamDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
