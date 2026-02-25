import React, { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'   
import Article from './components/Article/Article'
import TestConnection from "./components/test/TestConnection";
function App() {
    return(
    <>
<Header></Header>
<Main>
    
</Main>
 <>
      <TestConnection />
      <h1>Event Hub</h1>
    </>

<Footer></Footer>
</>
    )
}

export default App
