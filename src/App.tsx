import './App.css'
import Footer from './component/Footer/footer'
import Header from './component/Header/header'
import SellService from './component/Juliet/SellService'
import RentAndBuy from './component/MichaelComponent/rentBuy'
import Registration from './component/kailine_components/registration/register'
import RecycleService from './component/kailine_components/recycle_service/recycle_service'


function App() {

  return (
    <>
      <Header />
        <Registration />
        <RecycleService />
        <RentAndBuy />
        <SellService />
      <Footer />
    </>
  )
}

export default App
