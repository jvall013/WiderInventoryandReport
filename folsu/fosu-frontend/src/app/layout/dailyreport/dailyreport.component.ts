import { Component, 
         OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationComponent } from '../../notification.component';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { TimelineService } from '../../services/timeline.service';
import { UserService } from '../../services/user.service';
import { DailyReportService } from '../../services/daily-report.service';

import Project from '../../model/project.model';
import User from '../../model/user.model';
import * as moment from 'moment';

@Component({
  selector: 'app-dailyreport',
  templateUrl: './dailyreport.component.html',
  styleUrls: ['./dailyreport.component.css'],
  providers: [NotificationComponent]
})
export class DailyreportComponent implements OnInit {

  floors: Number = 0;
  floor: Number = 0;
  numbers = [];
  reportedAt: string = '';
  expectedEnd: string = '';
  cleanUsers: Array<any> = [];
  users: User[];
  numWorkers = 0;

  form: FormGroup;
  form_hours: FormGroup;
  form_date: FormGroup;
  editDate: boolean = false;

  projectId: string;
  project: Project;
  activitiesByFloor = [];
  reportByFloor = [];
  definitiveActivities = [];
  show: boolean[] = [];
  hideNew: boolean[] = [];

  //@ViewChild('someInput') someInput: ElementRef;

  constructor(public progress:           NgProgress,
              public notification:       NotificationComponent,
              public authService:        AuthService,
              public projectService:     ProjectService,
              public timelineService:    TimelineService,
              public userService:        UserService,
              public dailyReportService: DailyReportService,
              private formBuilder:       FormBuilder,
              private router:            Router) { }
              

  /*ngAfterViewInit() {
        this.someInput.nativeElement.value = this.users.length
  }*/

  startLoading() {
    this.progress.start();
  }

  completeLoading() {
      this.progress.complete();
  }

  ngOnInit() {

    this.startLoading();

    this.reportedAt = moment().format();

    this.projectId = "5b2a666befab1700ac305e98"

    this.userService.getUsersByProject(this.projectId)
      .subscribe(res => {
        
        this.users = res

    })

    this.projectService.getProject(this.projectId)
      .subscribe(res => {

        this.project = res

        this.floors = res.floors;
        this.numbers = Array(this.floors).fill(0).map((x,i)=>i);

        for (var _i = 0; _i < this.numbers.length; _i++) {
            this.numbers[_i] = this.numbers[_i] + 1
            this.show.push(false)
            this.hideNew.push(false)
            this.reportByFloor[_i] = [];
        }
        
    })

    this.timelineService.getActivitiesByFloor(this.projectId)
        .subscribe(res => {
          
          this.activitiesByFloor = res
               
    });

    setTimeout(() => {
      this.completeLoading();
    }, 1000);


    this.createForm()
    
  }

  addActivity(floor) {

    this.reportByFloor[floor - 1].push(this.form.value)

    this.rebuildForm()
    
  }

  showForm(floor) {

    this.rebuildForm()
    this.floor = floor

    for (var i = 0; i < this.floors; i++) {
      this.show[i]    = false
      this.hideNew[i] = false
    }

    this.show[floor - 1] = true
    this.hideNew[floor - 1] = true

  }

  hideForm(floor) {
    this.rebuildForm()

    this.show[floor - 1] = false
    this.hideNew[floor - 1] = false
  }

  createForm() {

    this.form = this.formBuilder.group({
        activity:     ['', Validators.required ],
        description:  ['', Validators.required]
    })

    this.form_hours = this.formBuilder.group({
      hours0:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description0:  [''],
      hours1:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description1:  [''],
      hours2:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description2:  [''],
      hours3:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description3:  [''],
      hours4:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description4:  [''],
      hours5:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description5:  [''],
      hours6:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description6:  [''],
      hours7:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description7:  [''],
      hours8:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description8:  [''],
      hours9:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description9:  [''],
      hours10:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description10:  [''],
      hours11:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description11:  [''],
      hours12:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description12:  [''],
      hours13:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description13:  [''],
      hours14:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description14:  [''],
      hours15:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description15:  [''],
      hours16:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description16:  [''],
      hours17:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description17:  [''],
      hours18:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description18:  [''],
      hours19:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description19:  [''],
      hours20:        ['', [Validators.required, Validators.pattern('^([0-9]){1,2}') ]],
      description20:  ['']
    })

    /*var group = {}
    var i = 0
    for (let user of this.users) {
      group['hours'+i] = ['', Validators.required ]
      group['description'+i] = ['']
      i += 1
    }

    this.form_hours = this.formBuilder.group(group)*/

  }

