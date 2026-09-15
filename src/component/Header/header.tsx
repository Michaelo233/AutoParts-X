import logo from '../../assets/logo.png';

function Header() {
  return (
    <header>
      <img src={logo} alt="Auto parts X logo" />
      <h1>Welcome to Our Application</h1>
    </header>
  );
}

export default Header;