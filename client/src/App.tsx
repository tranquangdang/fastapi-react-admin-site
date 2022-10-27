import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './admin/Layout';
import Dashboard from './admin/dashboard/Dashboard';
import Login from './admin/Login';
import Products from './admin/products/Products';
import Detail from './admin/products/Detail';
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Admin */}
        <Route path="" element={<Login />} />
        <Route path="admin" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="products">
            <Route path="" element={<Products />} />
            <Route path="create" element={<Detail />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
