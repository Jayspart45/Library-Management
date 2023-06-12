import React from 'react';

const BookItem = ({ book }) => {
  const { title, authors, categories, publishedDate, available, numCopies, imageLinks } = book.volumeInfo;

  return (
    <div className="book-item card">
      {imageLinks && imageLinks.thumbnail && <img className='card-top-img' src={imageLinks.thumbnail} alt={title} />}
      <h3 className='card-title'>{title.slice(0, 50)}...</h3>
      <p className='card-text'>Author: {authors?.join(', ') ?? 'Unknown'}</p>
      <p>Genre: {categories?.join(', ') ?? 'Unknown'}</p>
      <p>Published: {publishedDate}</p>
      <p>
        Availability: {available ? <span style={{ color: 'green' }}>Available &#10004;</span> : <span style={{ color: 'red' }}>Not Available &#10008;</span>}
      </p>
      <p>Number of Copies: {numCopies? numCopies:"-"}</p>
    </div>
  );
};

export default BookItem;
