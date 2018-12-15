/* Name: Kenneth Devon Gaston
 * Date Last Modified: 12-14-2018
 * Project Name: Practice Todo App
 * Purpose: Practice working with Javascript, HTML, and CSS by using them to create a simple Todo List app
 */
var todo = {
  todoText: "",
  isCompleted: false
}

var todoList = {
  todos: [],
  addTodos: function(todoText){
    this.todos.push({
      todoText: todoText,
      isCompleted: false
    })
  },
  changeTodo: function(position, todoText){
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position){
    let todo = this.todos[position];
    todo.isCompleted = !todo.isCompleted;
  },
  toggleAll: function(){
    let totalTodos = this.todos.length;
    let todosCompleted = 0;
    this.todos.forEach(function(todo) {
      if(todo.isCompleted === true){
        todosCompleted++;   
      }
    });
    this.todos.forEach(function(todo){
      if(todosCompleted === totalTodos){
         todo.isCompleted = false;
      }
      else{
        todo.isCompleted = true;
      }
     })
  }
};

var handlers = {
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodos: function(){
    let addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(position, change){
    todoList.changeTodo(position, change);
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position){
    todoList.toggleCompleted(position);
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(){
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position){
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = '';
      
      if(todo.isCompleted === true){
        todoTextWithCompletion = '(x)' + todo.todoText;
      }
      else{
         todoTextWithCompletion = '( )' + todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createToggleCompletedButton());
      todoLi.appendChild(this.createChangeTodoButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function(){
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  createToggleCompletedButton: function(){
    let toggleCompletedButton = document.createElement('button');
    toggleCompletedButton.textContent = "Toggle Task Completion";
    toggleCompletedButton.className = "toggleCompletedButton";
    return toggleCompletedButton;
  },
  createChangeTodoButton: function(){
    let changeTodoButton = document.createElement('button');
    changeTodoButton.textContent = "Change Todo";
    changeTodoButton.className = "changeTodoButton";
    changeTodoButton.appendChild(this.createChangeTodoTextbox());
    return changeTodoButton;
  },
  createChangeTodoTextbox: function(){
    let changeTodoTextbox = document.createElement('input');
    changeTodoTextbox.input = "text";
    changeTodoTextbox.className = "changeTodoTextbox";
    return changeTodoTextbox;
  },
  setUpEventListeners: function(){
  let todosUl = document.querySelector('ul');
  todosUl.addEventListener('click', function(event){
    let elementClicked = event.target;
    if(elementClicked.className === 'deleteButton'){
       handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
    else if(elementClicked.className === 'toggleCompletedButton'){
      handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
    }
    else if(elementClicked.className === 'changeTodoButton'){
      let todoChange = elementClicked.firstElementChild.value;
      handlers.changeTodo(parseInt(elementClicked.parentNode.id), todoChange);
    }
});
  }
};

view.setUpEventListeners();
