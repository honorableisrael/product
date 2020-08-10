import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import SignIn from "./Component/AccountManager/SignIn";
import SignUp from "./Component/AccountManager/SignUp";
import ForgotPassword from "./Component/AccountManager/ForgotPassword";
import EmailVerified from "./Component/AccountManager/EmailVerified";
import EnterNewPassword from "./Component/AccountManager/ResetPassword";
import EnterVerificationCode from "./Component/AccountManager/EnterVerificationCode";
import Home from "./Component/Home/Home";
import About from "./Component/About/About";
import Products from "./Component/Products/Product";
import Contact from "./Component/ContactUs/Contact";
import PrivacyPolicy from "./Component/PrivacyPolicy/PrivacyPolicy";
import FAQs from "./Component/FAQs/FAQS";
import Dashboard from "./Component/Dashboard/Dashboard";
import ProfileSettings from "./Component/Dashboard/ProfileSettings";
import DashboardProductSubscribed from "./Component/Dashboard/DashboardProductSubscribed";
import DashboardHistory from "./Component/Dashboard/DashboardHistory";
import DashboardProducts from "./Component/Dashboard/DashboardProducts";
import DashboardReservedProductsDescription from "./Component/Dashboard/DashboardProductsDescription";
import CompleteOrder from "./Component/CompleteOrder/CompleteOrder";
import OrderPending from "./Component/CompleteOrder/OrderPendingPage";
import OrderSuccess from "./Component/CompleteOrder/OrderSuccess";
import SubAccountConversionSuccess from "./Component/CompleteOrder/SubAccountConversionSuccessfull";
import DashboardSubaccounts from "./Component/Dashboard/DashboardSubAccounts";
import DashboardSubaccountsConvert from "./Component/Dashboard/DashboardSubAccountsEdit";
import ProductDescription from "./Component/ProductDescription/productdescription";
import Statistics from "./Component/Admin/Statistics/Statistics";
import Statistics1 from "./Component/Admin/Statistics/Statistics1";


const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/emailverified" component={EmailVerified} />
            <Route exact path="/reset-password" component={EnterNewPassword} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/product/:id" component={ProductDescription} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/privacypolicy" component={PrivacyPolicy} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/dashboardhistory"
              component={DashboardHistory}
            />
            <Route
              exact
              path="/dashboardsubscribed"
              component={DashboardProductSubscribed}
            />
            <Route exact path="/completeorder" component={CompleteOrder} />
            <Route exact path="/pendingorder" component={OrderPending} />
            <Route exact path="/pendingsuccess" component={OrderSuccess} />
            <Route
              exact
              path="/subaccountsuccess"
              component={SubAccountConversionSuccess}
            />
            <Route
              exact
              path="/dashboardsubaccounts"
              component={DashboardSubaccounts}
            />
            <Route
              exact
              path="/subaccount/:id"
              component={DashboardSubaccountsConvert}
            />
            <Route
              exact
              path="/dashboardreservedproducts"
              component={DashboardReservedProductsDescription}
            />
            <Route exact path="/profilesettings" component={ProfileSettings} />
            <Route
              exact
              path="/dashboardproducts"
              component={DashboardProducts}
            />
            <Route exact path="/faqs" component={FAQs} />
            <Route
              exact
              path="/verify-account"
              component={EnterVerificationCode}
            />
            <Route exact path="/realtime1" component={Statistics} />
            <Route exact path="/realtime" component={Statistics1} />
            <Route exact path="/about" component={About} />
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
