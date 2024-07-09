import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import post from './data/posts.js';
import Layout from "./components/layout/Layout";
import Signin from './routes/Signin.js';
import Signup from './routes/Signup.js';
import Home from './routes/post/Home.js';
import Detail from './routes/post/detail/Detail.js';
import Write from './routes/post/Write.js';
import Edit from './routes/post/detail/Edit.js';
import UserEdit from './routes/user/UserEdit.js';
import PasswordEdit from './routes/user/PasswordEdit.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path="/write" element={<Write />} />
          <Route path="/detail/:id/edit" element={<Edit />} />
          <Route path="/useredit" element={<UserEdit />} />
          <Route path="/passwordedit" element={<PasswordEdit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;