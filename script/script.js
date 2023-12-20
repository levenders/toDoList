'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const state = {
    allTodos: [],
    selectedTodos: [],
  }

  const input = document.querySelector('.inputAdd')
  const button = document.querySelector('.addBtn')
  const workSpace = document.querySelector('.workSpace')

  const deleteTodo = (element) => {
    element.remove()
  }

  const removeSelectedTodos = () => {
    state.selectedTodos.forEach((todo) => deleteTodo(todo))
  }

  const cancelAllSelects = () => {
    state.selectedTodos.map((todo) => todo.classList.remove('case_select'))
    state.selectedTodos = []
  }

  const selectTodo = (element) => {
    // Проверяю есть ли выбранный в списке
    if (state.selectedTodos.includes(element)) {
      // Если есть - переопределяю список, отфильтровывая те тудушки, которые там уже есть
      state.selectedTodos = state.selectedTodos.filter(
        (todo) => todo !== element
      )

      element.classList.remove('case_select')
    } else {
      // Если нет - добавляю его в список
      state.selectedTodos.push(element)

      element.classList.add('case_select')
    }
  }

  const addTodo = (todoText) => {
    if (todoText == '' || todoText == null) {
      input.classList.add('emptyInput')
    } else {
      input.classList.remove('emptyInput')

      // Вызываю функцию рендера тудушки
      renderTodo(todoText)

      // Очищаю поле инпута
      input.value = ''
    }
  }

  const renderTodo = (todoText) => {
    // Создал html-элементы
    const newTodo = document.createElement('div')
    const newTodoText = document.createElement('div')
    const newButton = document.createElement('button')

    // Создал из них разметку
    newTodoText.insertAdjacentText('afterbegin', todoText)
    newTodo.insertAdjacentElement('afterbegin', newTodoText)
    newTodo.insertAdjacentElement('beforeend', newButton)

    // Добавил им классы
    newTodo.classList.add('case')
    newButton.classList.add('delete')
    newTodoText.classList.add('text')

    state.allTodos.push(newTodo)

    const handleSelect = () => {
      selectTodo(newTodo)
    }

    // Функция для обработчика удаления
    const handleDelete = () => {
      deleteTodo(newTodo)
      newTodo.removeEventListener('click', handleSelect)
      newButton.removeEventListener('click', handleDelete)
    }

    // Повесил обработчик на созданную тудушку
    newTodo.addEventListener('click', handleSelect)

    // Повесил на созданную кнопку обработчик
    newButton.addEventListener('click', handleDelete)

    // Добавил в разметку нужную тудушку
    workSpace.insertAdjacentElement('beforeend', newTodo)
  }

  button.addEventListener('click', () => {
    addTodo(input.value)
  })

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      if (input.value) {
        addTodo(input.value)
      }
    }

    if (event.code === 'Delete') {
      if (state.selectedTodos.length) {
        removeSelectedTodos()
      }
    }

    if (event.code === 'Escape') {
      if (state.selectedTodos.length) {
        cancelAllSelects()
      }
    }

    if (event.code === 'ControlLeft') {
      selectAllTodo()
    }
  })
})
