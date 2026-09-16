import './App.css'
import Footer from './component/Footer/footer'
import Header from './component/Header/header'
import SellService from './component/Juliet/SellService'
import RentAndBuy from './component/MichaelComponent/rentBuy'

function App() {

  return (
    <>
      <Header />
        <RentAndBuy />
        <SellService />
      <Footer />
    </>
  )
}

export default App
