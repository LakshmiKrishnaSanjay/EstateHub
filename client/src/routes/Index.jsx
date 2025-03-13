import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/guest/Home";
import SignIn from "../pages/guest/SignIn";
import SignUp from "../pages/guest/SignUp";
import About from "../pages/guest/About";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFound from "../pages/NotFound";


import AdminHeader from "../components/AdminHeader";
import AdminDashboard from "../pages/admin/AdminDashboard";

import UserHome from "../pages/user/UserHome";
import UserProfile from "../pages/user/UserProfile";
import UserNavBar from "../components/UserNavBar";
import OwnerNavBar from "../components/OwnerNavBar";
import OwnerHome from "../pages/owner/OwnerHome";
import OwnerProfile from "../pages/owner/OwnerProfile";
import AddProperty from "../pages/owner/AddProperty";
import EditProperty from "../pages/owner/EditProperty";
import Notifications from "../pages/owner/Notifications";
import Team from "../pages/guest/Team";
import Services from "../pages/guest/Services";
import ContactPage from "../pages/guest/ContactPage";
import SignUpAgent from "../pages/guest/SignUpAgent";
import SignUpOwner from "../pages/guest/SignUpOwner";
import ViewProperty from "../pages/owner/ViewProperty";
import ViewMoreProperty from "../pages/owner/ViewMoreProperty";
import BuyAProperty from "../pages/user/BuyAProperty";
import RentAProperty from "../pages/user/RentAProperty";
import PropertyDetails from "../pages/user/PropertyDetails";
import RentPropertyDetails from "../pages/user/RentPropertyDetails";
import AgentHome from "../pages/agent/AgentHome";
import AgentHeader from "../components/AgentHeader";
import AddProperties from "../pages/agent/AddProperties";
import ViewProperties from "../pages/agent/ViewProperties";
import ViewMore from "../pages/agent/ViewMore";
import Edit from "../pages/agent/Edit";
import NotificationAgent from "../pages/agent/NotificationAgent";
import AgentProfile from "../pages/agent/AgentProfile";
import Chat from "../pages/user/chat";
import OwnerPayment from "../pages/owner/OwnerPayment";
import AgentPayment from "../pages/agent/AgentPayment";
import ViewCustomers from "../pages/admin/ViewCustomers";
import PaymentHistory from "../pages/admin/PaymentHistory";
import ViewComplaints from "../pages/admin/ViewComplaints";
import ViewMoreProfile from "../pages/admin/ViewMoreProfile";
import UserPieChart from "../pages/admin/UserPieChart";
import DateWiseReport from "../pages/admin/DateWiseReport";





function Layout() {
  const location = useLocation();
  
  const isAdminPage = location.pathname.startsWith("/admin") || location.pathname.startsWith("/dashboard");
  const isUserPage = location.pathname.startsWith("/user") || location.pathname.startsWith("/userprofile");
  const isOwnerPage = location.pathname.startsWith("/owner") || location.pathname.startsWith("/ownerprofile");
  const isAgentPage = location.pathname.startsWith("/agent");

  return (
    <>
      {isAdminPage ? <AdminHeader /> : isUserPage ? <UserNavBar /> : isOwnerPage ? <OwnerNavBar /> : isAgentPage ? <AgentHeader /> : <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signupagent" element={<SignUpAgent />} />
        <Route path="/signupowner" element={<SignUpOwner />} />
        
        <Route path="/*" element={<NotFound />} />

        {/* admin */}
        
        <Route path="/admin">
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="viewcustomers" element={<ViewCustomers />} />
        <Route path="paymentdetails" element={<PaymentHistory />} />
        <Route path="viewcomplaints" element={<ViewComplaints />} />
        <Route path="viewmore" element={<ViewMoreProfile />} />
        <Route path="piechart" element={<UserPieChart />} />
        <Route path="datewisereport" element={<DateWiseReport />} />
       
        </Route>

        
        {/* user */}

        <Route path="/user">
        <Route path="home" element={<UserHome />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="buyaproperty" element={<BuyAProperty />} />
        <Route path="rentaproperty" element={<RentAProperty />} />
        <Route path="buypropertydetails" element={<PropertyDetails />} />
        <Route path="rentpropertydetails" element={<RentPropertyDetails />} />
        <Route path="chat" element={<Chat />} />
        </Route>

        {/* owner */}
        
        <Route path="/owner">
        <Route path="home" element={<OwnerHome />} />
        <Route path="profile" element={<OwnerProfile />} />
        <Route path="addproperty" element={<AddProperty />} />
        <Route path="editproperty" element={<EditProperty />} />
        
        <Route path="notifications" element={<Notifications />} />
        <Route path="viewproperty" element={<ViewProperty />} />
        <Route path="viewmoreproperty" element={<ViewMoreProperty />} />
        <Route path="payment" element={<OwnerPayment />} />

        </Route>

        {/* agent */}

        <Route path="/agent">

        <Route path="home" element={<AgentHome />} />
      
        <Route path="addpropertyy" element={<AddProperties />} />
        <Route path="viewproperties" element={<ViewProperties />} />
        <Route path="viewmoreproperties" element={<ViewMore />} />
        <Route path="editproperties" element={<Edit />} />
        <Route path="notifications" element={<NotificationAgent />} />
        <Route path="agentprofile" element={<AgentProfile />} />
        <Route path="payment" element={<AgentPayment />} />

        </Route>

      </Routes>
      
      {!(isAdminPage || isUserPage || isOwnerPage || isAgentPage) && <Footer />}
    </>
  );
}

export default function Index() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
