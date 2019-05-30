import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, COMPOSITION_BUFFER_MODE} from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { NotificationComponent } from '../../../notification.component';
import { LocalStorage, SessionStorage, WebstorableArray } from 'ngx-store';

import Project from '../../../model/project.model';
import ItemList from '../../../model/itemlist.model';
import Material from '../../../model/material.model';

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css'],
  providers: [NotificationComponent]
})
export class PackingComponent implements OnInit {

  @SessionStorage() list: WebstorableArray<ItemList> = <any>[];
  @SessionStorage({key: 'projectfull_packing'}) project: string = '';
  @SessionStorage({key: 'project_packing'}) projectName: string = '';
  @SessionStorage({key: 'order_packing'}) orderCode: string = '';

  showCard1:   boolean = true;
  showCard2:   boolean = false;
  showForm1:   boolean = true;
  showForm2:   boolean = false;
  editP:       boolean = false;
  editO:       boolean = false;
  projects:    Project[] = [];
  materials:   Material[] = [];
  created_at:  Date = new Date();
  punchlist = [];

  form1:      FormGroup;
  form2:      FormGroup;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private authService:  AuthService,
              public notification: NotificationComponent,
              private router: Router) {
       
              }

  ngOnInit() {

    this.projectService.getProjects()
    .subscribe(res => {
        this.projects = res;
    });

    this.projectService.getMaterials()
    .subscribe(res => {
        this.materials = res;
    });

    if(this.projectName != '') {
      
      this.createForm2();

      this.showForm1 = false
      this.showForm2 = true;

    } else {
      this.createForm1()
    }
    

  }

  createForm1() {
    this.form1 = this.formBuilder.group({
        project:      ['', Validators.required ],
        order:        ['', Validators.required]
    })
  }

  createForm2() {
    this.form2 = this.formBuilder.group({
        line:      ['', Validators.required ],
        quantity:  ['', Validators.required],
        material:  ['', Validators.required]
    })
  }

  addOrder() {

    this.orderCode   = this.form1.value.order

    var str      = this.form1.value.project
    this.project = str
    var res      = str.split("|")

    this.projectName = res[1]

    this.projectService.validOrder(this.orderCode, 'packing')
    .subscribe(res => {
        if(res == "valid") {

          this.notification.showErrors = false;
          this.notification.showNotices = false;

          this.createForm2();

          this.showForm1 = false
          this.showForm2 = true

        } else {

          this.notification.showErrors = true;
          this.notification.errors = "The order number already exists. Try with another number";

        }
    });

  }

  addLine() {

    let item = new ItemList()

    var str   = this.form2.value.material
    var res   = str.split("|")

    item.line         = this.form2.value.line
    item.material     = res[0]
    item.materialDesc = res[1]
    item.quantity     = this.form2.value.quantity

    this.list.push(item)

    this.list.save()

    this.createForm2()
    
  }

  delete(index) {
    if(confirm("Are you sure to delete?")) {

      this.list.splice(index,1)
      this.list.save()

    }
  }

  editProject() {

    if(this.editP) {

      var str          = this.form1.value.project
      this.project     = str
      var res          = str.split("|")
      this.projectName = res[1]
      this.editP       = false

    } else {

      this.form1 = this.formBuilder.group({
        project: [ this.project, Validators.required ],
        order:   [ this.orderCode ]
      })
      this.editP = true

    }

  }

  editOrder() {

    if(this.editO) {

      if(this.form1.value.order != this.orderCode) {

        this.projectService.validOrder(this.form1.value.order, 'packing')
        .subscribe(res => {
            if(res == "valid") {

              this.notification.showErrors = false;
              this.orderCode               = this.form1.value.order
              this.editO                   = false

            } else {

              this.form1 = this.formBuilder.group({
                project: [ this.project ],
                order:   [ '', Validators.required ]
              })

              this.notification.showErrors = true;
              this.notification.errors     = "The order number already exists. Try with another number";

            }
        });

    } else {
      this.notification.showErrors = false
      this.editO                   = false
    }    

    } else {

      this.form1 = this.formBuilder.group({
        project: [ this.project ],
        order:   [ this.orderCode, Validators.required ]
      })
      this.editO = true

    }

  }

  finishOrder() {

    if(confirm("Are you sure to save the Packing List? Be aware, this action cannot be undone")) {

      var str = this.project
      var res = str.split("|")

      var projectId = res[0]

      var params = {
        projectId:    projectId,
        orderNumber:  this.orderCode,
        packingList:  this.list,
        officeId:     this.authService.id,
        packingDate:  this.created_at
      }

      this.projectService.saveList(params)
        .subscribe(res => {
         
          if (res === undefined) {
              this.notification.showErrors = true;
              this.notification.errors = 'Unexpected error occurs in server. Contact support';
          } else if(res.status == '500') {
              this.notification.showErrors = true;
              this.notification.errors = res.message;
          } else if(res.status == '200') {
            this.showCard1 = false
            this.showCard2 = true
            if(res.data == 'missing') {     
              this.notification.showErrors = true;
              this.notification.errors = 'El Delivery List no esta disponible para verificar automaticamente. Debe esperar hasta que se registre.';             
            } else if(res.data.lenght) {
              this.punchlist = res.data
            } else {
              this.router.navigate(['/thankyou']);
            }
            sessionStorage.clear();
          } else {
              this.notification.showErrors = true;
              this.notification.errors = res;
          }

      });


    }
    
  }

  keyPress(event: any) {

    var current = this.form1.value.order;
    const pattern = /^[a-z0-9]+$/i;
    const inputChar = String.fromCharCode(event.charCode);

    if (pattern.test(inputChar)) {    
      current = current + String.fromCharCode(event.which).toUpperCase();
      //console.log(this.orderCode) /^[a-z0-9]+$/i

      this.form1 = this.formBuilder.group({
        project:      [this.form1.value.project, Validators.required ],
        order:        [current, Validators.required]
      })

      event.preventDefault();

    }

  }

}