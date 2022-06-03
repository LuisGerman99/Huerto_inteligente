import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Huerto from "./pages/Huerto_page";
import Errorpage from "./pages/Errorpage";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Huerto />} />
          <Route path="*" element={<Errorpage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
