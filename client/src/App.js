import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import EmployeeGrid from './components/EmployeeGrid';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import AddEmployee from './components/AddEmployee';

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/grid" element={
          <PrivateRoute>
            <EmployeeGrid />
          </PrivateRoute>
        }
        />
        <Route path="/add-employee" element={
          <PrivateRoute>
            <AddEmployee />
          </PrivateRoute>
        }
        />
      </Routes>

    </>
  )
};

export default App;
