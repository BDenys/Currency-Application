import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MainLayoutComponent } from './views/main-layout/main-layout.component';
import { HomeLayoutComponent } from './views/home-layout/home-layout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { FixedLengthPipe } from './pipes/fixed-length.pipe';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeLayoutComponent }
  ]}
]

@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeLayoutComponent,
    NavBarComponent,
    FixedLengthPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class FeatureModule { }
