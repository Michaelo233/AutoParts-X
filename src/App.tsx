import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/common/layout/Layout'
import Home from './pages/Home'
import Product from './pages/Products'
import { MyParts } from './pages/MyParts'
import { useUserParts } from './hooks/useUserParts'
import { AddPartForm } from './components/parts/my-parts/AddPartForm'

function App() {
  const { currentUser, users, error, handleAddPart, handleRemovePart, handleToggleForSale } = useUserParts()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          <Route path="sell-services" element={<Product />} />
          <Route path="products" element={<Product />} />

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
    </BrowserRouter>
  )
}

export default App