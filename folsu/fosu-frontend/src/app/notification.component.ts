import { Component, OnInit } from '@angular/core';

@Component({
  selector: '',
  template: `
  `
})
export class NotificationComponent implements OnInit {

    notices: string;
    errors: string;
    public showErrors: boolean;
    public showNotices: boolean;

    constructor() {
        this.showErrors = false;
        this.showNotices = false;
    }

    ngOnInit() {
        // ...
    }

}