import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { NgProgress } from '@ngx-progressbar/core';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { NotificationComponent } from '../notification.component';
import { Subject } from 'rxjs';
import Role from '../model/role.model';
import Company from '../model/company.model';
import Project from '../model/project.model';
import User from '../model/user.model';

@Component({
  selector: 'view-users',
  templateUrl: 'view-users.component.html',
  providers: [NotificationComponent]
})
export class ViewUsersComponent implements OnInit {
    
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
  
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    form:         FormGroup;
    editUser:     User;
    roles:        Role[];
    companies:    Company[];
    projects:     Project[];
    list:         User[];
    editForm:     boolean = false;

    constructor(private formBuilder: FormBuilder, 
                private auth: AuthService,
                private userService: UserService,
                public notification: NotificationComponent,
                private activatedRoute: ActivatedRoute,
                public projectService: ProjectService,
                public progress: NgProgress) {

    }

    startLoading() {
        this.progress.start();
    }

    completeLoading() {
        this.progress.complete();
    }
         
  ngOnInit() {

    this.startLoading();

    this.userService.getRoles()
        .subscribe(res => {
            this.roles = res;
    });

    this.userService.getCompanies()
        .subscribe(res => {
            this.companies = res;
    });

    this.projectService.getProjects()
    .subscribe(res => {
        this.projects = res;
    });

    this.userService.getAllUsers()
        .subscribe(res => {
          setTimeout(() => {
            this.list = res;
            this.dtTrigger.next();
            this.completeLoading();
          }, 100);  
          
    });

  }

  toUpdateUser(id) {
    this.userService.getUser(id)
    .subscribe(res => {
        this.editUser = res;
        this.createForm()
        this.editForm = true
    });

    this.notification.showErrors = false;
    this.notification.showNotices = false;

    window.scrollTo(0, 0);
  }

  createForm() {

    //console.log(this.editUser)

    let fname   = ''
    let lname   = ''
    let email   = ''
    let role    = ''
    let company = ''
    let project = ''
    let salary: Number  = 0

    if (this.editUser) {

        fname   = this.editUser.fname
        lname   = this.editUser.lname
        email   = this.editUser.email
        salary  = this.editUser.salary
        role    = this.editUser.role
        company = this.editUser.company
        project = this.editUser.project

    }

    fname

    this.form = this.formBuilder.group({
        _id:             [this.editUser._id],
        fname:           [fname, Validators.required],
        lname:           [lname, Validators.required],
        email:           [email, Validators.required],
        salary:          [salary, Validators.required],
        role:            [role, Validators.required],
        company:         [company, Validators.required],
        project:         [project, Validators.required]
    });

  }

  hideForm() {
    this.editForm = false
  }

  rebuildForm(cleanNotices = true) {
    this.form.reset();
    this.form.get('company').setValue('');
    this.form.get('role').setValue('');
    this.form.get('project').setValue('');
    this.notification.showErrors = false;
    if(cleanNotices) this.notification.showNotices = false;
  }

  onSubmit() {

  }

  submit() {

    this.userService.update(this.form.value)
        .subscribe(res => {
            
        if (res === undefined) {
            this.notification.showErrors = true;
            this.notification.errors = 'Unexpected error occurs in server. Contact support';
        } else if(res.status == '500') {
            this.notification.showErrors = true;
            this.notification.errors = res.message;
        } else if(res.status == '200') {
            this.notification.showErrors = false;
            this.notification.showNotices = true;
            this.notification.notices = 'User updated successfully';

            this.userService.getAllUsers()
                .subscribe(res => {
                    this.list = res;
                    this.rerender()     
            });

        } else {
            this.notification.showErrors = true;
            this.notification.errors = res;
        }

    });

}

rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}