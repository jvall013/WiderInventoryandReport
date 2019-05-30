import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NgProgress } from '@ngx-progressbar/core';
import { NotificationComponent } from '../../notification.component';
import { MaterialService } from '../../services/material.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Activity from '../../model/activity.model';

@Component({
  selector: 'app-defaultactivities',
  templateUrl: './defaultactivities.component.html',
  styleUrls: ['./defaultactivities.component.css'],
  providers: [NotificationComponent]
})
export class DefaultactivitiesComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  form:         FormGroup;
  activityId:   string;
  editActivity: Activity;
  list:         Activity[];
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

  }

  createForm() {


  }

  rebuildForm(cleanNotices = true) {
    this.form.reset();
    this.notification.showErrors = false;
    if(cleanNotices) this.notification.showNotices = false;
  }

  submit() {


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
