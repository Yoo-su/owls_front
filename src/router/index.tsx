import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteGuard from './RouteGuard';
import DefaultLayout from 'components/layouts/DefaultLayout';
import MainPage from 'pages/MainPage';
import SigninPage from 'pages/SigninPage';
import SignupPage from 'pages/SignupPage';
import ProfilePage from 'pages/ProfilePage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RouteGuard children={<DefaultLayout><MainPage /></DefaultLayout>} />} />

                <Route path="/signin" element={<SigninPage />} />

                <Route path="/signup" element={<SignupPage />} />

                <Route path="/profile" element={<RouteGuard children={<DefaultLayout><ProfilePage /></DefaultLayout>} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router