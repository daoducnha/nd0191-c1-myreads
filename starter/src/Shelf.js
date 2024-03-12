import React from 'react';
import Book from './Book';

const Bookshelf = ({props}) => {
  const { books, shelf, onMove } = props;
  const booksOfShelf = books.filter(b => b.shelf === shelf.key);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksOnThisShelf.map(book => (
            <Book key={book.id} book={book} shelf={shelf.key} onMove={onMove} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;