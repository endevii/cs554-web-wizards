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
import IndividualSite from './components/IndividualSite';
import SiteList from './components/SiteList';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
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
              <Route path='/site/:id' element={<IndividualSite />} />
              <Route path='/sites' element={<SiteList />} />
              <Route path='*' element={<Home />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
  );
}

export default App;
