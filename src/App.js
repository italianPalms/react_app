import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home_page/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import NoPage from "./pages/no_page/NoPage";
import Profile from "./pages/profile_page/Profile";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import Protected from "./components/Protected";
import VerifyEmail from "./pages/verify_email/VerifyEmail";
import About from "./pages/about/About";
import Investors from "./pages/investor/Investors";
import Movies from "./pages/movies/Movies";
import EtchASketch from "./pages/etch_a_sketch/EtchASketch";
import Groceries from "./pages/groceries/Groceries";
import AllUsers from "./pages/all_users/Allusers";
import RockPaperScissor from "./pages/rock_paper_scissor/RockPaperScissor";
import Sidebar from './pages/global/sidebar';
import Topbar from './pages/global/topbar';

function App() {

  return (
    <div className="flex relative text-white bg-gray-900 h-fit min-h-screen">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path = "/home" element={<Home />} />
          <Route path = "/login" element= { <Login />} />
          <Route path = "/signup" element= { <Signup />} />
          <Route path = "/forgotPassword" element={ <ForgotPassword />} />
          <Route path = "/verifyEmail" element= { <VerifyEmail />} />
          <Route path = "/about" element = { <About /> } />
          <Route path = "/investors" element = { <Investors /> } />

          <Route path ="/profile" element= {
            <Protected Login={Login}>
            <Profile />
            </Protected>
            }/>
          <Route path = "/movies" element = {
            <Protected  Login={Login}>
              <Movies />
            </Protected>
          } />

          <Route path = "/groceries" element = {
            <Protected  Login={Login}>
              <Groceries />
            </Protected>
          } />

          <Route path = "/etchASketch" element = {
            <Protected Login={Login}>
              <EtchASketch />
            </Protected>
          } />

          <Route path = "/allusers" element = {
            <Protected Login={Login}>
              <AllUsers />
            </Protected>
          } />

          <Route path = "/rockPaperScissor" element = {
            <Protected Login={Login}>
              <RockPaperScissor />
            </Protected>
          } />

          <Route path="*" element= {<NoPage />} />
        </Routes>
        </main>
    </div>
  );
}

export default App;
