import './App.css'
import RecyclingServices from './component/KailineComponents/recycling_service/RecyclingServices'
import Footer from './component/Footer/footer'
import SellService from './component/Juliet/SellService'
import RentAndBuy from './component/MichaelComponent/rentBuy'
import Layout from './component/KailineComponents/layout/Layout'
import { Route } from 'react-router-dom'
import Header from './component/Header/header'
import Dashboard from './component/KailineComponents/dashboard/dasboard'
function App() {

  return (
      <Layout className="app-content">
        <Route path="/Header" element={<Header />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/SellService" element={<SellService />} />
        <Route path="/RentAndBuy" element={<RentAndBuy />} />
        <Route path="/RecyclingServices" element={<RecyclingServices />} />
        <Route path="/Footer" element={<Footer />} />
      </Layout>
  )
}

export default App
