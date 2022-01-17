import React, {useEffect} from "react";
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage"
import Gallery from './pages/Gallery';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [])
  
  return (
    <div className="App">
      <Header/>
      <div id="content" style={{ marginBottom: '70px' }}>
        <Routes>
          <Route path="/" element={<IndexPage/>} />
          <Route path="/gallery" element={<Gallery/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
