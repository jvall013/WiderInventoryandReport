import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { NotificationComponent } from '../notification.component';
import Role from '../model/role.model';
import Company from '../model/company.model';
import Project from '../model/project.model';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  providers: [NotificationComponent]
})
export class RegisterComponent implements OnInit {
    
    form:      FormGroup;
    roles:     Role[];
    companies: Company[];
    projects:  Project[];

    constructor(private formBuilder: FormBuilder, 
                private auth: AuthService,
                private userService: UserService,
                public notification: NotificationComponent,
                public projectService: ProjectService) { 
        this.createForm();
    }
        
  ngOnInit() {

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

  }

  createForm() {
    this.form = this.formBuilder.group({
        fname:           ['', Validators.required ],
        lname:           ['', Validators.required],
        email:           ['', [Validators.required, Validators.email]],
        password:        ['', Validators.required],
        salary:          ['', Validators.required],
        role:            ['', Validators.required],
        //confirmPassword: [''],
        company:         ['', Validators.required],
        project:         ['', Validators.required]
    }, 
    //{ validator: matchingFields('password', 'confirmPassword')}
    );
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

    this.auth.register(this.form.value)
        .subscribe(res => {
            
        if (res === undefined) {
            this.notification.showErrors = true;
            this.notification.errors = 'Unexpected error occurs in server. Contact support';
        } else if(res.status == 'error') {
            this.notification.showErrors = true;
            this.notification.errors = res.message;
        } else if(res._id != '') {
            this.notification.showErrors = false;
            this.notification.showNotices = true;
            this.notification.notices = 'User created successfully';
            this.rebuildForm(false);
        } else {
            this.notification.showErrors = true;
            this.notification.errors = res;
        }

    });

}

}

function matchingFields(field1, field2) {
    return form => {
        if (form.controls[field1].value !== form.controls[field2].value)
            return { mismatchedFields: true }
    }
}
