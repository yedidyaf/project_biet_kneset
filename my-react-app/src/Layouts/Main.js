import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import Navbar from './Navbar';
import News from '../News/News';
import Times from '../Times/Times';
import Donations from '../Donation/Donations';
import Members from '../members/Members';

function Main() {

    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || "");
    
    // const setUserApp = (newUser) => {
    //     setUser(newUser);
    // }
    // const deleteUser = () => {
    //     setUser("");
    // }
    // console.log(user);
    return (<><div>
        <BrowserRouter>
            <Routes>
            
                
                <Route path="/" element={<Navbar/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path='/news' element={<News/>} />
                    <Route path='/times' element={<Times/>} />
                    <Route path='/donations' element={<Donations/>} />
                    <Route path='/members' element={<Members/>} />
                </Route>
                {/* <Route path='*' element={<NotFoundPage />} /> */}
            </Routes>
        </BrowserRouter>

    </div>

    </>);
}

export default Main;