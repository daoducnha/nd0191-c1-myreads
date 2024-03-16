import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as BookAPI from "./BooksAPI";
import Book from "./Book";
import { useNavigate } from 'react-router-dom';

const SearchBook = ({onChangeShelf}) => {
  

  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const updateQuery = (query) => {
    console.log(query);
    setQuery(query.trim());
  };

  

  useEffect(() => {
    const search = async () => {
      const res = await BookAPI.search(query, 20);
      setSearchResult(res);
    };

    search();
  }, [query]);


  return (
    <div>
      <Link className="lose-create-contact" to="/">
        Close
      </Link>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult && searchResult.map((itm) => (
              <Book key={itm.id} data={itm} onChangeShelf={onChangeShelf}/>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SearchBook;
