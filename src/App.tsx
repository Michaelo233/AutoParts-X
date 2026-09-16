import './App.css'
import RecyclingServices from './component/KailineComponents/recycling_service/RecyclingServices'
import Headers from './component/Header/header'
import Footer from './component/Footer/footer'
import SellService from './component/Juliet/SellService'
import RentAndBuy from './component/MichaelComponent/rentBuy'

function App() {

  return (
    <>
     <Headers />
        <RecyclingServices />
        <SellService />
        <RentAndBuy />
      <Footer />
    </>
  )
}

export default App
