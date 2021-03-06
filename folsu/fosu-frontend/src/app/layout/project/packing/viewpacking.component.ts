import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SessionStorage, WebstorableArray } from 'ngx-store';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationComponent } from '../../../notification.component';
import { NgProgress } from '@ngx-progressbar/core';

import Project from '../../../model/project.model';
import Material from '../../../model/material.model';
import Item from '../../../model/item.model';

@Component({
  selector: 'view-packing',
  templateUrl: './viewpacking.component.html',
  providers: [NotificationComponent]
})
export class ViewPackingComponent implements OnInit {

  /*@SessionStorage() list: WebstorableArray<Item> = <any>[];
  @SessionStorage({key: 'projectfull_packing'}) project: string = '';
  @SessionStorage({key: 'project_packing'}) projectName: string = '';
  @SessionStorage({key: 'order_packing'}) orderCode: string = '';
  @SessionStorage({key: 'id_shipment'}) shipmentId: string = '';*/

  list: WebstorableArray<Item> = <any>[];
  project: string = '';
  projectName: string = '';
  orderCode: string = '';
  shipmentId: string = '';

  projects:    Project[] = [];
  materials:   Material[] = [];
  created_at:  Date = new Date();

  form1:      FormGroup;
  form2:      FormGroup;
  editP:      boolean = false;
  editO:      boolean = false;
  //list: ItemList[] = [];

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              public notification: NotificationComponent,
              private router: Router,
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

    this.startLoading();

    var id = this.activatedRoute.snapshot.paramMap.get('id')

    this.projectService.getPackingWithList(id)
    .subscribe(res => {
 
        this.shipmentId  = res.shipmentId
        this.projectName = res.project
        this.project     = res.projectId + '|' + res.project
        this.orderCode   = res.orderNumber
        this.list        = res.packingList

    });

    this.projectService.getProjects()
    .subscribe(res => {
        this.projects = res;
    });

    this.projectService.getMaterials()
    .subscribe(res => {
        this.materials = res;

        this.completeLoading();
    });

    this.createForm2()

  }

  createForm2() {
    this.form2 = this.formBuilder.group({
        line:      ['', Validators.required ],
        quantity:  ['', Validators.required],
        material:  ['', Validators.required]
    })
  }

  backClicked() {
    sessionStorage.clear();
    this._location.back();
  }

  addLine() {

    let item = new Item()

    var str   = this.form2.value.material
    var res   = str.split("|")
    
    var material = {
      _id: res[0],
      description: res[1]
    }

    item.line                 = this.form2.value.line
    item.material             = material
    item.quantity             = this.form2.value.quantity

    this.list.push(item)

    //this.list.save()

    this.createForm2()
    
  }

  delete(index) {
    if(confirm("Are you sure to delete?")) {

      this.list.splice(index,1)
      //this.list.save()

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
        project: [ this.project, Validators.required ]
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
        order: [ this.orderCode, Validators.required ]
      })
      this.editO = true

    }

  }

  updateOrder() {

    if(this.editP || this.editO) {

      this.notification.showErrors = true;
      this.notification.errors = 'You must select Project or Order Number before continue';

    } else {

      //if(confirm("Esta seguro de enviar el delivery? Usted no podra modificar esta accion / Are you sure to send the Shipped List? Be aware, this action cannot be undone")) {
        var str = this.project
        var res = str.split("|")
  
        var projectId = res[0]
  
        var params = {
          shipmentId:   this.shipmentId,
          projectId:    projectId,
          orderNumber:  this.orderCode,
          packingList:  this.list
        }
        
        this.projectService.updateList(params)
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
              this.notification.notices = 'Order updated successfully';
              this.createForm2()
              window.scrollTo(0, 0);
            } else {
                this.notification.showErrors = true;
                this.notification.errors = res;
            }
  
        });
  
      //}
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