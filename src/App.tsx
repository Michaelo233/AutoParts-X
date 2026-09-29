import './App.css'
import SellService from './component/Juliet/SellService'
import RentAndBuy from './component/MichaelComponent/rentBuy'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/KailineComponents/dashboard/Home/Home'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Layout />}>
           {/* Index makes the Home component the default route for the layout */}
            <Route index element={<Home />} />

             {/* Nested routes for the layout component */}
            <Route path="/sell-services" element={<SellService />} />
            <Route path="/buy-rent" element={<RentAndBuy />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
