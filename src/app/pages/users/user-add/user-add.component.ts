import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';
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
  ) {}

  async ngOnInit() {}

  changePicture(url: string) {
    this.picture = url;
  }

  async saveUser(form: UserSchema) {
    this.loadingPage = true;
    const now = new Date();
    const payload: UserSchema = {
      ...form,
      registerDate: now.toISOString(),
    };

    this.userService.createUser(payload)
    .subscribe((result) => {
      console.log("result", result);
      this.loadingPage = false;
      this.goToBack();
    });
  }

  goToBack(): void {
    this.router.navigate(["users"]);
  }

}
