import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { AddUserComponent } from './users/add-user.component';
import {ClientListComponent } from './FoodShelfClient/food-shelf-client-list/food-shelf-client-list.component';
import {VolunteerListComponent } from './FoodShelfVolunteer/food-shelf-volunteer-list/food-shelf-volunteer-list.component';
import { AddMessageComponent } from './FoodShelfClient/add-message/add-message.component';
import { DonorListComponent } from './FoodShelfDonor/food-shelf-donor-list/food-shelf-donor-list.component';

// Note that the 'users/new' route needs to come before 'users/:id'.
// If 'users/:id' came first, it would accidentally catch requests to
// 'users/new'; the router would just think that the string 'new' is a user ID.
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'users', component: UserListComponent, title: 'Users'},
  {path: 'users/new', component: AddUserComponent, title: 'Add User'},
  {path: 'users/:id', component: UserProfileComponent, title: 'User Profile'},
  {path: 'foodshelfclient', component: ClientListComponent, title: 'Clients'},
  {path: 'foodshelfclient/new', component: AddMessageComponent, title: 'Add Message'},
  {path: 'messages', component: ClientListComponent, title: 'Message'},
  {path: 'foodshelfvolunteer', component: VolunteerListComponent, title: 'Volunteers'},
  {path: 'foodshelfvolunteer/new', component: AddMessageComponent, title: 'Add Message'},
  {path: 'foodshelfdonor', component: DonorListComponent, title: 'Donors'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
