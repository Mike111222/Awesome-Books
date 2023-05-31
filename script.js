class BookLibrary {
  constructor() {
    // Retrieve books from localStorage or initialize an empty array
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  // Function to render the book list on the page
  renderBooks() {
    // Get the container element for displaying books
    const booksDiv = document.getElementById('books');

    // Clear the existing content
    booksDiv.innerHTML = '';

    // Iterate over each book in the collection
    this.books.forEach((book, index) => {
      // Create a new div element for each book
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book-item';

      // Create spans for title and author
      const titleSpan = document.createElement('span');
      const authorSpan = document.createElement('span');

      // Set the text content of the spans with book information
      titleSpan.textContent = `Title: ${book.title}`;
      authorSpan.textContent = `Author: ${book.author}`;

      // Append the spans to the book div
      bookDiv.appendChild(titleSpan);
      bookDiv.appendChild(authorSpan);

      // Create a remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';

      // Add a custom attribute to store the book index
      removeButton.setAttribute('data-book-index', index);

      // Append the remove button to the book div
      bookDiv.appendChild(removeButton);

      // Append the book div to the books container
      booksDiv.appendChild(bookDiv);
    });
  }

  // Function to add a new book to the collection
  addBook(title, author) {
    // Create a book object with title and author
    const book = {
      title,
      author,
    };

    // Add the book to the collection
    this.books.push(book);

    // Save the updated collection to localStorage
    localStorage.setItem('books', JSON.stringify(this.books));

    // Render the updated book list on the page
    this.renderBooks();
  }

  // Function to remove a book from the collection
  removeBookFromCollection(index) {
    // Remove the book at the specified index from the collection
    this.books.splice(index, 1);

    // Save the updated collection to localStorage
    localStorage.setItem('books', JSON.stringify(this.books));

    // Render the updated book list on the page
    this.renderBooks();
  }

  // Event handler for the remove button clicks
  handleRemoveButtonClick(event) {
    // Check if the clicked element is a button
    if (event.target.tagName === 'BUTTON') {
      // Get the book index from the custom attribute
      const bookIndex = event.target.getAttribute('data-book-index');

      // Check if the index exists
      if (bookIndex !== null) {
        // Convert the index to a number
        const index = parseInt(bookIndex, 10);

        // Call the removeBookFromCollection function to remove the book
        this.removeBookFromCollection(index);
      }
    }
  }

  // Event handler for the add book form submission
  handleAddBookFormSubmit(event) {
    // Prevent the form from submitting and refreshing the page
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
    // Get the container element for displaying books
    const booksContainer = document.getElementById('books');

    // Add event listener for remove button clicks
    booksContainer.addEventListener('click', this.handleRemoveButtonClick.bind(this));

    // Get the form element for adding books
    const addBookForm = document.getElementById('add-book-form');

    // Add event listener for form submission
    addBookForm.addEventListener('submit', this.handleAddBookFormSubmit.bind(this));
  }

  // Function to initialize the book library
  initialize() {
    // Render the initial book list on page load
    this.renderBooks();

    // Set up event listeners
    this.setupEventListeners();
  }
}

// Create an instance of the BookLibrary class and initialize it
const bookLibrary = new BookLibrary();
bookLibrary.initialize();
