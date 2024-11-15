import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import Navbar from './Navbar';
import News from '../News/News';
import Times from '../Times/Times';
import Donations from '../Donation/Donations';
import Members from '../members/Members';
import HomeG from '../gabai/Home/HomeG';
import NewsG from '../gabai/News/NewsG';
import TimesG from '../gabai/Times/TimesG';
import DonationsG from '../gabai/Donation/DonationsG';
import MembersG from '../gabai/members/MembersG';
import NavbarG from '../gabai/Layouts/NavbarG';
import Login from '../gabai/Layouts/Login';
import GabaiList from '../gabai/GabaiList';
import '../assets/css/Main.css'
import Article from '../component/Article';
import ArticleG from '../gabai/News/ArticaleG';
function Main() {

    
    return (<><div>
        <BrowserRouter>
            <Routes>
            
                
                <Route path="/" element={<Navbar/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path='/news' element={<News/>} />
                    <Route path="/news/:id" element={<Article/>} />
                    <Route path='/times' element={<Times/>} />
                    <Route path='/donations' element={<Donations/>} />
                    <Route path='/members' element={<Members/>} />
                </Route>
                <Route path="/gabai/login" element={<Login />}/>
                <Route path="/gabai/" element={<NavbarG/>}>
                    
                    <Route path="/gabai/home" element={<HomeG/>} />
                    <Route path='/gabai/news' element={<NewsG/>} />
                    <Route path='/gabai/news/:id' element={<ArticleG/>} />
                    <Route path='/gabai/times' element={<TimesG/>} />
                    <Route path='/gabai/donations' element={<DonationsG/>} />
                    <Route path='/gabai/members' element={<MembersG/>} />
                    <Route path='/gabai/gabais' element={<GabaiList/>} />
                </Route>
            </Routes>
        </BrowserRouter>

    </div>

    </>);
}

export default Main;