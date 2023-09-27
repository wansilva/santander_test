import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';
import { UserSchema, UserGenderEnum, UserTitlesEnum } from 'src/app/schemas/user.schema';
import { ToastrService } from 'ngx-toastr';
import { DatesService } from 'src/app/utils/dates/dates.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: string | null = null;
  user: UserSchema | null = null;
  loading: boolean = true;
  loadingPage: boolean = false;

  picture: string = "";

  iconNoImage = "assets/icons/black/no-image.png";
  iconBack = "assets/icons/black/arrow-line-left.png";
  imageLoading = "assets/images/loading.gif";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private toast: ToastrService,
    private dates: DatesService,
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });

    await this.fetchUser();
  }

  goToBack(): void {
    this.router.navigate(["users"]);
  }

  goToAdd(): void {
    this.router.navigate(["users/add"]);
  }

  async fetchUser() {
    if (this.userId) {
      this.userService.fetchUserById(this.userId)
      ?.subscribe({
        next: (result: UserSchema) => {
          this.user = result;
          this.picture = result.picture;
          this.user.dateOfBirth = this.dates.formDate(result.dateOfBirth);
          this.user.gender = UserGenderEnum[result.gender as never];
          this.user.title = UserTitlesEnum[result.title as never];
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.toast.error("Não foi possível carrerar o usuário")
        }
      });
    } else {
      this.toast.error("ID de usuário não encontrado")
        .onHidden.subscribe(() => this.goToBack()); 
    }
  }
}
