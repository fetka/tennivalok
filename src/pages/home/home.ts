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
  date: any;

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
            console.log(this.todoList)

      this.localNotifications.getAllIds().then(res => {

        console.log("isScheduled: " + res)
        let searchId = function (i) {
          for (let k = 0; k < res.length; k++) {
            if (i == res[k] - 1) {
              return false;
            }

          }
          return true;
        }
        for (let i = 0; i < this.todoList.length; i++) {
          if (searchId(i)) {
            this.todoList[i].date = null;
          }
        }
      });
      console.log(this.todoList)
    });

    this.setLanguage();

    // this.localNotifications.schedule({
    //   text: 'Multi ILocalNotification 1',
    //   at: new Date(new Date().getTime() + 3600)
    //   //sound: isAndroid ? 'file://sound.mp3': 'file://beep.caf',
    //   // data: { secret:key }
    // });


  }
  scheduleNotification(id, text, date) {
    console.log('_id: ' + id)
    this.localNotifications.clear(id);
    this.localNotifications.schedule({
      id: id,
      text: text,
      at: date
      //sound: isAndroid ? 'file://sound.mp3': 'file://beep.caf',
      // data: { secret:key }
    });
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
      {
        'todoListItem': this.todoList[index].title,
        'role': 'EDIT', 'date': this.todoList[index].date
      });
    modal.present();
    modal.onDidDismiss(data => {
      if (data != 'cancel') {

        this.todoList[index].title = data.title;
        this.todoList[index].date = data.date;
        this.data.saveList(this.todoList);
        if (data.date != null) {
          this.scheduleNotification(index + 1, data.title, data.date);

        } else {
          this.localNotifications.cancel(index + 1);
        }
      }
    })
  }
  add() {
    let modal = this.modalCtrl.create(EditmodalComponent,
      { 'todoListItem': '', 'role': 'ADD', 'date': null });
    modal.present();
    modal.onDidDismiss(data => {
      if (data != 'cancel') {
        this.todoList.push({ title: data.title, date: data.date, details: [] });
        this.data.saveList(this.todoList);
        console.log(data)
        if (data.date != null) {

          this.scheduleNotification(this.todoList.length, data.title, data.date);
        }

      }
    })
  }
  showDetails(_title, _index, _date) {

    this.onChangedDetails = true;
    // this.navCtrl.push(ListPage, { 'selectedItem': this.todoList[index] })
    this.navCtrl.push(ListPage, { 'title': _title, 'selectedItem': _index, 'date': _date })
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
  date: any;
  details: any[];
}
