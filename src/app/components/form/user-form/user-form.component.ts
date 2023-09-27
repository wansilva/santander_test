import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSchema } from 'src/app/schemas/user.schema';
import { CountrysList } from 'src/app/schemas/countrys.enum';
import { DatesService } from 'src/app/utils/dates/dates.service';
import { Masks } from 'src/app/utils/masks/masks.service';

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
  listErrors: string[] = [];
  countrys = Object.values(CountrysList);
  loading = false;
  timezone: string = "";

  constructor(
    private fb: FormBuilder,
    private dates: DatesService,
    private cdr: ChangeDetectorRef,
    private mask: Masks,
  ) {
    this.userForm = this.fb.group({
      title: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator]],
      phone: ['', [Validators.required, this.phoneValidator]],
      picture: ['', [Validators.required, Validators.pattern('(http|https)://.+')]],
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
    if (this.loading)
      return false;

    const control = this.userForm.get(key);
    if (control && control.value.length > max) {
      const errorIndex = this.listErrors.findIndex(item => item === key);
      if (errorIndex < 0)
        this.listErrors.push(key);
      return true;
    }
    return false;
  }

  checkDifLength(key: string, max: number) {
    if (this.loading)
    return "";

    if (this.checkMaxLength(key, max)) {
      const control = this.userForm.get(key);
      if (control) {
        const diff = control.value.length - max;
        return `Inserido ${diff} acima do limite ${max}`;
      }
    }
    return "";
  }

  removeError(key: string) {
    const errorIndex = this.listErrors.findIndex(item => item === key);
    if (errorIndex >= 0)
      this.listErrors?.splice(errorIndex, 1);
  }

  checkForm() {
    const keys = [
      "firstName",
      "lastName",
      "email",
      "dateOfBirth",
      "phone",
      "picture",
      "location.street",
      "location.city",
      "location.state",
      "location.country",
    ];

    this.loading = true;

    let listErrors: string[] = keys;

    keys.forEach((key) => {
      const control = this.userForm.get(key);
      if (control) {
        if (control.valid) {
          this.removeError(key);
        }
      }
    });
    
    setTimeout(() => {
      this.listErrors = listErrors;
      this.loading = false;
    }, 1000);
  }

  changeCountry() {
    const control = this.userForm.get("location.country");

    if (control) {
      const [ country ] = this.countrys.filter(item => item.name === control.value);
      this.timezone = country.timezone;
      this.userForm.get("location.timezone")?.setValue(this.timezone);
    }
  }

  maskDate() {
    this.removeError("dateOfBirth");
    const control = this.userForm.get("dateOfBirth");

    if (control) {
      const inputValue = control.value.replace(/\D/g, '').substring(0, 8);
      const value = this.mask.date(inputValue);
      control.setValue(value);
    }
  }

  maskPhone() {
    this.removeError("phone");
    const control = this.userForm.get("phone");

    if (control) {
      const inputValue = control.value.replace(/\D/g, '').substring(0, 11);
      const value = this.mask.phone(inputValue);
      control.setValue(value);
    }
  }

  onSubmit() {
    const formData = this.userForm.value;
    const birthDayIso = this.dates.formDateIso(formData.dateOfBirth);
    const payload = {
      ...formData,
      dateOfBirth: birthDayIso,
      location: {
        ...formData.location,
        timezone: this.timezone,
      }
    };

    if (this.userForm.valid) {
      this.submited.emit(payload);
    } else {
      this.checkForm();
    }
  }
}
