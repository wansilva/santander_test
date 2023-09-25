import { Injectable } from '@angular/core';
import * as moment from 'moment';
// import 'moment/locale/pt-br';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  formDate(date?: string | null, format = "DD/MM/YYYY") {
    try {
      if (!date)
        return "";
  
      const newDate = moment(date).format(format);
  
      return newDate.toString();
    } catch (_) {
      return "";
    }
  }

  formDateIso(date?: string | null) {
    try {
      if (!date)
        return "";
  
      const newDate = new Date(date.replaceAll("/", "-"));
  
      return newDate.toISOString();
    } catch (_) {
      return "";
    }
  }
}
