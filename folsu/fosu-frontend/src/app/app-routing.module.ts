import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { LoginComponent } from './user/login.component';
import { RegisterComponent } from './user/register.component';
import { HomeComponent } from './layout/home/home.component';
import { UsereditComponent } from './layout/useredit/useredit.component';
import { AccessDeniedComponent } from './access-denied.component';
import { ListMaterialComponent } from './layout/listmaterial/listmaterial.component';
import { ProjectComponent } from './layout/project/project.component';
import { SummaryComponent } from './layout/project/summary/summary.component';
import { ProjectFormComponent } from './layout/project/register/projectform.component';
import { UserComponent } from './user/user.component';
import { ListImagesComponent } from './layout/listimages/listimages.component';
import { BarcodeComponent } from './layout/barcode/barcode.component';
import { ShipmentsComponent } from './layout/project/shipments/shipments.component';
import { ThankyouComponent } from './thankyou.component';
import { PackingComponent } from './layout/project/packing/packing.component';
import { ShippedpunchComponent } from './layout/project/shippedpunch/shippedpunch.component';
import { ViewPackingComponent } from './layout/project/packing/viewpacking.component';
import { ViewShipmentComponent } from './layout/project/shipments/viewshipment.component';
import { MaterialComponent } from './layout/material/material.component';
import { ReportsComponent } from './layout/project/reports/reports.component';
import { ViewUsersComponent } from './user/view-users.component';
import { TimelineComponent } from './layout/project/timeline/timeline.component';
import { DailyreportComponent } from './layout/dailyreport/dailyreport.component';

import { AuthGuard } from './services/auth-guard.service';
import { RoleGuard } from './services/role-guard.service';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'thankyou/:type', component: ThankyouComponent },
  { path: 'barcode', component: BarcodeComponent },
  { 
    path: 'shippedlist', 
    component: ShipmentsComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'FORMER'
    }
  },
  { 
    path: 'packinglist', 
    component: PackingComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  { 
    path: 'shippedpunch', 
    component: ShippedpunchComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  { 
    path: 'shippedpunch/:id', 
    component: ShippedpunchComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  { 
    path: 'viewpacking/:id', 
    component: ViewPackingComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  { 
    path: 'viewshipment/:id', 
    component: ViewShipmentComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  { path: 'login/:status', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    /*canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }*/
  },
  {
    path: 'users',
    component: ViewUsersComponent,
    canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'users/:id',
    component: ViewUsersComponent,
    canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'account',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'useredit', component: UsereditComponent },
  { 
    path: 'admin', 
    component: RegisterComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'projects',
    component: ProjectComponent,
    canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'summary/:projectid',
    component: SummaryComponent,
    canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'projects/new',
    component: ProjectFormComponent,
    canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'projects/edit/:id',
    component: ProjectFormComponent,
    canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'projects/timeline/:id',
    component: TimelineComponent,
    canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'dailyreport',
    component: DailyreportComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'reports/:type', 
    component: ReportsComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'listMaterials',
    component: ListMaterialComponent,
    canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'materials',
    component: MaterialComponent,
    canActivate: [RoleGuard],
    data: { 
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'listImages',
    component: ListImagesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'access_denied', component: AccessDeniedComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
