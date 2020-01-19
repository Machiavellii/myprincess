import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import store from "./store";
import { Provider } from "react-redux";

import setAuthToken from "./utills/setAuthToken";
import setAdminToken from "./utills/setAdminToken";

import MiniHeader from "./components/layout/MiniHeader";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Login from "./components/auth/Login";

import LoginAdmin from "./components/admin/LoginAdmin";

import Register from "./components/auth/Register";
import BlockedAccount from "./components/auth/BlockedAccount";
import Landing from "./components/landing/Landing";
import DescribeContent from "./components/landing/landingpages/landingcontent/singleGirl/Describe";
import Links from "./components/landing/landingpages/Links";
import Faq from "./components/pages/Faq";
import Contact from "./components/pages/Contact";
import Postanad from "./components/pages/postAnAd/Postanad";
import PostAnAdForm from "./components/pages/postAnAd/PostAnAdForm";
import EditAdForm from "./components/pages/postAnAd/EditAdForm";
import Search from "./components/pages/search/Search";
import EscortsGirls from "./components/pages/EscortsGirls";
// import MyProfiles from './components/pages/my-profiles/MyProfiles';
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import Admin from "./components/admin/admin";
import EditAdmin from "./components/admin/editAdmin";
import UploadCover from "./components/pages/postAnAd/UploadCover";
import UploadGallery from "./components/pages/postAnAd/UploadGallery";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import Terms from "./components/layout/Terms";

import { loadUser, getUsers } from "./actions/auth";
import { loadAdmin } from "./actions/adminAuth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

if (localStorage.tokenAdmin) {
  setAdminToken(localStorage.tokenAdmin);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadAdmin());
    store.dispatch(getUsers());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <MiniHeader />
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/blocked" component={BlockedAccount} />
            <Route exact path="/superadminlogin" component={LoginAdmin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/contact" component={Contact} />
            <PrivateRoute exact path="/postanad" component={Postanad} />
            <PrivateRoute exact path="/postanadform" component={PostAnAdForm} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/profile/user/:id" component={DescribeContent} />
            <Route exact path="/links" component={Links} />
            {/* <Route exact path="/my-profile" component={MyProfiles} /> */}
            <Route
              exact
              path="/escorts-girls/:canton"
              component={EscortsGirls}
            />
            <Route exact path="/terms" component={Terms} />

            <AdminRoute exact path="/superadmin" component={Admin} />
            <AdminRoute exact path="/editprofileAdmin" component={EditAdmin} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/edit-profile" component={EditAdForm} />
            <PrivateRoute exact path="/upload-cover" component={UploadCover} />
            <PrivateRoute
              exact
              path="/upload-gallery"
              component={UploadGallery}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
