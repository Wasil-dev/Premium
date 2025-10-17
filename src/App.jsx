import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Users from "./Pages/User";
import UserDetail from "./Pages/UserDetail";
import GithubFinder from "./Pages/GithubFinder";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            }
          />

          <Route
            path="products"
            element={
              <PageWrapper>
                <Products />
              </PageWrapper>
            }
          />

          <Route
            path="products/:id"
            element={
              <PageWrapper>
                <ProductDetail />
              </PageWrapper>
            }
          />

          <Route
            path="users"
            element={
              <PageWrapper>
                <Users />
              </PageWrapper>
            }
          />

          <Route
            path="users/:id"
            element={
              <PageWrapper>
                <UserDetail />
              </PageWrapper>
            }
          />

          <Route
            path="github"
            element={
              <PageWrapper>
                <GithubFinder />
              </PageWrapper>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-[calc(100vh-80px)]"
    >
      {children}
    </motion.div>
  );
}
