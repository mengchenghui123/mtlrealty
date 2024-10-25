import React, { Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Contact from "./pages/Contact";
import Layout from "./components/Layout/Layout";
import PropertyDetail from "./components/PropertyDetail/PropertyDetail";
import Residiences from "./components/Residencies/Risidencies";
import About from "./pages/About";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Franchise from "./pages/Franchise";
import Brands from "./pages/Brands";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import userDetailContext from "./context/userDetailContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Admin from "./pages/Admin";
import BrandPage from "./pages/BrandPage";
import BusinessForSale from "./pages/BusinessForSale";
import CommercialPartner from "./pages/CommercialPartners";
import CommercialModifier from "./pages/CommercialModifier";
import PropertyModifier from "./pages/PropertyModifier";
import FranchiseModifier from "./pages/FranchiseModifier";
import CommercialDetail from "./pages/CommercialDetail";
import CommercialLeasing from "./pages/CommercialLeasing";

function App() {
  const queryClient = new QueryClient();
  const { user } = useAuth0();

  const [userDetails, setUserDetail] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "rent", element: <Rent /> },
        { path: "franchise", element: <Franchise /> },
        { path: "contact", element: <Contact /> },
        { path: "brands", element: <Brands /> },
        { path: "BusinessForSale", element: <BusinessForSale /> },
        { path: "CommercialLeasing", element: <CommercialLeasing /> },
        { path: "CommercialPartner", element: <CommercialPartner /> },
        { path: "property/:id", element: <PropertyDetail /> },
        { path: "commercial/:id", element: <CommercialDetail /> },
        { path: "/bookings", element: <Bookings /> },
        { path: "/favourites", element: <Favourites /> },
        { path: "/residencies/:id", element: <Residiences /> },
        { path: "/about", element: <About /> },
        { path: "/sell", element: <Sell /> },
        { path: "/buy", element: <Buy /> },
        { path: "/brands/:id", element: <BrandPage /> },
        { path: "/admin/CommercialModifier", element: <CommercialModifier /> },
        { path: "/admin/FranchiseModifier", element: <FranchiseModifier /> },
        { path: "/admin/PropertyModifier", element: <PropertyModifier /> },
        {
          path: "/admin",
          element: (
            <PrivateRoute user={user} role="Admin">
              <Admin />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <userDetailContext.Provider value={{ userDetails, setUserDetail }}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </userDetailContext.Provider>
  );
}

export default App;
