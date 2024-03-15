import React from "react";
import {  Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Books } from "./Books";
import "./App.css"
import { Authordetails } from "./Authordetails";
import { Updateauthor } from "./Updateauthor";
import { AddBook } from "./AddBook";
import { UpdateBooks } from "./UpdateBooks";
import { AddAuthor } from "./AddAuthor";
export const Api = "https://65f1407fda8c6584131d2f65.mockapi.io/Books";
export const Api1 = "https://65f2d49a105614e6549f075e.mockapi.io/Author";


function App() {
  return (
 
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books  />} />
          <Route path="/authors" element={<Authordetails />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/add-author" element={<AddAuthor />} />
          <Route path="/update-book/:id" element={<UpdateBooks />} />
          <Route path="/update-Author/:id" element={<Updateauthor />} />
        </Routes>
      </div>

  );
}

export default App;

function Home(){
  return(
    <>
    <Navbar />
    <div id="liberary" >
      <h1 className="font-Domine flex  pt-40 justify-center "> WELCOME TO</h1> 
      <h1 className="font-Domine flex  justify-center "> BOOK STORE</h1>
    
    </div></>
  )
}


