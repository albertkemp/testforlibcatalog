// Define the book codes and their corresponding books
var bookCodes = [1, 2, 3, 4, 5];
var books = ["apple", "banana", "pear", "orange", "apple"];

// Load the borrowed books from local storage (if any)
var borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

// Populate the book list with the borrowed books on page load
window.onload = function() {
  var bookList = document.getElementById("book-list");
  borrowedBooks.forEach(function(book) {
    var listItem = createBookListItem(book);
    bookList.appendChild(listItem);
  });
};

function checkKeyPress(event) {
  // Check if the Enter key is pressed
  if (event.keyCode === 13) {
    convertCodeToText();
  }
}

function convertCodeToText() {
  // Get the user input value
  var codeInput = document.getElementById("book-code").value;
  
  // Find the index of the input code in the bookCodes array
  var codeIndex = bookCodes.indexOf(parseInt(codeInput));
  
  // If the code is found, add the book to the borrowedBooks array and create a new list item with the corresponding book
  if (codeIndex !== -1) {
    var book = books[codeIndex];
    borrowedBooks.push(book);
    
    var bookList = document.getElementById("book-list");
    var listItem = createBookListItem(book);
    bookList.appendChild(listItem);
    
    // Save the updated borrowed books to local storage
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
  } else {
    // If the code is not found, display an error message
    alert("Invalid book code!");
  }

  // Clear the input field after adding the book
  document.getElementById("book-code").value = "";
}

function createBookListItem(book) {
  var listItem = document.createElement("li");
  listItem.textContent = book;
  
  // Create a "Return" button for each book
  var returnButton = document.createElement("button");
  returnButton.textContent = "Return";
  returnButton.onclick = function() {
    returnBook(book);
    listItem.remove();
    
    // Save the updated borrowed books to local storage
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
  };
  
  listItem.appendChild(returnButton);
  return listItem;
}

function returnBook(book) {
  var bookIndex = borrowedBooks.indexOf(book);
  
  // If the book is found in the borrowedBooks array, remove it
  if (bookIndex !== -1) {
    borrowedBooks.splice(bookIndex, 1);
  }
}
