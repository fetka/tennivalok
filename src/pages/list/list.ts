import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Item, HomePage } from "../home/home";
import { EditmodalComponent } from "../../components/editmodal/editmodal";
import { DataProvider } from "../../providers/data/data";


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',

})
export class ListPage {
  allowReorder: boolean;
  list: any[];
  index: number;
    title:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public data: DataProvider) {
    // this.list = this.navParams.get('selectedItem').details;
    this.index = this.navParams.get('selectedItem');
      this.title = this.navParams.get('title');
    this.list = this.data.getDetails(this.index);
    this.allowReorder = false;
  }

  delete(index) {
    this.list.splice(index, 1);
    this.data.setDetails(this.index, this.list);

  }
  edit(index) {
    let modal = this.modalCtrl.create(EditmodalComponent,
      { 'todoListItem': this.list[index], 'role': 'EDIT' });
    modal.present();
    modal.onDidDismiss(data => {
      if (data != 'cancel') {
        this.list[index] = data;
        this.data.setDetails(this.index, this.list);
      }
    })
  }
  add() {
    let modal = this.modalCtrl.create(EditmodalComponent,
      { 'todoListItem': '', 'role': 'Add_detail' });
    modal.present();
    modal.onDidDismiss(data => {
      if (data != 'cancel') {
        this.list.push(data);
        this.data.setDetails(this.index, this.list);
      }
    })
  }
  reorderItems(indexes) {
    let element = this.list[indexes.from];
    this.list.splice(indexes.from, 1);
    this.list.splice(indexes.to, 0, element);
    this.data.setDetails(this.index, this.list);

  }
  allowReorderList() {
    this.allowReorder = !this.allowReorder;
  }
}
