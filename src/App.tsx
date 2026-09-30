import './App.css'
import SellService from './component/Juliet/SellService'
import { MyParts } from './component/MichaelComponent/MyParts'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/KailineComponents/dashboard/Home/Home'
import { useUserParts } from './component/MichaelComponent/usepartmock/UseUserParts' 
import { AddPartForm } from './component/MichaelComponent/form/AddMyCarPartForm'


function App() {
  const { currentUser, handleAddPart } = useUserParts()
  return (
      <BrowserRouter>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Layout />}>
           {/* Index makes the Home component the default route for the layout */}
            <Route path="/Home" index element={<Home />} />

             {/* Nested routes for the layout component */}
            <Route path="/sell-services" element={<SellService />} />
            <Route path="/myParts" element={<MyParts user={currentUser} />} />
            <Route index element={<MyParts user={currentUser} />} />
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
