import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { NgProgress } from '@ngx-progressbar/core';
import Project from '../../../model/project.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  projectId:     string;
  count:         Number;
  project:       Project;
  lastShipments = [];
  lastPackings  = [];
  users         = [];
  PROJECT_KEY   = 'CURRENT_PROJECT';
  
  constructor(private projectService: ProjectService, 
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

    // Init the loading bar
    this.startLoading();

    localStorage.removeItem(this.PROJECT_KEY);
    
    this.projectId = this.activatedRoute.snapshot.paramMap.get('projectid')
    localStorage.setItem(this.PROJECT_KEY, this.projectId);

    this.projectService.getNumMaterials(this.projectId)
        .subscribe(res => {
          
          if (res === undefined)
            this.count = 0;
          else
            this.count = res;
    });

    this.projectService.getLastShipments(this.projectId)
        .subscribe(res => {
          
          if (res)
            this.lastShipments = res
            
    });

    this.projectService.getLastPackings(this.projectId)
        .subscribe(res => {
          
          if (res)
            this.lastPackings = res
            
    });

    this.projectService.getUsersByProject(this.projectId)
        .subscribe(res => {
          
          if (res)
            this.users = res

          this.completeLoading();
            
    });
  }

}
