import "./App.css";
import { useState, useEffect } from "react";
import { getAll, update } from "./BooksAPI.js";


function App() {
  const [groupBooks, setGroupBooks] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getDataServer();
  }, []);

  const getDataServer = () => {
    getAll().then((books) => {
      console.log(books);
      setGroupBooks(books);
      setTimeout(() => {
        genGroupBook(books);
      }, 1000);
    });
  };

  const genGroupBook = (books) => {
    if (books.length) {
      const groupsa = [];
      const booksList = [];
      groupsa.push(books[0]);

      books.forEach((item, index) => {
        const data = groupsa?.find((a) => item.shelf === a.shelf);
        if (!data) {
          groupsa.push(item);
        }
      });

      groupsa?.forEach((group, index) => {
        booksList.push(
          <div key={group.id} className="bookshelf" id={group.shelf + "Id"}>
            <h2 className="bookshelf-title">{group.shelf}</h2>
            <div key={group.id + "12"} className="bookshelf-books">
              <ol className="books-grid">{genBook(books, group.shelf)}</ol>
            </div>
          </div>
        );
      });
      setBooks(booksList);
    } else {
      setBooks([]);
    }
  };

  const genBook = (data, shelf) => {
    const listBook = data.filter((item) => item.shelf === shelf);
    const books = [];
    listBook?.forEach((book, index) => {
      console.log(book);
      console.log(book.imageLinks.thumbnail);
      books.push(
        <li>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks.thumbnail})`,
                }}
              ></div>
              <div className="book-shelf-changer">
                <select
                  onChange={(e) => onChangeOption(book, e.target.value)}
                >
                  <option value="none" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors[0]}</div>
          </div>
        </li>
      );
    });
    return books;
  };

  const [currentReadBooks, setCurrentReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);

  const [showSearchPage, setShowSearchpage] = useState(false);

  // useEffect(() => {
  //   getAll().then((books) => {
  //     setBooks(books);
  //   });
  // }, []);

  const onChangeOption = (book, shelf) => {
    // scrollTo(cur || "");
    // console.log("preValue", pre);
    // console.log("currentValue", cur);
    // switch (cur) {
    //   case cur:
    //     break;

    //   default:
    //     break;
    // }
    update(book, shelf).then((res) => {
      getDataServer();
    });
  };

  const scrollTo = (value) => {
    if (value) {
      let top = window.document.getElementById(value + "Id")?.offsetTop || 0;
      if (top) {
        window.scrollTo({
          top: top,
          left: 100,
          behavior: "smooth",
        });
      }
    }
  };

  const moveBookToShelf = (book, shelf) => {
    update(book, shelf).then(() => {
      setBooks((prevBooks) =>
        prevBooks.map((itm) => (itm.id === book.id ? { ...itm, shelf } : itm))
      );
    });
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>{books}</div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
