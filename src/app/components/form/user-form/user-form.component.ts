import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSchema } from 'src/app/schemas/user.schema';
import { CountrysList } from 'src/app/schemas/countrys.enum';
import { DatesService } from 'src/app/utils/dates/dates.service';

@Component({
  selector: 'user-form-component',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  @Input() buttonSave: string = "Salvar";
  @Input() buttonRestore: string = "Restaurar";
  @Input() showButtonClean: boolean = true;
  @Input() showButtonRestore: boolean = false;
  @Input() disabledEmail: boolean = false;
  @Input() payload: UserSchema | null = null;

  @Output() submited = new EventEmitter<UserSchema>();
  @Output() restored = new EventEmitter();
  @Output() changePicture = new EventEmitter<string>();

  userForm: FormGroup;
  listErros: string[] = [];
  countrys = Object.values(CountrysList);

  constructor(private fb: FormBuilder, private dates: DatesService) {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator]],
      phone: ['', [Validators.required, this.phoneValidator]],
      picture: ['', Validators.pattern('(http|https)://.+')],
      location: this.fb.group({
        street: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        timezone: ['', Validators.required],
      }),
    });

    const pictureControl = this.userForm.get('picture');
    if (pictureControl) {
      pictureControl.valueChanges.subscribe((newValue) => {
        this.changePicture.emit(newValue);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['payload'] && changes['payload'].currentValue) {
      this.fetchUser();
    }

    if (this.disabledEmail) {
      this.userForm.get("email")?.disable();
    }
  }

  formatDate(date: string, iso= false) {
    if (!date)
      return "";

    const newDate = new Date(date);

    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = (newDate.getFullYear()).toString();
    const hour = newDate.getHours().toString().padStart(2, '0');
    const min = newDate.getMinutes().toString().padStart(2, '0');
    const sec = newDate.getSeconds().toString().padStart(2, '0');

    return iso 
      ? `${year}-${month}-${day}T${hour}:${min}:${sec}.000Z`
      : `${day}/${month}/${year}`;
  }

  fetchUser() {
    if (this.payload) {
      const birthDay = this.dates.formDate(this.payload.dateOfBirth);      

      this.userForm.patchValue({
        ...this.payload,
        dateOfBirth: birthDay,
      });
    }
  }

  restoreUser() {
    this.restored.emit(true);
  }

  dateOfBirthValidator(control: any) {
    const date = new Date(control.value);
    if (isNaN(date.getTime())) {
      return { invalidDateOfBirth: true };
    }
    return null;
  }

  phoneValidator(control: string) {
    return null;
  }

  checkMaxLength(key: string, max: number) {
    const control = this.userForm.get(key);
    
    if (control && control.value.length > max) {
      const errorIndex = this.listErros.findIndex(item => item === key);
      if (errorIndex < 0)
        this.listErros.push(key);
      return true;
    } else {
      const errorIndex = this.listErros.findIndex(item => item === key);
      if (errorIndex >= 0)
        this.listErros.splice(errorIndex, 1);
      return false;
    }
  }

  checkDifLength(key: string, max: number) {
    if (this.checkMaxLength(key, max)) {
      const diff = this.userForm.get(key)?.value.length - max;
      return `Inserido ${diff} acima do limite ${max}`;
    }
    return "";
  }

  onSubmit() {
    const formData = this.userForm.value;
    const birthDayIso = this.dates.formDateIso(formData.dateOfBirth);
    const payload = {
      ...formData,
      dateOfBirth: birthDayIso,
    };

    if (this.userForm.valid) {
      this.submited.emit(payload);
    }
    console.log("valid", this.userForm.valid);
    console.log("form", payload);
  }
}
