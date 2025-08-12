import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MealDetail from "./pages/MealDetail";
import Favorites from "./pages/Favorites";
import Countries from "./pages/Countries";
import Footer from "./components/Footer";

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen w-full bg-background">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/countries" element={<Countries />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
