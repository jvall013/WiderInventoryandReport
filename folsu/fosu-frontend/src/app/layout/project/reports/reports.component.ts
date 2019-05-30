import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../../services/report.service';
import { ProjectService } from '../../../services/project.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

  list     = [];
  columns  = [];
  title:     string;
  row      = [];
  type:      Number;
  color = 'blue';

  names = [{"id": 1,"first_name": "Jason","last_name": "Martin"}, 
     {"id": 2,"first_name": "Douglas","last_name": "Holmes"}, 
     {"id": 3,"first_name": "Randy","last_name": "Woods"}, 
     {"id": 4,"first_name": "Thomas","last_name": "Castillo"}, 
     {"id": 5,"first_name": "Ryan","last_name": "Butler"}, 
     {"id": 6,"first_name": "Jose","last_name": "Turner"}, 
     {"id": 7,"first_name": "Carl","last_name": "Taylor"}, 
     {"id": 8,"first_name": "Brandon","last_name": "Mendoza"}, 
     {"id": 9,"first_name": "Willie","last_name": "Ross"}, 
     {"id": 10,"first_name": "Howard","last_name": "Montgomery"}]

  public value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel dui '
                  +'at sem placerat dictum dictum placerat est. Mauris pretium mattis nulla '
                  + 'vel suscipit.Vestibulum laoreet congue erat, eget bibendum justarius id'; 

  constructor(private reportService: ReportService,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private _location: Location,
              public progress: NgProgress) { 

  }

  startLoading() {
    this.progress.start();
  }

  completeLoading() {
    this.progress.complete();
  }

  ngOnInit() {

    this.type = parseInt(this.activatedRoute.snapshot.paramMap.get('type'))

    if(this.type == 1) {

        this.reportService.getDeliveredMaterials(this.projectService.getCurrentProject())
        .subscribe(res => {
          
            this.list = res
            this.row     = ["materialDescription", "quantity"]
            this.columns = ["#", "Material", "Quantity"]
            this.title   = "Material delivered"
            
        });

    } else if(this.type == 2) {

        this.reportService.getDiffWithPlannedList(this.projectService.getCurrentProject())
        .subscribe(res => {
          
            this.list = res
            this.row     = ["materialDescription", "planned", "delivered", "diff"]
            this.columns = ["#", "Material", "Planned", "Delivered", "Missing"]
            this.title   = "Diference between Planned and Delivered"
            
        });

    }

  }

  backClicked() {
    this._location.back();
  }

}