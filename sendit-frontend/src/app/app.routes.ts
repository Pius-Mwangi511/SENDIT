import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import{CourierGuard} from './auth/guards/courier.guard';

export const routes: Routes = [
  // Public
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home/home').then(m => m.Home)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home/home').then(m => m.Home)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register').then(m => m.Register)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.Login)
  },
  {
    path: 'about',
    loadComponent: () => import('./landing page/about/about').then(m => m.About)
  },
  {
    path: 'contact',
    loadComponent: () => import('./landing page/contact/contact').then(m => m.Contact)
  },
  {
    path: 'services',
    loadComponent: () => import('./landing page/sevices/sevices').then(m => m.Sevices)
  },
  {
    path: 'viewParcel/:id',
    loadComponent: () => import('./shared/component/view-parcel/view-parcel').then(m => m.ViewParcel)
  },
  {
    path: 'profile',
    loadComponent: () => import('./shared/component/profile/profile').then(m => m.Profile)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/component/unauthorized/unauthorized').then(m => m.Unauthorized)
  },
  {
    path: 'verify-email',
    loadComponent: () => import('./auth/verify-email/verify-email').then(m => m.VerifyEmailComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./auth/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent)
  },
  
  {
    path: 'reset-password',
    loadComponent: () => import('./auth/reset-password/reset-password').then(m => m.ResetPasswordComponent)
  },
   
   

  // Admin

//   {
//         // path: 'ADMIN',
//         // canActivate: [AuthGuard],
//         children: [

  {
    path: 'adash',
    loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'acreate',
    loadComponent: () => import('./admin/admin-create/admin-create').then(m => m.AdminCreate)
  },
  {
    path: 'amanage',
    loadComponent: () => import('./admin/admin-manage-parcels/admin-manage-parcels').then(m => m.AdminManageParcels)
  },
  {
    path: 'ausers',
    loadComponent: () => import('./admin/admin-man-users/admin-man-users').then(m => m.AdminManUsers)
  },
  {
    path: 'arequests',
    loadComponent: () => import('./admin/admin-sent-requests/admin-sent-requests').then(m => m.AdminSentRequests)
  },
  {
    path: 'anotification',
    loadComponent: () => import('./admin/admin-notifications/admin-notifications').then(m => m.AdminNotifications)
  },
  {
    path: 'ahome',
    loadComponent: () => import('./admin/home/home').then(m => m.AHome)
  },
  {
    path: 'aservices',
    loadComponent: () => import('./admin/service/service').then(m => m.AService)
  },
  {
    path: 'acontact',
    loadComponent: () => import('./admin/acontact/acontact').then(m => m.Acontact)
  },
  {
    path: 'aabout',
    loadComponent: () => import('./admin/aabout/aabout').then(m => m.Aabout)
  },
// ]
//   },

  // User

//   {
//         // path: 'USER',
//         //  canActivate: [AuthGuard],
//         children: [
  {
    path: 'mydb',
    loadComponent: () => import('./User/mydashboard/mydashboard').then(m => m.Mydashboard)
  },
  {
    path: 'sent',
    loadComponent: () => import('./User/sent/sent').then(m => m.Sent)
  },
  {
    path: 'received',
    loadComponent: () => import('./User/received/received').then(m => m.Received)
  },
  {
    path: 'notification',
    loadComponent: () => import('./User/notifications/notifications').then(m => m.Notifications)
  },
  {
    path: 'create',
    loadComponent: () => import('./User/create-parcel/create-parcel').then(m => m.CreateParcel)
  },
  {
    path: 'uhome',
    loadComponent: () => import('./User/euser/uhome/uhome').then(m => m.Uhome)
  },
  {
    path: 'uservices',
    loadComponent: () => import('./User/euser/uservice/uservice').then(m => m.Uservice)
  },
  {
    path: 'ucontact',
    loadComponent: () => import('./User/euser/ucontact/ucontact').then(m => m.Ucontact)
  },
  {
    path: 'uabout',
    loadComponent: () => import('./User/euser/uabout/uabout').then(m => m.Uabout)
  },
// ]
//   },

  // Courier

