import { Show, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";


function App() {
  const {isLoaded} = useAuth();
  
  if (!isLoaded) return <PageLoader />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        
        
      </Routes>
    </Layout>
  );
}

export default App;