  editReportDate() {

    var res = this.reportedAt.split("T");

    this.form_date = this.formBuilder.group({
      reportDate:   [res[0], Validators.required ]
    })

    this.editDate = true
  }

  saveReportDate() {
    
    let dateJSON = this.form_date.value.reportDate
    var month    = dateJSON.month.toString()
    var day      = dateJSON.day.toString()

    if(month.length == 1)
      month = '0'+month

    if(day.length == 1)
      day = '0'+day

    let date = dateJSON.year + '-' + month + '-' + day + 'T10:00:00Z'
    this.reportedAt = date

    this.editDate = false

  }

  rebuildForm() {
    this.form.reset();
    this.form.get('activity').setValue('');
  }

  delete(floor, act) {
    
  }

  sendReport() {

    var valid = this.validateReport()

    if(!valid) {
      
      this.notification.showErrors = true;
      this.notification.errors = 'Debe ingresar las horas de todos los empleados';

    } else if(valid === 1) {

      this.notification.showErrors = true;
      this.notification.errors = 'Debe ingresar una OBSERVACION si las horas son distintas a 10';
      
    } else if(valid === 2) {

      this.notification.showErrors = true;
      this.notification.errors = 'Debe ingresar al menos una actividad en el reporte';

    } else {
  
      this.notification.showErrors = false;

      if(!this.definitiveActivities.length) {
        this.buildDataToSend()
      }

      let report = {
        project: this.projectId, 
     reportedAt: this.reportedAt,
      createdAt: this.reportedAt,
      createdBy: this.authService.id,
     activities: this.definitiveActivities,
          hours: this.cleanUsers
      }

      this.dailyReportService.create(report)
        .subscribe(res => {

          if(res.status === 200) {
            this.router.navigate(['/thankyou/2'])
          } else if(res.status === 500) {
            this.notification.showErrors = true;
            this.notification.errors = 'Ocurrio un error grave, debe contactar a soporte';
          }

        })

    }
  }

  buildDataToSend() {

    /** Building a clean activities array to send */
    let index = 0
    for (let floor of this.reportByFloor) {
      if(floor.length) {

        for(let otherentry of floor) {

          let aux = {
            floor: index + 1,
            activity: otherentry.activity,
            description: otherentry.description
          }

          this.definitiveActivities.push(aux)

        }
        
      }

      index++
    }


    /** Building a clean users with hours array to send */
    var to = this.users.length
    var i = 0
    let hour: Number = 0

    for (const prop in this.form_hours.value) {
      if(i < to) {
        if(prop.substring(0, 5) === 'hours') {

          hour = this.form_hours.value[prop]

          let auxUser = {
            user: this.users[i]._id,
            hours: hour
          }

          if(hour != 10 && this.form_hours.value['description' + i] !== '') {
            Object.defineProperty(auxUser, 'observations', {
              value: this.form_hours.value['description' + i],
              writable: true,
              enumerable: true,
              configurable: true
            });
          }

          this.cleanUsers.push(auxUser)

          i++
        }
      }
    }

  }

  validateReport() {

    let find = false
    for (let floor of this.reportByFloor) {
      if(floor.length) {
        find = true
      }
    }

    if(!find) {
      return 2
    }

    var to = this.users.length
    var i = 0
    let hour: Number = 0

    for (const prop in this.form_hours.value) {
      if(i < to) {
        if(prop.substring(0, 5) === 'hours') {

          if(isEmpty(this.form_hours.value[prop])) {
            return 0
          }

          //console.log('field: ' + this.form_hours.value[prop] + ' descripcion: ' + this.form_hours.value['description' + i])
          hour = this.form_hours.value[prop]

          if(hour != 10 && this.form_hours.value['description' + i] === '') {
            return 1
          }

          i++
        }
      }
    }

    return true

  }


}

function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}

