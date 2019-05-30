import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'nav-bar',
  template: `
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="#">Fosu</a>
  <button class="navbar-toggler hidden-sm-up" type="button" (click)="isNavbarCollapsed = !isNavbarCollapsed" data-target="#navbarsDefault" aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div *ngIf="auth.isAuthenticated" [ngbCollapse]="isNavbarCollapsed" class="collapse navbar-collapse" id="navbarsDefault">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown" ngbDropdown>
        <div style="cursor: pointer" class="nav-link dropdown-toggle" id="id01" ngbDropdownToggle>Users</div>
        <div class="dropdown-menu" aria-labelledby="id01" ngbDropdownMenu>
          <a class="dropdown-item" *ngIf="auth.isAuthenticated" routerLink="/register">Register</a>
          <a class="dropdown-item" href="#">TS</a>
          <a class="dropdown-item" href="#">JS</a>
        </div>
      </li>
      <li *ngIf="auth.isAuthenticated" class="nav-item">
          <a class="nav-link" routerLink="/admin">Admin</a>
      </li>
    </ul>
  </div>
      <span style="flex: 1 1 auto"></span>
      <ul class="navbar-nav mr-auto">
        <li *ngIf="!auth.isAuthenticated" class="nav-item">
          <a class="nav-link" routerLink="/login">Login</a>
        </li>
        <li *ngIf="auth.isAuthenticated" class="nav-item">
          <a class="nav-link" routerLink="/">Welcome, {{auth.name}}</a>
        </li>
        <li *ngIf="auth.isAuthenticated" class="nav-item">
          <a class="nav-link" style="cursor: pointer" (click)="auth.logout()">Logout</a>
        </li>
      </ul>
  </nav>
  `,
  styles: []
})
export class NavComponent implements OnInit {

  isNavbarCollapsed=true;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    // ...
  }

}
