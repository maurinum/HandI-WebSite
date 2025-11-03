import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { FeaturesComponent } from './components/features/features';
import { VideosComponent } from './components/videos/videos';
import { PricingComponent } from './components/pricing/pricing';
import { ContactComponent } from './components/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
