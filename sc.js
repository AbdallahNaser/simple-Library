// Constructor function for Author
function Author(name, email) {
    this.name = name;
    this.email = email;
}

// Constructor function for Book
function Book(name, price, author) {
    this.name = name;
    this.price = price;
    this.author = author;
}

var books = [];
var bookCount = 0;
var currentBookIndex = 0;

function startAddingBooks() {
    bookCount = parseInt(document.getElementById("book-count").value);
    
    if (isNaN(bookCount) || bookCount <= 0) {
        alert("Please enter a valid number of books.");
        return;
    }

    document.getElementById("book-count-section").style.display = "none";
    document.getElementById("book-form").style.display = "flex";
}

document.getElementById("book-form").addEventListener("submit", function (e) {
    e.preventDefault();

    var bookName = document.getElementById("book-name").value.trim();
    var bookPrice = document.getElementById("book-price").value;
    var authorName = document.getElementById("author-name").value.trim();
    var authorEmail = document.getElementById("author-email").value.trim();

    if (!bookName || !bookPrice || !authorName || !authorEmail) {
        alert("Please fill in all fields.");
        return;
    }

    var newAuthor = new Author(authorName, authorEmail);
    var newBook = new Book(bookName, bookPrice, newAuthor);
    books.push(newBook);

    currentBookIndex++;

    if (currentBookIndex < bookCount) {
        this.reset(); // Clear form for the next book
    } else {
        document.getElementById("book-form").style.display = "none";
        updateTable();
    }
});

function updateTable() {
    var tableBody = document.getElementById("book-table-body");
    tableBody.innerHTML = "";

    books.forEach(function(book, index) {
        var row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>${book.author.name}</td>
            <td>${book.author.email}</td>
            <td>
                <button class="edit" onclick="editBook(${index})">Edit</button>
                <button class="delete" onclick="deleteBook(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editBook(index) {
    var row = document.getElementById("book-table-body").children[index];
    var cells = row.getElementsByTagName("td");

    for (var i = 0; i < 4; i++) {
        var input = document.createElement("input");
        input.type = i === 1 ? "number" : "text";
        input.value = cells[i].innerText;
        cells[i].innerHTML = "";
        cells[i].appendChild(input);
    }

    var actionsCell = cells[4];
    actionsCell.innerHTML = `
        <button class="save" onclick="saveBook(${index})">Save</button>
        <button class="cancel" onclick="updateTable()">Cancel</button>
    `;
}

function saveBook(index) {
    var row = document.getElementById("book-table-body").children[index];
    var inputs = row.getElementsByTagName("input");

    books[index].name = inputs[0].value.trim();
    books[index].price = inputs[1].value;
    books[index].author.name = inputs[2].value.trim();
    books[index].author.email = inputs[3].value.trim();

    updateTable();
}

function deleteBook(index) {
    books.splice(index, 1);
    updateTable();
}
