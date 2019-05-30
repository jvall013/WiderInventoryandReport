import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { UserService } from '../../../services/user.service';
import { NotificationComponent } from '../../../notification.component';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import Company from '../../../model/company.model';
import Project from '../../../model/project.model';

@Component({
  selector: 'form-project',
  templateUrl: 'projectform.component.html',
  providers: [NotificationComponent]
})
export class ProjectFormComponent implements OnInit {
    
    form:        FormGroup;
    companies:   Company[];
    projectId:   string;
    formTitle:   string;
    editProject: Project;
    formType =   "new";

    constructor(private formBuilder: FormBuilder, 
                private projectService: ProjectService,
                private userService: UserService,
                public notification: NotificationComponent,
                private activatedRoute: ActivatedRoute,
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

    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.projectId) {

        this.formTitle = "Edit"
        this.formType = "edit";
        this.projectService.getProject(this.projectId)
            .subscribe(res => {
                setTimeout(() => {
                    this.editProject = res
                    this.createForm(this.projectId);
                    // End the progress bar
                    this.completeLoading();
                  }, 100);
            }, err => {
                this.notification.showErrors = true;
                this.notification.errors = "Error getting the project";
            })
        //this.createForm();

    } else {
        this.formTitle = "New"
        this.createForm();
        
    }

    this.userService.getCompanies()
        .subscribe(res => {
            this.companies = res;
            this.completeLoading();
    });

  }

  createForm(projectId = null) {

    let pcode     = ''
    let name      = ''
    let client    = ''
    let address   = ''
    let state     = ''
    let installer = ''
    let floors: Number = 0
    let expected: Date

    if (this.projectId) {

        pcode      = this.editProject.pcode
        name       = this.editProject.name
        client     = this.editProject.client
        address    = this.editProject.address
        state      = this.editProject.state
        installer  = this.editProject.installer._id
        floors     = this.editProject.floors
        expected   = this.editProject.expectedBegin

    }
  
    this.form = this.formBuilder.group({
        _id:           [projectId],
        pcode:         [pcode, Validators.required],
        name:          [name, Validators.required],
        client:        [client, Validators.required],
        address:       [address, Validators.required],
        state:         [state, Validators.required],
        installer:     [installer, Validators.required],
        floors:        [floors, Validators.required],
        expectedBegin: [expected]
    });

  }

  rebuildForm(cleanNotices = true) {
    this.form.reset();
    this.form.get('installer').setValue('');
    this.notification.showErrors = false;
    if(cleanNotices) this.notification.showNotices = false;
  }

  submit() {

    this.projectService.create(this.form.value)
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
            this.notification.notices = 'Project created successfully';
            this.rebuildForm(false);
        } else {
            this.notification.showErrors = true;
            this.notification.errors = res;
        }

    });

  }

  submitEdit() {

      this.notification.showErrors = false
      this.notification.showNotices = false

      let dateJSON = this.form.value.expectedBegin
      var month    = dateJSON.month.toString()
      var day      = dateJSON.day.toString()

      if(month.length == 1)
        month = '0'+month

      if(day.length == 1)
        day = '0'+day


      let date = dateJSON.year + '-' + month + '-' + day + 'T10:00:00Z'
      this.form.value.expectedBegin = date

      this.projectService.update(this.form.value)
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
            this.notification.notices = 'Project updated successfully';
        } else {
            this.notification.showErrors = true;
            this.notification.errors = res;
        }

    })
  }

}