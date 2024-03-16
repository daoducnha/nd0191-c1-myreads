import Book from "./Book";

const Bookshelf = ({ title, books, onChangeShelf }) => {
  
  console.log(books);
  return <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books && books.map((itm) => (
          <Book key={itm.id} data={itm} onChangeShelf={onChangeShelf}/>
        ))}
      </ol>
    </div>
  </div>
};

export default Bookshelf;
