import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SearchForm from "@/containers/SearchForm/SearchForm";

const Layout = () => {
    return (
        <>
            <Header />
            <SearchForm />
            <Outlet />
        </>
    );
};

export default Layout;
