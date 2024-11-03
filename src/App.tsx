import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './UserProfile';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster />
      <UserProfile />
    </div>
  );
}

export default App;
