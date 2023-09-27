import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';
import { ErrorMessages } from 'src/app/utils/errors/error-messages.service';
import { UserSchema } from 'src/app/schemas/user.schema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  userId: string | null = null;
  user: UserSchema | null = null;
  loading: boolean = true;
  loadingPage: boolean = false;
  disabledEmail: boolean = true;

  picture: string = "";

  iconNoImage = "assets/icons/black/no-image.png";
  iconBack = "assets/icons/black/arrow-line-left.png";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private toast: ToastrService,
    private errors: ErrorMessages,
  ) {}

  async ngOnInit() {}

  changePicture(url: string) {
    this.picture = url;
  }

  saveUser(form: UserSchema) {
    this.loadingPage = true;

    const now = new Date();
    const payload: UserSchema = {
      ...form,
      registerDate: now.toISOString(),
    };

    this.userService.createUser(payload)
    .subscribe({
      next: (result) => {
        this.loadingPage = false;
        this.toast.success("Usuário cadastrado!")
        this.goToBack();
      },
      error: (error) => {
        this.loadingPage = false;
        this.toast.error(this.errors.messages(error?.error?.data))
      }
    });
  }

  goToBack(): void {
    this.router.navigate(["users"]);
  }

}
