import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from './components/generator/generator.component';
import { PaymentsComponent } from './components/payments/payments.component';


const routes: Routes = [
  { path: '', redirectTo: 'generator', pathMatch: 'full' },
  { path: 'generator', component: GeneratorComponent },
  { path: 'payment', component: PaymentsComponent },
  { path: '**', redirectTo: 'generator' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
