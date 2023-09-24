import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(private userService: UsersService) {}

  ngOnInit(): void{
    this.userService.fetchUsers().subscribe((result) => {
      console.log("result", result);
    });
  }
}
