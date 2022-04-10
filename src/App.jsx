import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Edit } from "./pages/Edit";
import { View } from "./pages/View";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/"/>}></Route>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/view/:id" element={<View/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
