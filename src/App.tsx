import './App.css'
import RecyclingServices from './component/KailineComponents/recycling_service/RecyclingServices'
import Headers from './component/Header/header'
import Footer from './component/Footer/footer'
import SellService from './component/Juliet/SellService'
import RentAndBuy from './component/MichaelComponent/rentBuy'
import Layout from './component/KailineComponents/layout/Layout'
function App() {

  return (
      <Layout className="app-content">
      <Headers />
        <RecyclingServices />
        <SellService />
        <RentAndBuy />
      <Footer />
    </Layout>
  )
}

export default App
