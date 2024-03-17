import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";

import { Routes, Route, useNavigate } from "react-router-dom";
import Books from "./Books";
import SearchBook from "./SearchBook";

function App() {
  let navigate = useNavigate();

  const [books, setBooks] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: []
  });


  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();

      const currentlyReading = res.filter((itm) => itm.shelf === "currentlyReading");
      const wantToRead = res.filter((itm) => itm.shelf === "wantToRead");
      const read = res.filter((itm) => itm.shelf === "read");

      setBooks({
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read
      })
    };

    getBooks();
  }, []);

  const handleChangeShelf = (currentShelf, newShelf, book) => {
    book.shelf = newShelf;
    BooksAPI.update(book, newShelf)
    .then(() => {

      const updatedBooks = { ...books };

      if(currentShelf !== "") {
        updatedBooks[currentShelf] = updatedBooks[currentShelf].filter(
          (item) => item.id !== book.id
        );
      }
 
      if (newShelf !== "") {
        updatedBooks[newShelf] = updatedBooks[newShelf].concat(book);
      }

      // Update state with the modified books object
      setBooks(updatedBooks);

      // Navigate back to the home page
      navigate("/");
    })
    .catch((error) => {
      console.error("Error updating shelf:", error);
      // You might want to handle errors here
    });
  }

  return <Routes>
    <Route exact 
        path='/'
        element={<Books 
          currentReadBooks={books.currentlyReading}
          wantToReadBooks={books.wantToRead}
          readBooks={books.read}
          onChangeShelf={handleChangeShelf}
        />} />
    <Route 
      path="/search"
      element={ <SearchBook books={[...books.currentlyReading, ...books.wantToRead, ...books.read]} onChangeShelf={handleChangeShelf}/>}
    />

  </Routes>
}

export default App;
