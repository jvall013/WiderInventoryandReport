import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectService } from '../../services/project.service';
import { NotificationComponent } from '../../notification.component';
import { NgProgress } from '@ngx-progressbar/core';
import Material from '../../model/material.model';
import ItemList from '../../model/itemlist.model';

@Component({
  selector: 'app-listmaterial',
  templateUrl: './listmaterial.component.html',
  styleUrls: ['./listmaterial.component.css'],
  providers: [NotificationComponent]
})
export class ListMaterialComponent implements OnInit {

  list:      ItemList[];
  editList:  ItemList[] = [];

  columns:   any;
  row:       Number;
  projectId: string;
  showNew:   boolean;
  hideNew:   boolean;
  materials: Material[];
  form:      FormGroup;
  PROJECT_KEY = 'CURRENT_PROJECT';

  constructor(private projectService: ProjectService, 
              private formBuilder: FormBuilder,
              public notification: NotificationComponent,
              public progress: NgProgress) {

    this.row = 0;
    this.showNew = false;
    this.hideNew = false;

   }

   startLoading() {
    this.progress.start();
  }

  completeLoading() {
    this.progress.complete();
  }

  ngOnInit() {

    this.startLoading();

    this.projectId = localStorage.getItem(this.PROJECT_KEY)

    this.columns = this.projectService.getColumnsListMaterial()
    this.projectService.getListMaterialsByProject(this.projectId)
        .subscribe(res => {

          if(res)
            this.list = res.materials

          setTimeout(() => {
            this.completeLoading();
          }, 100);
    });

    this.projectService.getMaterials()
    .subscribe(res => {
        this.materials = res;
    });

    this.createForm();

  }

  createForm() {
    this.form = this.formBuilder.group({
        material:        ['', Validators.required ],
        quantity:        ['', Validators.required],
        project:         [this.projectId]
    })
  }

  newForm() {

    this.showNew = true;
    this.hideNew = true;

  }

  hideForm() {
    this.showNew = false;
    this.hideNew = false;
  }

  rebuildForm(cleanNotices = true) {
    this.form.reset();
    this.form.get('material').setValue('');
    this.form.get('project').setValue(this.projectId);
    this.notification.showErrors = false;
    if(cleanNotices) this.notification.showNotices = false;
  }

  addMaterial() {
    //console.log(this.form.value)
    this.notification.showErrors = false;
    this.projectService.addMaterial(this.form.value)
        .subscribe(res => {
            //console.log(res);
        if (res === undefined) {
            this.notification.showErrors = true;
            this.notification.errors = 'Unexpected error occurs in server. Contact support';
        } else if(res.status == '500') {
            this.notification.showErrors = true;
            this.notification.errors = res.message;
        } else if(res.status == '200') {
            this.notification.showErrors = false;
            this.notification.showNotices = true;
            this.notification.notices = 'Material added successfully';

            this.list = res.data.materials;

            this.rebuildForm(false);
        } else {
            this.notification.showErrors = true;
            this.notification.errors = res;
        }

    });
  }

  delete(item) {

    if(confirm("Are you sure to delete?")) {
      this.projectService.deleteMaterial(item._id).subscribe(res => {
        this.list = res.data.materials
      })
    }

  }

  editItem(item: ItemList) {
    if(this.list.includes(item)){
      if(!this.editList.includes(item)){
        this.editList.push(item)
      }else{
        this.editList.splice(this.editList.indexOf(item), 1)
        item.project = this.projectId
        this.projectService.editItemList(item).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editItem(item)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  submitItem(event, item:ItemList){
    if(event.keyCode ==13){
      this.editItem(item)
    }
  }

}
