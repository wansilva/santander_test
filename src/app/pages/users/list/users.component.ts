import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';
import { ListUsersSchema } from 'src/app/schemas/common.schema';
import { UserPreviewSchema } from 'src/app/schemas/user.schema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading = true;
  list: UserPreviewSchema[] = [];
  listTotal: number = 0;
  limit: number = 10;
  page: number = 0;
  pages: number = 1;

  iconView = "assets/icons/black/eye-open.png";
  iconTrash = "assets/icons/black/trash.png";

  imageLoading = "assets/images/loading.gif";

  showDialogDeleteUser = true;
  selectedUserToDelete: string | null = null;
  messageDeleteUser: string = "";

  constructor(
    private userService: UsersService,
    private toast: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.userService.fetchUsers(this.page, this.limit)
      ?.subscribe((result: ListUsersSchema) => {
        this.list = result.data;
        this.listTotal = result.total;
        this.loading = false;
        console.log("result", result);
      });
    } catch (error) {
      this.loading = false;
      this.toast.error("Ops!", "Não foi possível carrerar a lista")
    }
  }

  async changePage(page: number) {
    this.page = page;
    console.log("page", page);
    this.loading = true;
    await this.fetchUsers();
  }

  showUser(id: string) {
    this.router.navigate(["users", id]);
  }

  isOdd(index: number): boolean {
    return index % 2 !== 0;
  }

  changeUserToDelete(id: string) {
    const [ user ] = this.list.filter((item) => item.id === id);
    const name = user ? `${user.firstName} ${user.lastName}` : "";

    console.log("id", id);
    console.log("user", user);

    this.selectedUserToDelete = id;
    this.messageDeleteUser = `Remover o usuário ${name}`;
    this.showDialogDeleteUser = true;
  }

  async confirmDeleteUser() {
    this.showDialogDeleteUser = false;
    if (this.selectedUserToDelete) {
      this.userService.deleteUser(this.selectedUserToDelete)
        .subscribe((result) => {
          console.log("result", result);
          this.cancelDeleteUser();
          this.fetchUsers();
        });
    }
  }

  cancelDeleteUser() {
    this.selectedUserToDelete = null;
    this.messageDeleteUser = "";
    this.showDialogDeleteUser = false;
  }
}
