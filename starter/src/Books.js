import Bookshelf from "./Bookshelf";
import {Link} from 'react-router-dom';

const Books = ({currentReadBooks, wantToReadBooks, readBooks, onChangeShelf}) => {
    return <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <Bookshelf title="Currently Reading" books={currentReadBooks} onChangeShelf={onChangeShelf}/>

        <Bookshelf title="Want to Read" books={wantToReadBooks} onChangeShelf={onChangeShelf}/>

        <Bookshelf title="read" books={readBooks} onChangeShelf={onChangeShelf}/>
      </div>
    </div>
    <div className="open-search">
        <Link to="/search" >Add a book</Link>
        
     </div>
  </div>
}

export default Books;