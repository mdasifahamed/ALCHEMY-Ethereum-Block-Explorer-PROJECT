import React from 'react';
import {Routes,Route} from "react-router-dom"

import MyProvider from './MyContext';
import { Navbar } from './components/Navbar';
import './index.css';
import Home from './components/Home';
import Block from './components/Block';
import Address from './components/Address';
import Transaction from './components/Transaction';
import Account from './components/Acoount';
import Nft from './components/Nft';




function App() {



  return (
    
    <>
      <MyProvider>
        <Navbar></Navbar>
        <Routes>
         
            <Route path={'/'} element={<Home></Home>} />
            <Route path={'/block/:blocknum'} element={<Block></Block>} />
            <Route path={'/transaction/:trx'} element={<Transaction></Transaction>} />
            <Route path={'/address/:add'} element={<Address></Address>} />
            <Route path={'/account'} element={<Account></Account>} />
            <Route path={'/nft'} element={<Nft></Nft>} />
         

        </Routes>
      </MyProvider>
    </>
  )
}

export default App;
