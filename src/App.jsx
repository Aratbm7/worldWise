import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="*" element={<NotFound/>}/>


      </Routes>
    
    </BrowserRouter>
  )


}

export default App;
