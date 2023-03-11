import React from "react";
import "./App.css";
import { Navigate } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./pages/LoginPage";
import FolderList from "./pages/Folder/FolderList";
import Folder from "./pages/Folder/Folder";
import Home from "./pages/Home";
import CampaignCreator from "./pages/Campaign/CampaignCreator";
import SideBar from "./components/SideBar";
import { RootState } from "./store";
import RequireAuth from "./components/private/RequireAuth";

function App() {
    const auth = useSelector((state: RootState) => state.auth);

    return (
        <Router>
            <SideBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        auth.isAuthenticated ? (
                            <Navigate replace to="/home" />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route
                    path="home/*"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route path="login/*" element={<LoginForm />} />
                <Route
                    path="folders/*"
                    element={
                        <RequireAuth>
                            <FolderList />
                        </RequireAuth>
                    }
                />
                <Route
                    path="folders/:folderId"
                    element={
                        <RequireAuth>
                            <Folder />
                        </RequireAuth>
                    }
                />
                <Route
                    path="campaigns"
                    element={
                        <RequireAuth>
                            <CampaignCreator />
                        </RequireAuth>
                    }
                />
                <Route
                    path="campaigns/:groupId"
                    element={<CampaignCreator />}
                />
            </Routes>
        </Router>
    );
}
export default App;
