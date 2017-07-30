import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";
import { TranslateService } from "ng2-translate";


@Component({
  selector: 'editmodal',
  templateUrl: 'editmodal.html'
})
export class EditmodalComponent {
  chosenTheme: any = 'blue-theme';
  title: any;
  editedTitle: any;
  role: any;

  constructor(private viewCtrl: ViewController, params: NavParams,
    translateService: TranslateService) {

    this.title = params.get('todoListItem');
    this.editedTitle = this.title;
    this.role = params.get('role');
    //  console.log(params.get('todoListItem'))
    translateService.get(this.role).subscribe(
      value => {
        // value is our translated string
        this.role = value;
      }
    )
  }

  dismiss() {
    this.viewCtrl.dismiss(this.editedTitle);
  }
  cancel() {
    this.viewCtrl.dismiss('cancel');

  }

}
