import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Masks {

  constructor() { }

  date(data: string) {
    data = data.replace(/\D/g, '');
    data = data.replace(/(\d{2})(\d)/, '$1/$2');
    data = data.replace(/(\d{2})(\d)/, '$1/$2');
    return data;
  }

  number(data: string) {
    data.replace(/\D/g, '');
    return data;
  }

  phone(data: string) {
    data = data.replace(/\D/g, '');
    data = data.replace(/^(\d)/, '($1');
    data = data.replace(/(.{3})(\d)/, '$1) $2');
    if (data.length == 9) {
      data = data.replace(/(.{1})$/, '-$1');
    } else if (data.length == 10) {
      data = data.replace(/(.{2})$/, '-$1');
    } else if (data.length == 11) {
      data = data.replace(/(.{3})$/, '-$1');
    } else if (data.length == 12) {
      data = data.replace(/(.{4})$/, '-$1');
    } else if (data.length > 12) {
      data = data.replace(/(.{4})$/, '-$1');
    }
    return data;
  }
}
