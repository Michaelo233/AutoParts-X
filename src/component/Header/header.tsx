import logo from '../../assets/images/Auto part X.jpg';
import Search from '../common/search/Search';
import './header.css';


function Header() {
  return (
    <header>
      <img src={logo} alt="Auto parts X logo" />
      <h1>Welcome to Auto parts X</h1>
      <Search searchValue="" handleSearchChange={() => {}} />
    </header>
  );
}

export default Header;