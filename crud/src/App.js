import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from "./components/dashboard/dashboard";
import NoMatch from "./components/nomatch/NoMatch";
import PostUser from './components/postUser/postProduct';
import UpdateUser from './components/updateUser/updateProduct';
import Header from './components/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <>
      <Header></Header>
      <Routes>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/product" element={<PostUser></PostUser>}></Route>
      <Route path="/product/:id" element={<UpdateUser></UpdateUser>}></Route>
      <Route path="*" element={<NoMatch></NoMatch>}></Route>
      </Routes>
      </>
    
    
  );
}

export default App;
