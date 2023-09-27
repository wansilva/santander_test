import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessages {

  constructor() { }

  private listErrors = {
    dateOfBirth: "Data de nascimento inválida",
    email: "O email informado já está cadastrado",
  };

  messages(errors: any) {
    const defaulErrorMessage = "Erro ao cadastrar o usuário";
    if (!errors) {
      return defaulErrorMessage;
    }

    const [[ key, value]] = Object.entries(errors);

    if (key && this.listErrors[key as never])
      return this.listErrors[key as never]

    return defaulErrorMessage;
  }
}
