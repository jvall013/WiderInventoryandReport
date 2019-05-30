import { Component, OnInit, Input } from '@angular/core';

import { NgProgress } from '@ngx-progressbar/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationComponent } from '../../../notification.component';
import { ActivityService } from '../../../services/activity.service';
import { ProjectService } from '../../../services/project.service';
import { TimelineService } from '../../../services/timeline.service';
import { ActivatedRoute } from '@angular/router';

import Activity from '../../../model/activity.model';
import Project from '../../../model/project.model';
import Timeline from '../../../model/timeline.model';

import * as moment from 'moment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [NotificationComponent]
})
export class TimelineComponent implements OnInit {

  floors: Number = 0;
  floor: Number = 0;
  numbers = [];
  expectedBegin: string = '';
  expectedEnd: string = '';
  activities: Activity[];

  form: FormGroup;
  projectId: string;
  project: Project;
  timelineByFloors = [];
  show: boolean[] = [];
  hideNew: boolean[] = [];


  constructor(public progress: NgProgress,
              public notification: NotificationComponent,
              public activityService: ActivityService,
              public projectService: ProjectService,
              public timelineService: TimelineService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) { }

  startLoading() {
    this.progress.start();
  }

  completeLoading() {
      this.progress.complete();
  }

  ngOnInit() {

    this.startLoading();

    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');

    this.projectService.getProject(this.projectId)
      .subscribe(res => {

        this.project = res

        this.floors = res.floors;
        this.numbers = Array(this.floors).fill(0).map((x,i)=>i);

        if(!res.expectedBegin)
          this.expectedBegin = ""
        else
          this.expectedBegin = res.expectedBegin.toString()

        for (var _i = 0; _i < this.numbers.length; _i++) {
            this.numbers[_i] = this.numbers[_i] + 1
            this.show.push(false)
            this.hideNew.push(false)
        }

    })

    this.activityService.getActivities()
        .subscribe(res => {
          
          this.activities = res
               
    });

    this.timelineService.getTimelineByProject(this.projectId)
      .subscribe(response => {

        this.timelineByFloors = response
        this.getFinishDate()
        this.completeLoading()

      })

    this.createForm()

  }

  addActivity(floor) {

    let params = {
      projectId: this.projectId,
      floor: floor,
      activity: this.form.value
    }

    this.timelineService.addActivity(params)
      .subscribe(res => {
        
        this.timelineByFloors[floor -1] = res.data
        this.rebuildForm()

        this.getFinishDate()

      })
 
  }

  showForm(floor) {
    this.rebuildForm()
    this.floor = floor

    for (var i = 0; i < this.floors; i++) {
      this.show[i]    = false
      this.hideNew[i] = false
    }

    this.show[floor - 1] = true
    this.hideNew[floor -1] = true
  }

  hideForm(floor) {
    this.rebuildForm()

    this.show[floor - 1] = false
    this.hideNew[floor - 1] = false
  }

  createForm() {

    this.form = this.formBuilder.group({
        activity:     ['', Validators.required ],
        duration:     ['', Validators.required]
    })

  }

  rebuildForm() {
    this.form.reset();
    this.form.get('activity').setValue('');
  }

  delete(timelineId, floor, act) {
    if(confirm("Are you sure to delete?")) {

      let params = {
        timelineId: timelineId,
        activity: act
      }

      this.timelineService.deleteActivity(params)
      .subscribe(res => {
        
        this.timelineByFloors[floor -1] = res.data

        this.getFinishDate()

      })

    }
  }

  getFinishDate() {

    let days = 0

    for (let entry of this.timelineByFloors)
      for (let timeline of entry.timeline) {
        days += timeline.duration
      }

    // To count the beginnig day
    days -= 1
    this.expectedEnd = this.addWeekdays(this.expectedBegin, days)

  }

  addWeekdays(date, days) {

    date = moment(date); // use a clone
    while (days > 0) {
      date = date.add(1, 'days');
      // decrease "days" only if it's a weekday.
      //if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
      // decrease "days" only if it's a Sunday.
      if (date.isoWeekday() !== 7) {
        days -= 1;
      }
    }
    return date;
  }

}
