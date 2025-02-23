import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./views/HomePage";
import ProductPage from "./views/ProductPage";


function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/:id" element={<ProductPage/>} />
                </Routes>
            </BrowserRouter>
        </>

    )

}

export default App
