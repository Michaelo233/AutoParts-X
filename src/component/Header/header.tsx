import logo from '../../assets/images/Auto part X.jpg';
import Search from '../KailineComponents/search/Search';

function Header() {
  return (
    <header>
      <img src={logo} alt="Auto parts X logo" />
      <h1>Welcome to Auto parts X</h1>
      <Search dataList={[]} />
    </header>
  );
}

export default Header;