import './App.css'
import Home from './component/home'
import Details from './component/details'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/:page/:min_price/:max_price/:food/:transport/:personal/:housing" element={<Home/>} />
            <Route path="/details/:id" element={<Details/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
