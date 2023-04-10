import './App.css';
import Main from './component/main'
import { Route, Routes } from "react-router-dom";
import Details from './component/details'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/details" element={<Details/>} />
    </Routes>
  );
}

export default App;
