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
    if (data.length > 9 && data.length <= 13) {
      data = data.replace(/(.{9})(\d)/, '$1-$2');
    } else if (data.length > 13) {
      data = data.replace(/(.{10})(\d)/, '$1-$2');
    }
    return data;
  }
}
