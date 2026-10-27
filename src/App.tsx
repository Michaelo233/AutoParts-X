
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Layout
import Layout from "./components/common/layout/Layout";

// Pages
import Home from "./pages/Home";
import Product from "./pages/Products";
import { MyParts } from "./pages/MyParts";
import AddAutoPartPage from "./pages/AddAutoPartPages";

// Components
import { AddPartForm } from "./components/parts/my-parts/AddPartForm";

// Custom Hook
import { useUserParts } from "./hooks/useUserParts";

// Shared Catalogue Context
import {
  AutoPartCatalogProvider,
} from "./context/AutoPartCatalogContext";

//Storage 
import { StorageProvider } from "./context/StorageContext";
import StorageConsent from "./components/common/StorageConsent";

/**
 * App Component
 *
 * Main routing component for AutoParts-X.
 *
 * Responsibilities:
 * - Configure application routes
 * - Provide shared auto parts catalogue state
 * - Connect My Parts functionality
 * - Display pages through Layout
 */
function App() {
  const {
    currentUser,
    handleAddPart,
    handleRemovePart,
  } = useUserParts();

  return (
    <BrowserRouter>
      <StorageProvider>
        <AutoPartCatalogProvider>

          {/* Local Storage Consent */}
          <StorageConsent />

          <Routes>
            <Route path="/" element={<Layout />}>

              {/* Home */}
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />

              {/* Products / Services */}
              <Route
                path="sell-services"
                element={<Product />}
              />

              {/* Add Auto Part */}
              <Route
                path="add-auto-part"
                element={
                  <AddAutoPartPage
                    sellerName={currentUser.userName}
                  />
                }
              />

              {/* My Parts */}
              <Route
                path="myParts"
                element={
                  <MyParts
                    user={currentUser}
                    onRemovePart={handleRemovePart}
                  />
                }
              />

              {/* Add to My Parts */}
              <Route
                path="myParts/addPart"
                element={
                  <AddPartForm
                    userId={currentUser.userId}
                    userName={currentUser.userName}
                    onAddPart={handleAddPart}
                  />
                }
              />

            </Route>
          </Routes>

        </AutoPartCatalogProvider>
      </StorageProvider>
    </BrowserRouter>
  );
}

export default App;
