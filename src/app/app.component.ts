import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, LangChangeEvent } from 'ng2-translate';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage: any = TabsPage;
  chosenTheme: String;
  textDir: string = "ltr";

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, public translate: TranslateService) {

    this.chosenTheme = 'blue-theme';
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
      //this is to determine the text direction depending on the selected language
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.textDir = event.lang == 'ar' ? 'rtl' : 'ltr';
      });
    });
  }
}
