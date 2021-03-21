import Nav from "./components/Nav";
import Login from "./components/Login"
import Register from "./components/Register"
import Particles from 'react-particles-js';
import { Protected , Main } from "./components/Protected";
import { BrowserRouter as Router, Route , Redirect } from "react-router-dom";

function App() {
  return (
      <Router>
          <Nav/>
          <Route path="/" exact component={()=><Login/>}/>
          <Route path="/register" component={()=><Register/>}/>
          <Protected path="/main" component={()=><Main/>} />
          <Redirect to='/'/>
          <Particles className='Particles' params={{particles:{number:{value: 100,density:{enable: true,value_area: 3000,},},},}}/>
      </Router>
  );
}

export default App;


