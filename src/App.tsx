import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/index';
import Login from './components/login';
import Dashboard from './components/modules/dashboard/index';
import Inventory from './components/modules/inventory/index';
import Shipment from './components/modules/shipment';

const App: React.FC = () => {
  const login = useSelector((state: RootState) => state.auth.login);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={login ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={login ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/inventory" element={login ? <Inventory /> : <Navigate to="/login" />} />
        <Route path="/shipment" element={login ? <Shipment /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
