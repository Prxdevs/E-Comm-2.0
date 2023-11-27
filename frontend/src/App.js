import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './Pages/Home';
import About from './Pages/About';
import ProductDetails from './Pages/ProductDetails';
import Footer from './components/footer';

function App() {
  return (
    <Router>
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
      </Routes>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
