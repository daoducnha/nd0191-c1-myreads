const Book = ({data, onChangeShelf}) => {
  
  const handleChangeShelf = (e) => {
    const currentShelf = data.shelf ? data.shelf : "";
 
    onChangeShelf(currentShelf, e.target.value, data);
  } 
  const imagetUrl = data?.imageLinks?.thumbnail ? `url(${data.imageLinks.thumbnail})` : "";
  const shelf = data.shelf ? data.shelf : "none";
  console.log(shelf)
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: imagetUrl
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={(e) => handleChangeShelf(e)} value={shelf}>
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
        <div className="book-title">{data.title}</div>
        <div className="book-authors">{data.authors && data.authors.join(", ")}</div>
      </div>
    </li>
  );
};

export default Book;
