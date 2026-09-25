import './App.css'
import SellService from './component/Juliet/SellService'
import RentAndBuy from './component/MichaelComponent/rentBuy'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Layout from './component/Layout/Layout'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="./" element={<Layout />}>
            <Route path="/sell" element={<SellService />} />
            <Route path="/rent" element={<RentAndBuy />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
