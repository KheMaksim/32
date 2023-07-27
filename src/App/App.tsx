import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import Page from "@/containers/Page/Page";
import Home from "@/components/Home/Home";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"home"} element={<Home />} />
                    <Route path="/:pageName" element={<Page />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
