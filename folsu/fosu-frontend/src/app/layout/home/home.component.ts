import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role: string = 'You must login to see your credentials'

  constructor(public auth: AuthService) { }

  ngOnInit() {

    if(this.auth.isAuthenticated)
      this.role = this.auth.role

  }

}
