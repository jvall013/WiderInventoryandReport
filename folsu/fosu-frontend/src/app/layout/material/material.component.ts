import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NgProgress } from '@ngx-progressbar/core';
import { NotificationComponent } from '../../notification.component';
import { MaterialService } from '../../services/material.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Material from '../../model/material.model';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  providers: [NotificationComponent]
})
export class MaterialComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  form:         FormGroup;
  materialId:   string;
  editMaterial: Material;
  list:         Material[];
  formType =    "new";
  dtTrigger: Subject<any> = new Subject();

  constructor(private formBuilder: FormBuilder, 
              private MaterialService: MaterialService,
              public notification: NotificationComponent,
              private activatedRoute: ActivatedRoute,
              public progress: NgProgress) { }

  startLoading() {
      this.progress.start();
  }

  completeLoading() {
      this.progress.complete();
  }

  ngOnInit() {

    // Init progress bar
    this.startLoading();

    this.MaterialService.getMaterials()
        .subscribe(res => {
          setTimeout(() => {
            this.list = res;
            this.dtTrigger.next();
            this.completeLoading();
          }, 100);  
          
    });

    this.materialId = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.materialId) {

        //this.formTitle = "Edit"
        this.formType = "edit";
        /*this.projectService.getProject(this.projectId)
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
            })*/
        //this.createForm();

    } else {
        //this.formTitle = "New"
        this.createForm();
        this.completeLoading();
        
    }

  }

  createForm() {

    let description = ''

    if (this.materialId) {

        description = this.editMaterial.description

    }
  
    this.form = this.formBuilder.group({
        _id:          [this.materialId],
        description:  [description, Validators.required]
    });

  }

  rebuildForm(cleanNotices = true) {
    this.form.reset();
    this.notification.showErrors = false;
    if(cleanNotices) this.notification.showNotices = false;
  }

  submit() {

    this.MaterialService.create(this.form.value)
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
            this.notification.notices = 'Material created successfully';

            this.list = res.data;
            this.rerender();

            this.rebuildForm(false);
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
