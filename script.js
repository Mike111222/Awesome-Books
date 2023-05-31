// Class representing the book library
class BookLibrary {
  constructor() {
    // Retrieve books from localStorage or initialize an empty array
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    // Keep track of the current section being displayed
    this.currentSection = 'list';
  }

  // Function to render the list of books
  renderBooks() {
    // Get the container for displaying books
    const booksDiv = document.getElementById('books');
    // Clear the container
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
    // Create a new book object
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
    // Remove the book from the collection
    this.books.splice(index, 1);

    // Save the updated collection to localStorage
    localStorage.setItem('books', JSON.stringify(this.books));

    // Render the updated book list on the page
    this.renderBooks();
  }

  // Event handler for remove button clicks
  handleRemoveButtonClick(event) {
    if (event.target.tagName === 'BUTTON') {
      // Get the index of the book to remove from the custom attribute
      const bookIndex = event.target.getAttribute('data-book-index');

      // Check if the data-book-index attribute exists
      if (bookIndex !== null) {
        const index = parseInt(bookIndex, 10);

        // Call the removeBookFromCollection function
        this.removeBookFromCollection(index);
      }
    }
  }

  // Event handler for add book form submission
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

  // Event handler for navigation links clicks
  handleNavigationClick(event) {
    event.preventDefault();

    // Get the section from the clicked link's href attribute
    const section = event.target.getAttribute('href').substring(1);

    // Update the current section
    this.currentSection = section;

    // Update the navigation and content display
    this.updateNavigation();
    this.updateContent();
  }

  // Update the active state of navigation links
  updateNavigation() {
    // Get all navigation links
    const navigationLinks = document.querySelectorAll('nav ul li a');

    // Loop through each link
    navigationLinks.forEach((link) => {
      // Get the section from the link's href attribute
      const section = link.getAttribute('href').substring(1);

      // Check if the section matches the current section
      if (section === this.currentSection) {
        // Add the 'active' class to the link
        link.classList.add('active');
      } else {
        // Remove the 'active' class from the link
        link.classList.remove('active');
      }
    });
  }

  // Update the display of content sections
  updateContent() {
    // Get all content sections
    const sections = document.querySelectorAll('section');

    // Loop through each section
    sections.forEach((section) => {
      // Check if the section id matches the current section
      if (section.id === this.currentSection) {
        // Display the section
        section.style.display = 'block';
      } else {
        // Hide the section
        section.style.display = 'none';
      }
    });
  }

  // Set up event listeners
  setupEventListeners() {
    // Event listener for remove button clicks
    const booksContainer = document.getElementById('books');
    booksContainer.addEventListener('click', this.handleRemoveButtonClick.bind(this));

    // Event listener for add book form submission
    const addBookForm = document.getElementById('add-book-form');
    addBookForm.addEventListener('submit', this.handleAddBookFormSubmit.bind(this));

    // Event listener for navigation links clicks
    const navigationLinks = document.querySelectorAll('nav ul li a');
    navigationLinks.forEach((link) => {
      link.addEventListener('click', this.handleNavigationClick.bind(this));
    });
  }

  // Initialize the book library
  initialize() {
    // Render the initial book list on page load
    this.renderBooks();

    // Set up event listeners
    this.setupEventListeners();

    // Update the navigation and content display
    this.updateNavigation();
    this.updateContent();
  }
}

// Create an instance of the BookLibrary class
const bookLibrary = new BookLibrary();

// Initialize the book library
bookLibrary.initialize();

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.getElementById('datetime').innerHTML = `${date} ${time}`;
}

// call updateDateTime function every second to update the time
setInterval(updateDateTime, 1000);
