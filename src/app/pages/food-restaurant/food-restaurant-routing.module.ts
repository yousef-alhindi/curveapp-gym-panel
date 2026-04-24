import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodRestaurantComponent } from './food-restaurant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MenuMgmtComponent } from './menu-mgmt/menu-mgmt.component';
import { CategoryNameComponent } from './menu-mgmt/category-name/category-name.component';
import { ItemNameComponent } from './menu-mgmt/item-name/item-name.component';
import { SupportComponent } from './support/support.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { OfferMgmtComponent } from './offer-mgmt/offer-mgmt.component';
import { WalletMgmtComponent } from './wallet-mgmt/wallet-mgmt.component';
import { PaymentMgmtComponent } from './payment-mgmt/payment-mgmt.component';
import { ViewPayoutHistoryComponent } from './payment-mgmt/view-payout-history/view-payout-history.component';
import { AuthGuard } from 'src/app/service/auth.guard';
import { JoinAsSponsorComponent } from './join-as-sponsor/join-as-sponsor.component';
import { OrderMgmtComponent } from './order-mgmt/order-mgmt.component';
import { RatingsComponent } from './ratings/ratings.component';
import { SupplementMgmtComponent } from './supplement-mgmt/supplement-mgmt.component';
import { AddEditSupplementComponent } from './supplement-mgmt/add-edit-supplement/add-edit-supplement.component';
import { WeightSizesComponent } from './supplement-mgmt/weight-sizes/weight-sizes.component';
import { SupportTicketsComponent } from './support-tickets/support-tickets.component';
import { CreateSupportTicketsComponent } from './support-tickets/create-support-tickets/create-support-tickets.component';
import { GymPackageMgmtComponent } from './gym-package-mgmt/gym-package-mgmt.component';
import { EditPackageComponent } from './gym-package-mgmt/edit-package/edit-package.component';


const routes: Routes = [

  {path:'', component:FoodRestaurantComponent, children:[
    {path:'' , redirectTo:'dashboard',pathMatch:'full' },
    {path:'dashboard',component:DashboardComponent ,canActivate: [AuthGuard]},
    {path:'my-profile',component:MyProfileComponent , canActivate: [AuthGuard]},
    {path:'menu-mgmt',component:MenuMgmtComponent ,canActivate: [AuthGuard]}, 
    {path:'menu-mgmt/category-name/:categoryName/:id',component:CategoryNameComponent,canActivate: [AuthGuard]},
    {path:'menu-mgmt/item-name/:itemName/:id',component:ItemNameComponent,canActivate: [AuthGuard]},
    {path:'support',component:SupportComponent}, 
    {path:'terms-condition',component:TermsConditionComponent}, 
    {path:'privacy-policy',component:PrivacyPolicyComponent}, 
    {path:'contact-us',component:ContactUsComponent}, 
    {path:'about-us',component:AboutUsComponent},
    {path:'faq',component:FaqComponent}, 
    {path:'subscription',component:SubscriptionComponent}, 
    {path:'offer-mgmt',component:OfferMgmtComponent}, 
    {path:'wallet-mgmt',component:WalletMgmtComponent ,canActivate: [AuthGuard]},
    {path:'payment-mgmt',component:PaymentMgmtComponent}, 
    {path:'payment-mgmt/view-payout-history',component:ViewPayoutHistoryComponent}, 
    {path:'join-as-sponsor',component:JoinAsSponsorComponent}, 
    {path:'order-mgmt',component:OrderMgmtComponent}, 
    {path:'ratings',component:RatingsComponent}, 
    {path:'supplement-mgmt',component:SupplementMgmtComponent}, 
    {path:'supplement-mgmt/add-edit-supplement',component:AddEditSupplementComponent}, 
    {path:'supplement-mgmt/weight-sizes',component:WeightSizesComponent}, 
    {path:'support-tickets',component:SupportTicketsComponent}, 
    {path:'support-tickets/create-support-tickets',component:CreateSupportTicketsComponent},
    {path:'gym-package-mgmt',component:GymPackageMgmtComponent},
    {path:'gym-package-mgmt/edit-package',component:EditPackageComponent},
    {path:'gym-package-mgmt/edit-package/:id',component:EditPackageComponent},




  ]}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRestaurantRoutingModule { }
