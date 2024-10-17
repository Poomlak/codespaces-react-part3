import './App.css';
import About from './About';
import Home from './Home';
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';
import Posts from './Post';
import Shop from './Shop';

function App() {
  return (
  <BrowserRouter>
  <div>
    {/* <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/posts?fname=Poomlak&lname=Promdontri">Post Greeting</Link></li>
      <li><Link to="/posts/1">Post 1</Link></li>
      <li><Link to="/posts/2">Post 2</Link></li>
      <li><Link to="/Shop">Shop</Link></li>

    </ul> */}
  </div>
  <Routes>
    <Route path="/" element={<Shop/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/posts" element={<Posts/>}/>
    <Route path="posts/:id"element={<Posts/>}/>
    <Route path="shop" element={<Shop/>}/>
  </Routes>
  
  
  
  
  </BrowserRouter>);
}

export default App;
