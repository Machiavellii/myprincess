import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import store from "./store";
import { Provider } from "react-redux";

import setAuthToken from "./utills/setAuthToken";
import setAdminToken from "./utills/setAdminToken";

import MiniHeader from "./components/layout/MiniHeader";
import Navbar from "./components/layout/Navbar";
import BottomNavbar from "./components/layout/BottomNav";
import Footer from "./components/layout/Footer";

import SignInAndSignUpPage from "./components/auth/SignInAndSignUpPage";

import LoginAdmin from "./components/admin/LoginAdmin";

import BlockedAccount from "./components/auth/BlockedAccount";
import Landing from "./components/landing/Landing";
import DescribeContent from "./components/landing/landingpages/landingcontent/singleGirl/Describe";
import Links from "./components/landing/landingpages/Links";
// import Faq from "./components/pages/Faq";
import Contact from "./components/pages/Contact";
import Postanad from "./components/pages/postAnAd/Postanad";
import PricingPlan from "./components/pages/postAnAd/PricingPlan";
import PostAnAdForm from "./components/pages/postAnAd/PostAnAdForm";
import EditAdForm from "./components/pages/postAnAd/EditAdForm";
import Search from "./components/pages/search/Search";
import EscortsGirls from "./components/pages/EscortsGirls";
import WebcamGirls from "./components/pages/WebcamGirls";
import Alert from "./components/layout/Alert";
import Confirm from "./components/layout/Confirm";
import Dashboard from "./components/dashboard/Dashboard";
import Admin from "./components/admin/admin";
import EditAdmin from "./components/admin/editAdmin";
import UploadCover from "./components/pages/postAnAd/UploadCover";
import UploadGallery from "./components/pages/postAnAd/UploadGallery";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import Terms from "./components/layout/Terms";

import AgencyAdForm from "./components/pages/postAnAd/AgencyAdForm";
import AgencyEditAdForm from "./components/pages/postAnAd/AgencyEditAdForm";
import UploadAgencyCover from "./components/pages/postAnAd/UploadAgencyCover";
import UploadAgencyGallery from "./components/pages/postAnAd/UploadAgencyGallery";
import AgencyPostAnAd from "./components/pages/postAnAd/AgencyPostAnAd";
import AgencyPricingPlan from "./components/pages/postAnAd/AgencyPricingPlan";
import AgencyDashboard from "./components/dashboard/AgencyDashboard";
import DescribeAgency from "./components/landing/landingpages/landingcontent/singleAgency/DescribeAgency";

import { loadUser, getUsers } from "./actions/auth";
import { loadAdmin } from "./actions/adminAuth";

//import GA from './utills/GoogleAnalytics';

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

  // const confirm = window.sessionStorage.getItem("confirm");
  const confirm = localStorage.getItem("confirm");

  return (
    <Provider store={store}>
      <Router>
        <div className="overlay-container">
          {!confirm ? <Confirm /> : null}
          {/* {GA.init() && <GA.RouteTracker />} */}
          <div className="App">
            <MiniHeader />
            <Navbar />
            <Alert />
            <Switch>
              <Route exact path="/" component={Landing} />

              <Route exact path="/auth" component={SignInAndSignUpPage} />
              <Route exact path="/blocked" component={BlockedAccount} />
              <Route exact path="/superadminlogin" component={LoginAdmin} />
              <Route exact path="/webcamgirls" component={WebcamGirls} />

              <Route exact path="/confirm" component={Confirm} />
              <Route exact path="/contact" component={Contact} />
              <PrivateRoute exact path="/postanad" component={Postanad} />
              <PrivateRoute exact path="/pricingplan" component={PricingPlan} />
              <PrivateRoute
                exact
                path="/postanadform"
                component={PostAnAdForm}
              />
              <PrivateRoute
                exact
                path="/agencyadform"
                component={AgencyAdForm}
              />
              <Route exact path="/search" component={Search} />
              <Route
                exact
                path="/profile/user/:id"
                component={DescribeContent}
              />
              <Route exact path="/agency/user/:id" component={DescribeAgency} />
              <Route exact path="/links" component={Links} />
              <Route
                exact
                path="/escorts-girls/:canton"
                component={EscortsGirls}
              />
              <Route exact path="/terms" component={Terms} />

              <AdminRoute exact path="/superadmin" component={Admin} />
              <AdminRoute
                exact
                path="/editprofileAdmin"
                component={EditAdmin}
              />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/edit-profile" component={EditAdForm} />
              <PrivateRoute
                exact
                path="/upload-cover"
                component={UploadCover}
              />
              <PrivateRoute
                exact
                path="/upload-gallery"
                component={UploadGallery}
              />

              <PrivateRoute
                exact
                path="/agencydashboard"
                component={AgencyDashboard}
              />
              <PrivateRoute
                exact
                path="/agency-edit-profile"
                component={AgencyEditAdForm}
              />
              <PrivateRoute
                exact
                path="/agency-upload-cover"
                component={UploadAgencyCover}
              />
              <PrivateRoute
                exact
                path="/agency-upload-gallery"
                component={UploadAgencyGallery}
              />
              <PrivateRoute
                exact
                path="/agencypostanad"
                component={AgencyPostAnAd}
              />
              <PrivateRoute
                exact
                path="/agencypricingplan"
                component={AgencyPricingPlan}
              />
            </Switch>
            {window.innerWidth < 993 && confirm ? <BottomNavbar /> : null}
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
