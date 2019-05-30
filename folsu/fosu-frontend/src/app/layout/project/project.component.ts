import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Subject } from 'rxjs';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  list: any;
  columns;
  row: Number;

  dtTrigger: Subject<any> = new Subject();

  constructor(private projectService: ProjectService, public progress: NgProgress) { 
    this.row = 0;
  }

  startLoading() {
    this.progress.start();
  }

  completeLoading() {
    this.progress.complete();
  }

  changeProgressColor() {
    this.progress.setConfig({ color: 'green' });
  }

  ngOnInit() {

    // Init the loading bar
    this.startLoading();

    //this.dtOptions = {
    //  pagingType: 'full_numbers',
    //  pageLength: 2
    //};

    this.columns = this.projectService.getColumnsListProjects();
    this.projectService.getProjects()
        .subscribe(res => {
          setTimeout(() => {
            this.list = res;
            this.dtTrigger.next();
            this.completeLoading();
          }, 100);  
          
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  delete(project) {
    console.log('Deleting project ', project)
  }

}
