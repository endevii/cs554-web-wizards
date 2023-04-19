import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';
import PrivateRoute from './components/PrivateRoute';
import SignedInRoute from './components/SignedInRoute';
import NavigationBar from './components/NavigationBar';
import SiteList from './components/SiteList';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar/>
      
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/signin' element={<SignedInRoute/>}>
            <Route path='/signin' element={<SignIn />} />
          </Route>
          <Route path='/signup' element={<SignedInRoute/>}>
            <Route path='/signup' element={<SignUp />} />
          </Route>
          <Route path='/account' element={<PrivateRoute />}>
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/sites' element={<SiteList />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
