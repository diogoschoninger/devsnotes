import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Edit } from "./pages/Edit";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/"/>}></Route>
        <Route path="/" element={<Home/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
