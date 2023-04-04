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
  reverseDueDate: any;
  reversePriority: any;
  constructor() {
    this.priorities = [
      { name: 'High', color: '#1a122c' },
      { name: 'Mid', color: '#281c44' },
      { name: 'Low', color: '#38285e' },
    ];
    this.loadList();
  }

  addNewToDo() {
    if (this.newTodoText.length < 1)
      return
    const todoList = localStorage.getItem('todoList');
    this.todoList = todoList !== null ? JSON.parse(todoList) : [];

    let newItem = {
      "description": this.newTodoText,
      "priority": this.selectedPriority,
      "dueDate": this.dueDate,
      "id": self.crypto.randomUUID()
    };
    this.todoList.push(newItem);
    this.newTodoText = "";
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
      this.todoList = this.todoListBkp.filter((obj: any) => JSON.stringify(obj.description).toLowerCase().includes(this.search.toLowerCase())
      )
  }


  orderBy(type: any) {
    if (type == 'priority') {
      this.reversePriority = !this.reversePriority;
      if (this.reversePriority)
        this.todoList = this.todoList.sort((a: any, b: any) => (a.priority.name > b.priority.name ? 1 : -1))
      else
        this.todoList = this.todoList.sort((a: any, b: any) => (b.priority.name > a.priority.name ? 1 : -1))
    } else {
      if (type == 'date') {
        this.reverseDueDate = !this.reverseDueDate;
        if (this.reverseDueDate)
          this.todoList = this.todoList.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        else
          this.todoList = this.todoList.sort((a: any, b: any) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

      }
    }
  }

}
