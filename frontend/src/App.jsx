import React from 'react';
import './Styles/main.scss';

import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './hooks/UserContext';
import Genre from './components/Genre';


function App() {
  return (
    <UserProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/genre" element={<Genre />} />
        </Routes>
      </Layout>
      <footer>
        <p>What To See? © 2024 </p>
        <p>Developed By: Khalil Sfouk & Odai Alissa</p>
      </footer>
    </UserProvider>
  );
}

export default App;
