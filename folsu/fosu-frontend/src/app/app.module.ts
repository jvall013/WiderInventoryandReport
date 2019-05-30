import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { WebStorageModule } from 'ngx-store';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login.component';
import { RegisterComponent } from './user/register.component';
import { PageNotFoundComponent } from './not-found.component';
import { ThankyouComponent } from './thankyou.component';
import { UsereditComponent } from './layout/useredit/useredit.component';
import { HomeComponent } from './layout/home/home.component';
import { AccessDeniedComponent } from './access-denied.component';
import { NotificationComponent } from './notification.component';
import { SidebarComponent } from './layout/shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './layout/shared/components/header/header.component';
import { ListMaterialComponent } from './layout/listmaterial/listmaterial.component';
import { ProjectComponent } from './layout/project/project.component';
import { SummaryComponent } from './layout/project/summary/summary.component';
import { ProjectFormComponent } from './layout/project/register/projectform.component';
import { ListImagesComponent } from './layout/listimages/listimages.component';
import { BarcodeComponent } from './layout/barcode/barcode.component';
import { ViewPackingComponent } from './layout/project/packing/viewpacking.component';
import { ViewShipmentComponent } from './layout/project/shipments/viewshipment.component';
import { ShipmentsComponent } from './layout/project/shipments/shipments.component';
import { PackingComponent } from './layout/project/packing/packing.component';
import { ShippedpunchComponent } from './layout/project/shippedpunch/shippedpunch.component';
import { MaterialComponent } from './layout/material/material.component';
import { ReportsComponent } from './layout/project/reports/reports.component';
import { ViewUsersComponent } from './user/view-users.component';
import { DefaultactivitiesComponent } from './layout/defaultactivities/defaultactivities.component';
import { TimelineComponent } from './layout/project/timeline/timeline.component';
import { SortPipe } from './sortpipe.component';
import { MaxLengthPipe } from './maxlength.component';
import { DailyreportComponent } from './layout/dailyreport/dailyreport.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { RoleGuard } from './services/role-guard.service';
import { ProjectService } from './services/project.service';
import { BarcodeDecoderService } from './services/barcode-decoder.service';
import { BarcodeValidatorService } from './services/barcode-validator.service';
import { MaterialService } from './services/material.service';
import { ReportService } from './services/report.service';
import { ActivityService } from './services/activity.service';
import { DailyReportService } from './services/daily-report.service';
import { HighlightDirective } from './highlight.directive';
import { TimelineService } from './services/timeline.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SortPipe,
    MaxLengthPipe,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    HomeComponent,
    UsereditComponent,
    NotificationComponent,
    SidebarComponent,
    HeaderComponent,
    ListMaterialComponent,
    ProjectComponent,
    SummaryComponent,
    ProjectFormComponent,
    ListImagesComponent,
    BarcodeComponent,
    ShipmentsComponent,
    ThankyouComponent,
    PackingComponent,
    ShippedpunchComponent,
    ViewPackingComponent,
    ViewShipmentComponent,
    MaterialComponent,
    ReportsComponent,
    ViewUsersComponent,
    HighlightDirective,
    DefaultactivitiesComponent,
    TimelineComponent,
    DailyreportComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgProgressModule.forRoot({
      spinnerPosition: 'left',
      //color: '#f71cff',
      //thick: true
    }),
    NgProgressHttpModule,
    CommonModule,
    WebcamModule,
    WebStorageModule
  ],
  //entryComponents: [NgbdModalContent],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    RoleGuard,
    ProjectService,
    BarcodeDecoderService,
    BarcodeValidatorService,
    MaterialService,
    ReportService,
    ActivityService,
    TimelineService,
    DailyReportService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  // Diagnostic only: inspect router configuration
  //constructor(router: Router) {
  //  console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  //}
}
