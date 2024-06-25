let addButtonEl = document.getElementById("addButton");
let saveButton = document.getElementById("saveButton");
let ulContainerEl = document.getElementById("ulContainer");
let inputEl = document.getElementById("input");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveButton.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    ulContainerEl.removeChild(todoElement); //this deletes html element in browser display
    
    let deletedElementIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        return eachTodoId === todoId;
    });
    todoList.splice(deletedElementIndex, 1); //this deletes the item to be deleted in array as well!!
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    
    let todoObjectIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        return eachTodoId === todoId;
    });
    let todoObject = todoList[todoObjectIndex];
   // todoObject.isChecked = !todoObject.isChecked; can be written like this in one sentence instead if-elsse // Toggle the checked status
    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }//maintaining the variable correctly!!as it changes here.
    else{
        todoObject.isChecked=true;
    }
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueId;
    let checkboxId = "checkbox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("d-flex", "flex-row", "todo-item-container");
    ulContainerEl.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function () {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelElement.classList.add("checkbox-label");
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function () {
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}

// Load todos from localStorage on page load
for(let todo of todoList) {
    createAndAppendTodo(todo);
};

addButtonEl.onclick = function () {
    let inputValue = inputEl.value;
    if (inputValue === "") {
        alert("Enter a valid text");
        return;
    }
    todosCount += 1; // Increment todosCount correctly
    let newTodo = {
        text: inputValue,
        uniqueId: todosCount,
        isChecked: false,
    };
    todoList.push(newTodo); // Push new todo to array
    createAndAppendTodo(newTodo);
    inputEl.value = ""; // Clear input field
    ; //what ever the todoitem u enter ,it will be pushed into array
    //so that the objects list will be maintained throughout the program and also while in local storage whatever the objects inside the 
    //array will be displayed on reload.
}
