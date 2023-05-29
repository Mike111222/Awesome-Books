// Retrieve books from localStorage or initialize an empty array
const books = JSON.parse(localStorage.getItem('books')) || [];

// Function to render the book list on the page
function renderBooks() {
  const booksDiv = document.getElementById('books');
  booksDiv.innerHTML = '';

  // Iterate over each book in the collection
  books.forEach((book, index) => {
    // Create a new div element for each book
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-item';

    // Create spans for title and author
    const titleSpan = document.createElement('span');
    const authorSpan = document.createElement('span');

    // Set the text content of the spans
    titleSpan.textContent = `Title: ${book.title}`;
    authorSpan.textContent = `Author: ${book.author}`;

    // Append the spans to the book div
    bookDiv.appendChild(titleSpan);
    bookDiv.appendChild(authorSpan);

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';

    // Add event listener to remove the book
    removeButton.addEventListener('click', () => {
      removeBook(index);
    });

    // Append the remove button to the book div
    bookDiv.appendChild(removeButton);

    // Append the book div to the books container
    booksDiv.appendChild(bookDiv);
  });
}

// Function to add a new book to the collection
function addBook(title, author) {
  const book = {
    title,
    author,
  };

  // Add the book to the collection
  books.push(book);

  // Save the updated collection to localStorage
  localStorage.setItem('books', JSON.stringify(books));

  // Render the updated book list on the page
  renderBooks();
}

// Function to remove a book from the collection
function removeBook(index) {
  // Remove the book from the collection
  books.splice(index, 1);

  // Save the updated collection to localStorage
  localStorage.setItem('books', JSON.stringify(books));

  // Render the updated book list on the page
  renderBooks();
}

// Event listener for the add book form submission
document.getElementById('add-book-form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the input values from the form
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value;
  const author = authorInput.value;

  // Check if both title and author are provided
  
});

// Render the initial book list on page load
renderBooks();
