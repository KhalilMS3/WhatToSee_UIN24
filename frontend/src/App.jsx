import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './Styles/main.scss';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { UserProvider } from './hooks/UserContext';


function App() {
  return (
    <UserProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </UserProvider>
  );
}

export default App;
