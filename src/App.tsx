import './App.css'
import Home from './component/home'
import Details from './component/details'
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/page/:page&min_price/:min_price&max_price/:max_price&food/:food&transport/:transport&personal/:personal&housing/:housing" element={<Home/>} />
            <Route path="/details/:id" element={<Details/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
