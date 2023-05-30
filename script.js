// Book class to represent individual books
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Library class to manage the collection of books
class Library {
  constructor() {
    // Retrieve books from localStorage or initialize an empty array
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  // Function to render the book list on the page
  renderBooks() {
    const booksDiv = document.getElementById('books');
    booksDiv.innerHTML = '';

    // Iterate over each book in the collection
    this.books.forEach((book, index) => {
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

      // Add custom attribute to store the book index
      removeButton.setAttribute('data-book-index', index);

      // Append the remove button to the book div
      bookDiv.appendChild(removeButton);

      // Append the book div to the books container
      booksDiv.appendChild(bookDiv);
    });
  }

  // Function to add a new book to the collection
  addBook(title, author) {
    const book = new Book(title, author);

    // Add the book to the collection
    this.books.push(book);

    // Save the updated collection to localStorage
    localStorage.setItem('books', JSON.stringify(this.books));

    // Render the updated book list on the page
    this.renderBooks();
  }

  // Function to remove a book from the collection
  removeBookFromCollection(index) {
    // Remove the book from the collection
    this.books.splice(index, 1);

    // Save the updated collection to localStorage
    localStorage.setItem('books', JSON.stringify(this.books));

    // Render the updated book list on the page
    this.renderBooks();
  }

  // Event handler for the remove button clicks
  handleRemoveButtonClick(event) {
    if (event.target.tagName === 'BUTTON') {
      const bookIndex = event.target.getAttribute('data-book-index');

      // Check if the data-book-index attribute exists
      if (bookIndex !== null) {
        const index = parseInt(bookIndex, 10);

        // Call the removeBookFromCollection function
        this.removeBookFromCollection(index);
      }
    }
  }

  // Event handler for the add book form submission
  handleAddBookFormSubmit(event) {
    event.preventDefault();

    // Get the input values from the form
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const title = titleInput.value;
    const author = authorInput.value;

    // Check if both title and author are provided
    if (title && author) {
      // Add the book to the collection
      this.addBook(title, author);

      // Clear the input fields
      titleInput.value = '';
      authorInput.value = '';
    }
  }

  // Function to set up event listeners
  setupEventListeners() {
    const booksContainer = document.getElementById('books');

    // Add event listener for the remove button clicks
    booksContainer.addEventListener('click', this.handleRemoveButtonClick.bind(this));

    const addBookForm = document.getElementById('add-book-form');

    // Add event listener for the add book form submission
    addBookForm.addEventListener('submit', this.handleAddBookFormSubmit.bind(this));
  }

  // Function to initialize the library
  
}

// Create an instance of the Library class and initialize it
const library = new Library();
library.initialize();
