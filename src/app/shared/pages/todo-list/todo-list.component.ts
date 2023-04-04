import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todoList: any = [];
  newTodoText: string = "";
  selectedPriority: any;
  dueDate: Date = new Date();
  todoListBkp: any = [];
  newTodoDialog: boolean = false;
  priorities: any = []
  now: Date = new Date();
  search: any = "";
  constructor() {
    this.priorities = [
      { name: 'High', color: '#1a122c' },
      { name: 'Mid', color: '#281c44' },
      { name: 'Low', color: '#38285e' },
    ];
    this.loadList();
  }

  addNewToDo() {
    const todoList = localStorage.getItem('todoList');
    this.todoList = todoList !== null ? JSON.parse(todoList) : [];

    let newItem = {
      "description": this.newTodoText,
      "priority": this.selectedPriority,
      "dueDate": this.dueDate,
      "id": self.crypto.randomUUID()
    };
    this.todoList.push(newItem);

    this.saveList();
  }

  saveList() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList))
    this.loadList();
  }

  loadList() {
    this.todoList = JSON.parse(localStorage.getItem('todoList') || '[]')
    this.todoListBkp = this.todoList;
  }

  removeToDo(id: string) {
    this.todoList = this.todoList.filter((item: any) => item.id !== id)
    this.saveList();
  }

  openNewToDoDialog() {
    this.newTodoDialog = !this.newTodoDialog;
  }

  searchToDo() {
    if (this.search.length == 0)
      this.loadList();
    if (this.search.length > 1)
      this.todoList = this.todoListBkp.filter((obj: any) =>
        JSON.stringify(obj).toLowerCase().includes(this.search.toLowerCase())
      )
  }
}
