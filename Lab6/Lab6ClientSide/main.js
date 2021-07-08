function displayForm() {
    document.getElementById('product-container').style.display = 'block';
    document.getElementById('login-div').style.display = 'none';
}
function displayBookContain() {
    fetchBooks();
    document.getElementById('product-container').style.display = 'none';
    document.getElementById('login-div').style.display = 'block';
}
window.onload = function () {
    if (sessionStorage.getItem('accessToken')) {
        displayForm();
    } else {
        displayBookContain();
    }
    document.getElementById('logout-btn').onclick = function () {
        sessionStorage.removeItem('accessToken');
        displayBookContain();
    }
    document.getElementById('login-btn').onclick = async function (event) {
        event.preventDefault();
        const result = await (await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        }).json())
        alert(result);
        if (result.jwtToken) {
            sessionStorage.setItem('accessToken', result.jwtToken);
            displayBookContain()
        } else {
            document.getElementById('error-msg').innerText = result.error;
        }
    }
    //fetchBooks();
    document.getElementById('addBtn').onclick = function (event) {
        event.preventDefault();
        const bookId = this.dataset.id;

        if (bookId) { //data-id exists - edit a product
            fetch('http://localhost:3000/books/' + bookId, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer" + sessionStorage.getItem('accessToken')
                },
                body: JSON.stringify({
                    title: document.getElementById('title').value,
                    isbn: document.getElementById('isbn').value,
                    publishedDate: document.getElementById('publishedDate').value,
                    author: document.getElementById('auther').value
                })
            })
                .then(data => data.json())
                .then(updatedProd => {
                    console.log(updatedProd);
                    //reset from
                    document.getElementById('form-title').textContent = "Add a Book";
                    document.getElementById('add-form').reset();
                    document.getElementById('addBtn').dataset.id = '';
                    location.reload();
                })
        } else {
            createNewBooks();
        }
    }
}
function createNewBooks() {
    const title = document.getElementById('title').value;
    const isbn = document.getElementById('isbn').value;
    const publishedDate = document.getElementById('publishedDate').value;
    const author = document.getElementById('author').value;
    fetch('http://localhost:3000/books', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            title: title,
            isbn: isbn,
            publishedDate: publishedDate,
            author: author
        })
    }).then(data => data.json())

        .then(prod => {
            console.log(prod);
            document.getElementById('add-form').reset();
            attachSingleProduct(document.getElementById('product-list-body'), prod);
        });
}
async function fetchBooks() {
    const books = await (await fetch('http://localhost:3000/books', {
        headers: {
            "Authorization": "Bearer" + sessionStorage.getItem('accessToken')
        }
    })).json();
    const tbody = document.getElementById('product-list-body');
    books.forEach(prod => {
        attachSingleBook(tbody, prod);

    })
}
function attachSingleBook(parentNode, book) {
    const tr = document.createElement('tr'); //<tr>
    const titleTd = document.createElement('td'); //<td>111</td>
    titleTd.textContent = book.title;
    tr.appendChild(titleTd); //
    const priceTd = document.createElement('td');
    priceTd.textContent = book.price;
    tr.appendChild(priceTd);
    const publishedDateTd = document.createElement('td');
    publishedDateTd.textContent = book.publishedDate;
    tr.appendChild(publishedDateTd);
    const actionTd = document.createElement('td');
    const deleteButton = document.createElement('button');
    // deleteButton.className = 'btn btn-primary';
    deleteButton.innerText = 'DELETE';
    deleteButton.dataset.id = book.id;
    actionTd.appendChild(deleteButton);
    const updateButton = document.createElement('button');
    updateButton.innerText = 'UPDATE';
    updateButton.dataset.id = book.id;
    actionTd.appendChild(updateButton);
    tr.appendChild(actionTd);
    deleteButton.addEventListener('click', function () {

        fetch('http://localhost:3000/books/' + book.id, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer" + sessionStorage.getItem('accessToken')
            }
        })
            .then(data => {
                tr.remove();
            });
    });
    updateButton.addEventListener('click', function () {
        fetch('http://localhost:3000/books/' + book.id, {
            headers: {
                "Authorization": "Bearer" + sessionStorage.getItem('accessToken')
            }
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                document.getElementById('form-title').textContent = "Edit a Product";
                document.getElementById('title').value = data.title;
                document.getElementById('isbn').value = data.isbn;
                document.getElementById('publishedDate').value = data.publishedDate;
                document.getElementById('author').value = data.author;
                document.getElementById('addBtn').dataset.id = data.id;
            })
    })
    parentNode.appendChild(tr);
}