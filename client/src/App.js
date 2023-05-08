import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChangePassword from "./components/ChangePassword";
import Account from "./components/Account";
import PrivateRoute from "./components/PrivateRoute";
import SignedInRoute from "./components/SignedInRoute";
import NavigationBar from "./components/NavigationBar";
import SiteList from "./components/SiteList";
import Map from "./components/Map";
import Chat from "./components/Chat";
import IndividualSite from "./components/IndividualSite";
import PopularItineraries from "./components/PopularItineraries";
import CreateItinerary from "./components/CreateItinerary";
import RequestSite from "./components/RequestSite";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignedInRoute />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route path="/signup" element={<SignedInRoute />}>
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="/account" element={<PrivateRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/changepassword" element={<PrivateRoute />}>
            <Route path="/changepassword" element={<ChangePassword />} />
          </Route>
          <Route path="/sites" element={<SiteList />} />
          <Route
            path="/chat"
            element={<Chat thisRoom={"Historical Site: "} />}
          />
          <Route path="/*" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/site/:id" element={<IndividualSite />} />
          <Route path="/itineraries" element={<PopularItineraries />} />
          <Route path="/createItinerary" element={<CreateItinerary />} />
          <Route path="/requestSite" element={<RequestSite />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
