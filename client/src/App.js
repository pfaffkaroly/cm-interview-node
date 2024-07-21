import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upvote from './pages/Upvote';
import Toplist from './pages/Toplist';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Upvote />} />
          <Route path="upvote" element={<Upvote />} />
          <Route path="toplist" element={<Toplist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
