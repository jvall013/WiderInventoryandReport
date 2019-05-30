import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import User from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationComponent } from '../notification.component';

@Component({
  selector: 'login',
  template: `
  <div class="card" style="max-width: 30rem;">
    <div class="card-body">
        <h5 class="card-title">Login</h5>
        <div *ngIf="notification.showNotices" class="alert alert-success">{{ notification.notices }}</div>
        <div *ngIf="notification.showErrors" class="alert alert-danger">{{ notification.errors }}</div>
        <form>
        <div class="form-group">
            <input [(ngModel)]="loginData.email" name="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
            <input [(ngModel)]="loginData.password" name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <button (click)="login()" type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
  </div>
  `,
  providers: [NotificationComponent]
})

export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute, public notification: NotificationComponent) { }

  loginData = new User();

  ngOnInit() {

    if(this.activatedRoute.snapshot.paramMap.get('status') == 'fail') {
      this.notification.showErrors = true;
      this.notification.errors = 'Login fail. User or password incorrect';
    } else if(this.activatedRoute.snapshot.paramMap.get('status') == 'serverfail') {
      this.notification.showErrors = true;
      this.notification.errors = 'Error getting user from server. Contact support';
    }
      
  }

  login() {
        this.auth.login(this.loginData);
  }

}
