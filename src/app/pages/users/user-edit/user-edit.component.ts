import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';
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
  disabledEmail: boolean = true;

  picture: string = "";

  iconNoImage = "assets/icons/black/no-image.png";
  iconBack = "assets/icons/black/arrow-line-left.png";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private toast: ToastrService,
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });

    await this.fetchUser();
  }

  async fetchUser() {
    try {
      if (this.userId) {
        this.userService.fetchUserById(this.userId)
        ?.subscribe((result: UserSchema) => {
          this.user = result;
          this.picture = result.picture;
          console.log("result", result);
          this.loading = false;
        });
      } else {
        this.toast.error("Ops!", "ID de usuário não encontrado")
          .onHidden.subscribe(() => this.goToBack()); 
      }
    } catch (error) {
      this.loading = false;
      this.toast.error("Ops!", "Não foi possível carrerar a lista")
    }
  }

  async updateUser(form: UserSchema) {
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
      console.log("user")
      this.userService.updateUser(this.userId, payload)
        .subscribe((result) => {
          console.log("result", result);
          this.fetchUser();
        });
    }

    console.log("form", form);
    console.log("payload", payload);
  }

  changePicture(url: string) {
    this.picture = url;
  }

  goToBack(): void {
    this.router.navigate(["users"]);
  }
}
