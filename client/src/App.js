import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Switch,Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import ProductList from './pages/ProductList';
// import Product from './pages/Product';
// import Register from './pages/Register';
function App() {
  return (
    <>
    <Switch>
      <Route exact path="/" component={Homepage}></Route>
    </Switch>
    </>
  );
}

export default App;
