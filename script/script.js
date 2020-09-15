'use strict';

const formTodoControl = document.querySelector('.todo-control'),
  txtHeaderInput = document.querySelector('.header-input'),
  ulTodoList = document.querySelector('.todo-list'),
  ulTodoCompleted = document.querySelector('.todo-completed');

let todoData = [];

// переопределяем DOM в соответствии с актуальными значениями в todoData:
function render() {
  ulTodoCompleted.textContent = '';
  ulTodoList.textContent = '';

  todoData.forEach(function (item, ind) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';
    li.querySelector('.todo-remove')
      .addEventListener('click', function () {
        todoData.splice(ind, 1);
        localStorage.setItem('todoData', JSON.stringify(todoData));
        render();
      });
    li.querySelector('.todo-complete')
      .addEventListener('click', function () {
        item.completed = !item.completed;
        localStorage.setItem('todoData', JSON.stringify(todoData));
        render();
      });

    if (item.completed) {
      ulTodoCompleted.append(li);
    } else {
      ulTodoList.append(li);
    }
  });
}

// навешиваем обработчик на нажатие в форме кнопки с плюсом или клавиши Enter:
formTodoControl.addEventListener('submit', function (event) {
  event.preventDefault(); // отменяем перезагрузку страницы

  const newVal = String(txtHeaderInput.value).trim();
  if (newVal !== '') {
    const newItem = {
      value: newVal,
      completed: false
    };
    todoData.push(newItem);
    localStorage.setItem('todoData', JSON.stringify(todoData));
    txtHeaderInput.value = '';
    render();
  }
});

todoData = JSON.parse(localStorage.getItem('todoData'));
render();