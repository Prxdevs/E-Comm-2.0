import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './Pages/Home';
import About from './Pages/About';
import ProductDetails from './Pages/ProductDetails/index.js';
import Collection from './Pages/Collection/index.js';
import Profile from './Pages/Profile/index.js';
import Footer from './components/footer';
import TermsAndCondition from './Pages/TermsAndCondition.js';
import Refund from './Pages/Refund.js';
import Privacy from './Pages/Privacy.js';

function App() {
  return (
    <Router>
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
