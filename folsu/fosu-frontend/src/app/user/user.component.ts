import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationComponent } from '../notification.component';
import { UserService } from '../services/user.service';
import User from '../model/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [NotificationComponent]
})
export class UserComponent implements OnInit {

  user: User;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public notification: NotificationComponent,
              private userService: UserService,
              public progress: NgProgress) {

              }

startLoading() {
    this.progress.start();
}

completeLoading() {
    this.progress.complete();
}

  ngOnInit() {

    // Init progress bar
    this.startLoading();

    this.userService.getCurrentUser()
            .subscribe(res => {
                setTimeout(() => {
                    this.user = res.data
                    this.createForm();
                    // End the progress bar
                    this.completeLoading();
                  }, 100);
            }, err => {
                this.notification.showErrors = true;
                this.notification.errors = "Error getting the user";
            })

            this.createForm();
  }

  createForm() {

    let id = ''
    let fname = ''
    let lname = ''
    let email = ''

    if (this.user) {

        id        = this.user._id
        fname     = this.user.fname
        lname     = this.user.lname
        email     = this.user.email

    }

    this.form = this.formBuilder.group({
        _id:          [id],
        fname:        [fname, Validators.required],
        lname:        [lname, Validators.required],
        email:        [email, Validators.required]
    });

  }

  editProfile() {

    alert("You cannot modify your profile now, wait until be available")

    /*this.notification.showErrors = false;
    this.notification.showNotices = false;

    this.userService.update(this.form.value)
      .subscribe(res => {

      if (res === undefined) {
          this.notification.showErrors = true;
          this.notification.errors = 'Unexpected error occurs in server. Contact support';
      } else if(res.status == '500') {
          this.notification.showErrors = true;
          this.notification.errors = res.message;
      } else if(res.data._id != '') {
          this.notification.showErrors = false;
          this.notification.showNotices = true;
          this.notification.notices = 'Profile updated successfully';
      } else {
          this.notification.showErrors = true;
          this.notification.errors = res;
      }

    });*/
  }

}
