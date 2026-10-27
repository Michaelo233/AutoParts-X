import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/common/layout/Layout'
import Home from './pages/Home'
import Product from './pages/Products'
import { MyParts } from './pages/MyParts'
import { useUserParts } from './hooks/useUserParts'
import { AddPartForm } from './components/parts/my-parts/AddPartForm'


function App() {
  const { currentUser, handleAddPart, handleRemovePart } = useUserParts()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          {/* Product routes */}
          <Route path="sell-services" element={<Product />} />
          <Route path="products" element={<Product />} />

          {/* My parts routes */}
          <Route
            path="myParts"
            element={
              <MyParts
                user={currentUser}
                onRemovePart={handleRemovePart}
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
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App