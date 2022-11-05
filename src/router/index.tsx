import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteGuard from './RouteGuard';
import DefaultLayout from 'layouts/DefaultLayout';
import MainPage from 'pages/MainPage';
import SigninPage from 'pages/SigninPage';
import SignupPage from 'pages/SignupPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RouteGuard children={<DefaultLayout><MainPage /></DefaultLayout>}></RouteGuard>} />

                <Route path="/signin" element={<SigninPage />} />

                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router