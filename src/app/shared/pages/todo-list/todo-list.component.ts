import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todoList: any = [];
  newTodoText: string = "test";
  selectedPriority: any;
  dueDate: Date = new Date();
  todoListBkp: any = [];
  constructor() {
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

}
