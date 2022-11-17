import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RouteGuard from './RouteGuard';
import DefaultLayout from 'components/layouts/DefaultLayout';
import MainPage from 'pages/MainPage';
import SigninPage from 'pages/SigninPage';
import SignupPage from 'pages/SignupPage';
import ProfilePage from 'pages/ProfilePage';
import FriendPage from 'pages/FriendPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RouteGuard children={<DefaultLayout><MainPage /></DefaultLayout>} />} />

                <Route path="/signin" element={<SigninPage />} />

                <Route path="/signup" element={<SignupPage />} />

                <Route path="/profile" element={<RouteGuard children={<DefaultLayout><ProfilePage /></DefaultLayout>} />} />

                <Route path="/friend" element={<RouteGuard children={<DefaultLayout><FriendPage /></DefaultLayout>} />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router