//   {
//         //  path: 'COURIER',
//         //  canActivate: [AuthGuard],
//          children: [

  {
    path: 'cordb',
    loadComponent: () => import('./courier/dashboard/courier-dashboard/courier-dashboard').then(m => m.CourierDashboard)
  },
  {
    path: 'chome',
    loadComponent: () => import('./courier/chome/chome').then(m => m.Chome)
  },
  {
    path: 'cservices',
    loadComponent: () => import('./courier/cservices/cservices').then(m => m.Cservices)
  },
  {
    path: 'ccontact',
    loadComponent: () => import('./courier/ccontact/ccontact').then(m => m.Ccontact)
  },
  {
    path: 'cabout',
    loadComponent: () => import('./courier/cabout/cabout').then(m => m.Cabout)
  },
  {
    path: 'all-supplies',
    loadComponent: () => import('./courier/dashboard/all-supplies/all-supplies').then(m => m.AllSupplies)
  },
  {
    path: 'cnotification',
    loadComponent: () => import('./courier/dashboard/notifications/notifications').then(m => m.CNotifications)
  },
  {
    path: 'update-location',
    loadComponent: () => import('./courier/dashboard/update-location/update-location').then(m => m.UpdateLocation)
  },
// ]
//   },
];



                                              // BELOW WILL BE UNCOMMENTED IN FINAL VERSION


// import { Routes } from '@angular/router';
// import { Home } from './home/home/home';
// import { Register } from './auth/register/register';
// import { Login } from './auth/login/login';
// import { About } from './about/about';
// import { Contact } from './contact/contact';
// import { Sevices } from './sevices/sevices';
// import { ViewParcel } from './component/view-parcel/view-parcel';
// import { Profile } from './component/profile/profile';
// //  to be deleted in final version
// import { Mydashboard } from './dashboard/mydashboard/mydashboard';
// import { Dashboard } from './admin/dashboard/dashboard';
// //above is to be deleted in final version
// import { AuthGuard } from '../guards/auth.guard'; 
// import { AdminGuard } from '../guards/admin.guard'; 

// export const routes: Routes = [
//   // Public routes
//   { path: '', pathMatch: 'full', component: Home },
//   { path: 'home', component: Home },
//   { path: 'register', component: Register },
//   { path: 'login', component: Login },
//   { path: 'about', component: About },
//   { path: 'contact', component: Contact },
//   { path: 'services', component: Sevices },
//   { path: 'profile', component: Profile },
//   { path: 'viewParcel', component: ViewParcel },
//   //  to be deleted in final version
//   { path: 'mydb', component: Mydashboard },
//   { path: 'adash', component: Dashboard },
//   //above is to be deleted in final version

//   // User routes (protected)
//   {
//     path: 'USER',
//     canActivate: [AuthGuard],
//     children: [
//       { path: 'dashboard', loadComponent: () => import('./dashboard/mydashboard/mydashboard').then(m => m.Mydashboard) },
//       { path: 'sent', loadComponent: () => import('./dashboard/sent/sent').then(m => m.Sent) },
//       { path: 'received', loadComponent: () => import('./dashboard/received/received').then(m => m.Received) },
//       { path: 'notifications', loadComponent: () => import('./dashboard/notifications/notifications').then(m => m.Notifications) },
//       { path: 'create', loadComponent: () => import('./dashboard/create-parcel/create-parcel').then(m => m.CreateParcel) },
//       { path: 'profile', loadComponent: () => import('./component/profile/profile').then(m => m.Profile) },
//       { path: 'view-parcel', loadComponent: () => import('./component/view-parcel/view-parcel').then(m => m.ViewParcel) }
//     ]
//   },

//   // Admin routes (protected)
//   {
//     path: 'ADMIN',
//     canActivate: [AdminGuard],
//     children: [
//       { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.Dashboard) },
//       { path: 'create', loadComponent: () => import('./admin/admin-create/admin-create').then(m => m.AdminCreate) },
//       { path: 'manage', loadComponent: () => import('./admin/admin-manage-parcels/admin-manage-parcels').then(m => m.AdminManageParcels) },
//       { path: 'users', loadComponent: () => import('./admin/admin-man-users/admin-man-users').then(m => m.AdminManUsers) },
//       { path: 'requests', loadComponent: () => import('./admin/admin-sent-requests/admin-sent-requests').then(m => m.AdminSentRequests) },
//       { path: 'notifications', loadComponent: () => import('./admin/admin-notifications/admin-notifications').then(m => m.AdminNotifications) }
//     ]
//   }
// ];
