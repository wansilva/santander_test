import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';
import { ErrorMessages } from 'src/app/utils/errors/error-messages.service';
import { UserSchema } from 'src/app/schemas/user.schema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userId: string | null = null;
  user: UserSchema | null = null;
  loading: boolean = true;
  loadingPage: boolean = false;
  disabledEmail: boolean = true;

  picture: string = "";

  iconNoImage = "assets/icons/black/no-image.png";
  iconBack = "assets/icons/black/arrow-line-left.png";
  imageLoading = "assets/images/loading.gif";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private toast: ToastrService,
    private errors: ErrorMessages,
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });

    this.fetchUser();
  }

  fetchUser() {
    if (this.userId) {
      this.userService.fetchUserById(this.userId)
      ?.subscribe({
        next: (result: UserSchema) => {
          this.user = result;
          this.picture = result.picture;
          this.loading = false;
        },
        error: () => {
          this.toast.error("ID de usuário não encontrado")
          .onHidden.subscribe(() => this.goToBack()); 
        }
      })
    }
  }

  async updateUser(form: UserSchema) {
    this.loadingPage = true;

    const now = new Date();
    const payload: UserSchema = {
      ...form,
    }

    if (this.userId) {
      payload.id = this.userId;
    }

    if (this.user) {
      payload.registerDate = this.user.registerDate;
      payload.updatedDate = now.toISOString();
    }

    if (this.userId) {
      this.userService.updateUser(this.userId, payload)
        .subscribe({
          next: () => {
            this.fetchUser();
            this.loadingPage = false;
            this.toast.success("As alterações foram salvas!");
          },
          error: (error) => {
            this.loading = false;
            this.toast.error(this.errors.messages(error?.error?.data))
          }
        });
    }
  }

  restoreUser() {
    this.loading = true;
    this.fetchUser();
  }

  changePicture(url: string) {
    this.picture = url;
  }

  goToBack(): void {
    this.router.navigate(["users"]);
  }
}
