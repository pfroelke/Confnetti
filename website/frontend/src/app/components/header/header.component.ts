import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // currentUser: User;
  isAuthenticated = false;
  showLoginForm = false;

  constructor() {}

  // constructor(private userService: UserService) {
  //   userService.currentUser.subscribe(user => this.updateUser(user));
  //   userService.isAuthenticated.subscribe(b => (this.isAuthenticated = b));
  // }

  ngOnInit(): void {}

  // updateUser(user: User) {
  //   this.currentUser = user;
  // }
}
