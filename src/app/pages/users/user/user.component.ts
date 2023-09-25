import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';
import { UserPreviewSchema } from 'src/app/schemas/user.schema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: string | null = null;
  user: UserPreviewSchema | null = null;
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private toast: ToastrService,
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
    try {
      if (this.userId) {
        this.userService.fetchUserById(this.userId)
        ?.subscribe((result: UserPreviewSchema) => {
          this.user = result;
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
}
