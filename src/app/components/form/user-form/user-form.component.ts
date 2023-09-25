import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSchema } from 'src/app/schemas/user.schema';
import { CountrysList } from 'src/app/schemas/countrys.enum';

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
  @Output() changePicture = new EventEmitter<string>();

  userForm: FormGroup;

  countrys = Object.values(CountrysList);

  constructor(private fb: FormBuilder) {
    console.log("disabled", this.disabledEmail);
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

  fetchUser() {
    if (this.payload) {
      this.userForm.patchValue(this.payload);
    }
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

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.submited.emit(formData);
    }
    console.log("valid", this.userForm.valid);
    // console.log("form", this.userForm.value);
  }
}
