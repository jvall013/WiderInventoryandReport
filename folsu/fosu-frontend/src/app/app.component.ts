import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <ng-progress></ng-progress>
    <app-sidebar></app-sidebar>
    <section class="main-container margin-responsive">
      <router-outlet></router-outlet>
    </section>
    `
})
export class AppComponent { }
