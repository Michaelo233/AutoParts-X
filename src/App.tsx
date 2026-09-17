import './App.css'
import RecyclingServices from './component/KailineComponents/recycling_service/RecyclingServices'
import SellService from './component/Juliet/SellService'
import RentAndBuy from './component/MichaelComponent/rentBuy'
import Layout from './component/KailineComponents/layout/Layout'
import { Route , Routes } from 'react-router-dom'
import Dashboard from './component/KailineComponents/dashboard/Dashboard'

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/RecyclingServices" element={<RecyclingServices />} />
          <Route path="/SellService" element={<SellService />} />
          <Route path="/RentAndBuy" element={<RentAndBuy />} />
        </Routes>
      </Layout>
  )
}

export default App
