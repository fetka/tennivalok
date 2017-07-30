import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import { Item } from "../../pages/home/home";
import { Storage } from '@ionic/storage';
import { Events } from "ionic-angular";


@Injectable()
export class DataProvider {
  todos: Item[];
  constructor(public storage: Storage,
    public event: Events) {
    storage.ready().then(() => {

      this.storage.get('todo_2').then(data => {
        this.todos = JSON.parse(data) || [];
        this.event.publish('loadList', this.todos.slice());
      })
    })


  }
  getList() {
    this.storage.ready().then(() => {

      this.storage.get('todo_2').then(data => {
        this.todos = JSON.parse(data);
        // console.log(this.todos)
        return this.todos;
      });
    }, err => {
      return;
    });
  }
  getDetails(index) {
    return this.todos[index].details || [];
  }
  setDetails(index: number, details: Array<String>) {
    this.todos[index].details = details;
    this.storage.set('todo_2', JSON.stringify(this.todos));

  }
  saveList(list) {
    this.todos = list;
    this.storage.set('todo_2', JSON.stringify(list));
  }

}
