import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LanguageModel } from "../../models/language.model";

@Injectable()
export class LanguageServiceProvider {
  languages: Array<LanguageModel> = new Array<LanguageModel>();

  constructor(public http: Http) {
    this.languages.push(
      { name: "English", code: "en" },
      { name: "Spanish", code: "es" },
      { name: "Arabic", code: "ar" },
      { name: "Hungarian", code: "hu" },
      { name: "German", code: "de" }
    );
  }
  getLanguages() {
    return this.languages;
  }
}
