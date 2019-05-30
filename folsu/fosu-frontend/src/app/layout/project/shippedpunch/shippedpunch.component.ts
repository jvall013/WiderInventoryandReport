import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationComponent } from '../../../notification.component';
import { ProjectService } from '../../../services/project.service';

declare let jsPDF;

@Component({
  selector: 'app-shippedpunch',
  templateUrl: './shippedpunch.component.html',
  styleUrls: ['./shippedpunch.component.css'],
  providers: [NotificationComponent]
})
export class ShippedpunchComponent implements OnInit {

  showForm1:  boolean = true;
  punchlist = [];
  form1:      FormGroup;
  orderCode:  string;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              public notification: NotificationComponent,
              private activatedRoute: ActivatedRoute,
              private _location: Location) { }

  ngOnInit() {

    var id = this.activatedRoute.snapshot.paramMap.get('id')

    if(id === null) {

      this.createForm1()
      
    } else {

      this.projectService.getShipment(id)
      .subscribe(res => {
        if(res)
          this.addOrder(res.orderNumber)
        else {
          this.notification.showErrors = true
          this.notification.errors = "Something went wrong getting the Shipment, contact support"
        }

      })

      this.showForm1 = false

    }
      


  }

  createForm1() {
    this.form1 = this.formBuilder.group({
        order: ['', Validators.required]
    })
  }

  addOrder(id = '') {
    
    if(id == '')
      this.orderCode = this.form1.value.order
    else
      this.orderCode = id

    this.projectService.getPunchFromShipment(this.orderCode)
    .subscribe(res => {

        if(res.status == 100) {

          this.notification.showErrors = true
          this.notification.errors = "The order number doesn't exists. Try with another number"

        } else if(res.status == 300) {

          this.notification.showErrors = true
          this.notification.errors = "We cannot generate the punch list because one list is missing"

        } else if(res.status == 400) {

          this.notification.showErrors = true
          this.notification.errors = "We cannot generate the punch list because an error. Contact support"

        }else if(res.status == 200) {

          this.punchlist = res.data

          this.notification.showErrors = false
          this.notification.showNotices = true
          this.notification.notices = "Order number found"

          this.showForm1 = false

        }
    });

  }

  reloadOrder() {
    this.notification.showErrors = false
    this.notification.showNotices = false

    this.showForm1 = true

    this.createForm1()
  }

  keyPress(event: any) {
    
    var current = this.form1.value.order;
    const pattern = /^[a-z0-9]+$/i;
    const inputChar = String.fromCharCode(event.charCode);

    if (pattern.test(inputChar)) {    
      current = current + String.fromCharCode(event.which).toUpperCase();
      //console.log(this.orderCode) /^[a-z0-9]+$/i

      this.form1 = this.formBuilder.group({
        order:        [current, Validators.required]
      })

      event.preventDefault();

    }

  }

  downloadPDF() {

    //let doc = new jsPDF();

    var columns = ["Line", "Material", "Missing"];
    var list = [];

    for(var i = 0; i < this.punchlist.length; i++) {
      var row = [this.punchlist[i].line,this.punchlist[i].material,this.punchlist[i].differ]
      list.push(row)
    }
    
    var rows = list;

    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');

    doc.page = 1; // use this as a counter.
    var totalPages = 1; // define total amount of pages
    // HEADER
    doc.setFontSize(20);//optional
    doc.setTextColor(40);//optional
    doc.setFontStyle('normal');//optional
    doc.text("Report", 50, 30);// set your margins

    doc.autoTable(columns, rows);

    var pageCount = doc.internal.getNumberOfPages();
    for(i = 0; i < pageCount; i++) {
      doc.setPage(i); 
      doc.text(doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount, 50,800);
    }
    
    doc.save('punchlist.pdf');

  }

  backClicked() {
    this._location.back();
  }

}
