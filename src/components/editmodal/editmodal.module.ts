import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditmodalComponent } from './editmodal';

@NgModule({
  declarations: [
    EditmodalComponent,
  ],
  imports: [
    IonicPageModule.forChild(EditmodalComponent),
  ],
  exports: [
    EditmodalComponent
  ]
})
export class EditmodalComponentModule {}
