import './App.css'
import SellService from './component/Juliet/SellService'
import { MyParts } from './component/MichaelComponent/MyParts'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/KailineComponents/dashboard/Home/Home'
import { useUserParts } from './component/MichaelComponent/usepartmock/UseUserParts' 
import { AddPartForm } from './component/MichaelComponent/form/AddMyCarPartForm'



function App() {
  const { currentUser, handleAddPart, handleRemovePart } = useUserParts()
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="sell-services" element={<SellService />} />
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
