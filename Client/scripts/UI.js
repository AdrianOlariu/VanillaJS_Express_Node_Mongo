class UI{

    static flagEdit = false;
    static holdBook = new Book('','','');

    static button(type){
        const button = document.createElement('button');
        button.setAttribute('type','button');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.classList.add('btn-sm');
        button.classList.add(`btn-${type.toLowerCase()}`);
        button.innerHTML = `${type}`;
        return button;
    }

    static displayBooks(){
        let books = Storage.getBooks();

        books.forEach(book => 
            UI.addBookToList(book)
        );
    }

    static importBooks(importedBooks){
        let books = JSON.parse(importedBooks);
        let isbns = Storage.getBooks().map(book => book.isbn);
        console.log('existing books',isbns);
        books.forEach(book => {
            if(!(isbns.indexOf(book.isbn) !== -1)){
                UI.addBookToList(book);
                Storage.addBook(book);
            }
        }
        );
    }

    static addBookToList(book){
        const tbodyElemenet = document.querySelector('#book-list');
        const trowElement = document.createElement('tr');
        trowElement.innerHTML = 
        `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.status}</td>
                <td>${book.isbn}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-primary btn-sm btn-delete">Delete
                    </button><button class="btn btn-primary btn-sm btn-edit">Edit</button>
                </td>
            </tr>
        `;

        tbodyElemenet.appendChild(trowElement);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(element){
        if(element.classList.contains('btn-delete')){
            let children = element.parentNode.parentNode.children;
            UI.holdBook.title = children[0].textContent;
            UI.holdBook.isbn = children[3].textContent;
            UI.holdBook.status = children[2].textContent;
            UI.holdBook.author = children[1].textContent;
            children[children.length - 1].textContent = 'Delete entry?';
            children[children.length - 1].appendChild(UI.button('Yes'));
            children[children.length - 1].appendChild(UI.button('No'));
        }
    }

    static deleteUser(element){
        
    }

    static confirmDelete(element){
            element.parentNode.parentNode.remove();
    }


    static cancelEdit(element, book){
        console.log('call cancel');

        let children = element.parentNode.parentNode.children;
        console.log(children);
        for(let i = 0; i <= children.length - 2; i++){
            children[i].setAttribute('contenteditable','false');
            children[i].classList.remove('td-edit');
            children[children.length - 1].textContent = '';
            children[children.length - 1].appendChild(UI.button('Delete'));
            children[children.length - 1].appendChild(UI.button('Edit'));
            console.log('works',children[children.length - 1]);

            children[0].textContent = UI.holdBook.title;
            children[2].textContent = UI.holdBook.status;
            children[3].textContent = UI.holdBook.isbn;
            children[1].textContent = UI.holdBook.author;
        }

        UI.flagEdit = false;
    }

    static saveEdit(element){
        console.log("save edit");
        console.log(element.parentNode.parentNode);

        let children = element.parentNode.parentNode.children;

        UI.holdBook.title = children[0].textContent;
        UI.holdBook.isbn = children[3].textContent;
                UI.holdBook.status = children[2].textContent;
                UI.holdBook.author = children[1].textContent;

        console.log('save edit', UI.holdBook);

        Storage.editBook(UI.holdBook);

        UI.cancelEdit(element);
    }
    
    static editBook(element){
        UI.flagEdit = true;
        if(element.classList.contains('btn-edit')){
            let children = element.parentNode.parentNode.children;
            let values = [];
            for(let i = 0; i <= children.length - 3; i++){
                children[i].setAttribute('contenteditable','true');
                children[i].classList.add('td-edit');
                children[children.length - 1].textContent = '';
                children[children.length - 1].appendChild(UI.button('Save'));
                children[children.length - 1].appendChild(UI.button('Cancel'));
                console.log(children[children.length - 1]);
                UI.holdBook.title = children[0].textContent;
                UI.holdBook.isbn = children[3].textContent;
                UI.holdBook.status = children[2].textContent;
                UI.holdBook.author = children[1].textContent;
                console.log(UI.holdBook);
            }

            console.log(values);
            // element.parentNode.previousElementSibling.previousElementSibling.setAttribute('contenteditable','true');
            // element.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute('contenteditable','true');
        }
    }

    static showAlert(message, type){
        //creem un div, dinamic
        const divElement = document.createElement('div');
        //adaugam clasele la acel div, dinamic
        divElement.className = `alert alert-${type}`;
        //creem un node de tip text
        const textMessage = document.createTextNode(message);
        //append-uim acel node la elementul div creat
        divElement.appendChild(textMessage);

        //selectam unde vom pune div-ul
        const header = document.querySelector('#header');
        const form = document.querySelector('#book-form');
        //in container inseram div-ul inainte de form 
        
        header.append(divElement);

        setTimeout(() => {
            header.removeChild(divElement);
        }, 2000)
    }

    static loggedIn(cookie){
        if(!cookie){
            // btnRegister.classList.add('hideContainer');
            infoContainer.classList.add('hideContainer');
            books_section.classList.add('hideContainer');
            authorisationContainer.classList.remove('hideContainer');
        }else{
            infoContainer.classList.remove('hideContainer');
            books_section.classList.remove('hideContainer');
            authorisationContainer.classList.add('hideContainer');

        }
    }

    static signUpForm(){
        btnLogIn.classList.add('hideContainer');
        btnSignUp.classList.add('hideContainer');

        confirmPassword.setAttribute('class','form-group');
        confirmPassword.innerHTML = `<input type="text" id="confirmPass" class="form-control-sm" placeholder="Confirm Password">`;
        inputFields.append(confirmPassword);

        const inputFieldsButtons = document.querySelector('#inputFieldsButtons');

        const registerButton = document.createElement('div');
        registerButton.setAttribute('style','display:block;margin-left: auto;');
        registerButton.setAttribute('class','mt-4');
        registerButton.innerHTML = `<button class="btn btn-primary btn-add-book" id="btnRegister" >Register</button>`;
        inputFieldsButtons.append(registerButton);
        
    }

    static logInForm(){
        btnLogIn.classList.remove('hideContainer');
        btnSignUp.classList.remove('hideContainer');
        btnRegister.classList.add('hideContainer');
        confirmPassword.classList.add('hideContainer');
    }

    static setRole(role){
        if(role !== 'user' ){
            btnRolePlaceholder.classList.remove('hideContainer');
            console.log('admin sau editor');
            btnRolePlaceholder.setAttribute('style','text-decoration:none;');
            btnRolePlaceholder.classList.add('btn-edit-users');
        }else{
            btnRolePlaceholder.classList.add('hideContainer');
        }
    }

    static hideSection(id){
        id.classList.add('hideContainer');
    }
    static showSection(id){
        id.classList.remove('hideContainer');
    }

    static showUsers(result){
        console.log(result);
        const res = result;
        const usersList = document.querySelector('#users-list');

        const html = result.map(res => `
        <tr>
            <td>${res.username}</td>
            <td>
            ${res.roles[res.roles.length - 1]}
            </td>
            <td class="text-center">
            <button type="button" class="btn btn-primary btn-sm btn-delete">Delete
            </button><button class="btn btn-primary btn-sm btn-edit">Edit</button>
            </td>
        </tr>
        ` ).join('');
        console.log(html);

        usersList.innerHTML = html;
        
        console.log(res);
    }
}