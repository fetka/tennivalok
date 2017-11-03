import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";
import { TranslateService } from "ng2-translate";
import { DatePicker } from "@ionic-native/date-picker";


@Component({
  selector: 'editmodal',
  templateUrl: 'editmodal.html'
})
export class EditmodalComponent {
  chosenTheme: any = 'blue-theme';
  title: any;
  editedTitle: any;
  role: any;
  date: any;
  constructor(private viewCtrl: ViewController, params: NavParams,
    translateService: TranslateService,
    private datePicker: DatePicker) {

    this.title = params.get('todoListItem');
    this.editedTitle = this.title;
    this.role = params.get('role');
    this.date = params.get('date');

    //  console.log(params.get('todoListItem'))
    translateService.get(this.role).subscribe(
      value => {
        // value is our translated string
        this.role = value;
      }
    )
  }
  deleteDate() {
    this.date = null;
  }
  showPicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      is24Hour: true,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(

      date => {
        console.log('Got date: ', date);
        this.date = date;
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }
  dismiss() {
    this.viewCtrl.dismiss({ title: this.editedTitle, date: this.date });
  }
  cancel() {
    this.viewCtrl.dismiss('cancel');

  }

}
