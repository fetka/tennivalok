import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { ListPage } from "../list/list";
import { EditmodalComponent } from "../../components/editmodal/editmodal";
import { Storage } from '@ionic/storage';
import { DataProvider } from "../../providers/data/data";
import { TranslateService } from 'ng2-translate';
import { LanguageModel } from "../../models/language.model";
import { LanguageServiceProvider } from "../../providers/language-service/language-service";
import { LocalNotifications } from "@ionic-native/local-notifications";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  languageSelected: any = 'en';
  languages: Array<LanguageModel>;
  todoList: Item[] = [];
  allowReorder: boolean = false;
  onChangedDetails: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public data: DataProvider,
    private storage: Storage, public translate: TranslateService,
    public languageService: LanguageServiceProvider,
    public event: Events, private localNotifications: LocalNotifications) {

    this.languages = this.languageService.getLanguages();
    // this.todoList = [{ title: 'first', details: ['egy', 'ketto'] },
    // { title: 'second', details: ['egy', 'ketto'] }];


    this.event.subscribe('loadList', (data) => {
      this.todoList = data;
    });

    this.setLanguage();

    // this.localNotifications.schedule({
    //   text: 'Multi ILocalNotification 1',
    //   at: new Date(new Date().getTime() + 3600)
    //   //sound: isAndroid ? 'file://sound.mp3': 'file://beep.caf',
    //   // data: { secret:key }
    // });
    console.log("this.localNotifications.isScheduled(1)")

  }
  setLanguage() {
    var userLang = navigator.language.split('-')[0];
    userLang = /(de|en|hu)/gi.test(userLang) ? userLang : 'en';

    this.translate.setDefaultLang('en');
    this.translate.use(userLang);
    // this.translate.setDefaultLang(this.languageSelected);
    // this.translate.use(this.languageSelected);
  }


  delete(index) {
    this.todoList.splice(index, 1);
    this.data.saveList(this.todoList);

  }
  edit(index) {
    let modal = this.modalCtrl.create(EditmodalComponent,
      { 'todoListItem': this.todoList[index].title, 'role': 'EDIT' });
    modal.present();
    modal.onDidDismiss(data => {
      if (data != 'cancel') {

        this.todoList[index].title = data;
        this.data.saveList(this.todoList);
      }
    })
  }
  add() {
    let modal = this.modalCtrl.create(EditmodalComponent,
      { 'todoListItem': '', 'role': 'ADD' });
    modal.present();
    modal.onDidDismiss(data => {
      if (data != 'cancel') {
        this.todoList.push({ title: data, details: [] });
        this.data.saveList(this.todoList);
      }
    })
  }
  showDetails(_title, _index) {

    this.onChangedDetails = true;
    // this.navCtrl.push(ListPage, { 'selectedItem': this.todoList[index] })
    this.navCtrl.push(ListPage, { 'title': _title, 'selectedItem': _index })
  }
  reorderItems(indexes) {
    let element = this.todoList[indexes.from];
    this.todoList.splice(indexes.from, 1);
    this.todoList.splice(indexes.to, 0, element);
    this.data.saveList(this.todoList);
  }
  allowReorderList() {
    this.allowReorder = !this.allowReorder;
  }

  ionViewWillLeave() {
    //console.log('leave')
    this.data.saveList(this.todoList);
  }
}
export class Item {
  title: any;
  details: any[];
}
