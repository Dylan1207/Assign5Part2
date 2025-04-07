import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ViewData from './pages/ViewData';
import AddData from './pages/AddData';
import ModifyData from './pages/ModifyData';

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Home</Link> | 
        <Link to="/view">View</Link> | 
        <Link to="/add">Add</Link> | 
        <Link to="/modify">Modify</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<ViewData />} />
        <Route path="/add" element={<AddData />} />
        <Route path="/modify" element={<ModifyData />} />
      </Routes>
    </div>
  );
}

export default App;