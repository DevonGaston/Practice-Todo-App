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
    var todo = this.todos[position];
    todo.isCompleted = !todo.isCompleted;
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var todosCompleted = 0;
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
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(){
    var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
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
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      
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
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  createToggleCompletedButton: function(){
    var toggleCompletedButton = document.createElement('button');
    toggleCompletedButton.textContent = "Toggle Task Completion";
    toggleCompletedButton.className = "toggleCompletedButton";
    return toggleCompletedButton;
  },
  createChangeTodoButton: function(){
    var changeTodoButton = document.createElement('button');
    changeTodoButton.textContent = "Change Todo";
    changeTodoButton.className = "changeTodoButton";
    return changeTodoButton;
  },
  setUpEventListeners: function(){
  var todosUl = document.querySelector('ul');
  todosUl.addEventListener('click', function(event){
    var elementClicked = event.target;
    if(elementClicked.className === 'deleteButton'){
       handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
    else if(elementClicked.className === 'toggleCompletedButton'){
      handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
    }
    else if(elementClicked.className === 'changeTodoButton'){
     console.log("work in progress"); 
    }
});
  }
};

view.setUpEventListeners();
