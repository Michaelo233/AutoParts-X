
import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Layout from "./components/common/layout/Layout";
import StorageConsent from "./components/common/StorageConsent";
import { AddPartForm } from "./components/parts/my-parts/AddPartForm";
import { AutoPartCatalogProvider } from "./context/AutoPartCatalogContext";
import { StorageProvider } from "./context/StorageContext";
import { useUserParts } from "./hooks/useUserParts";
import Home from "./pages/Home";
import { MyParts } from "./pages/MyParts";
import AddAutoPartPage from "./pages/AddAutoPartPages";
import Product from "./pages/Products";
import VehicleModels from "./pages/VehicleModels";

function App() {
  const {
    currentUser,
    users,
    error,
    handleAddPart,
    handleRemovePart,
    handleToggleForSale,
  } = useUserParts();

  return (
    <BrowserRouter>
      <StorageProvider>
        <AutoPartCatalogProvider>
          <StorageConsent />

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />

              <Route path="sell-services" element={<Product />} />
              <Route path="products" element={<Product />} />
              <Route path="vehicle-models" element={<VehicleModels />} />

              <Route
                path="add-auto-part"
                element={<AddAutoPartPage sellerName={currentUser.userName} />}
              />

              <Route
                path="myParts"
                element={
                  <MyParts
                    user={currentUser}
                    users={users}
                    error={error}
                    onRemovePart={handleRemovePart}
                    onToggleSale={handleToggleForSale}
                  />
                }
              />

              <Route
                path="myParts/addPart"
                element={
                  <AddPartForm
                    userId={currentUser.userId}
                    userName={currentUser.userName}
                    onAddPart={handleAddPart}
                    error={error}
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
