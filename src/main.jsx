import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Dashboard from './Dashboard'
import Loans from './Loans'
import Recharge from './Recharge'
import Cards from './Cards'
import Transactions from './Transactions'
import Transfer from './Transfer'
import Balance from './Balance'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='/Dashboard' element={<Dashboard/>} />
    <Route path='/Loans' element={<Loans/>}></Route>
    <Route path='/Recharge' element={<Recharge></Recharge>}/>
    <Route path = '/Cards' element={<Cards></Cards>}/>
    <Route path='/Transactions'element ={<Transactions></Transactions>}/>
    <Route path='/Transfer' element = {<Transfer></Transfer>}/>
    <Route path = '/Balance' element={<Balance></Balance>}/>
  </Routes>
  </BrowserRouter>,
)
