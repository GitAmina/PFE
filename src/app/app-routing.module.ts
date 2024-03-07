import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagiairesComponent } from './stagiaires/stagiaires.component';
import { AjoutStagiaireComponent } from './ajout-stagiaire/ajout-stagiaire.component';
import { LoginComponent } from './login/login.component';
import { MAJStagiaireComponent } from './majstagiaire/majstagiaire.component';
import { StagesComponent } from './stages/stages.component';
import { AjoutStageComponent } from './ajout-stage/ajout-stage.component';
import { MasstageComponent } from './masstage/masstage.component';
import { HistoriqueComponent } from './historique/historique.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { TableaudebordComponent } from './tableaudebord/tableaudebord.component';
import { ProfilComponent } from './profil/profil.component';
import { BadgeComponent } from './badge/badge.component';

const routes: Routes = [
  { path: 'stagiaires', component:StagiairesComponent },
  { path: 'ajoutStagiaires', component:AjoutStagiaireComponent},
  { path: 'majstagiaire/:uio', component:MAJStagiaireComponent},
  { path: 'stages', component: StagesComponent},
  { path: 'ajoutStages', component: AjoutStageComponent},
  { path: 'ajoutstage/:uio', component: AjoutStageComponent},
  { path: 'majstage/:uio', component: MasstageComponent},
  { path: 'historique', component: HistoriqueComponent},
  { path: 'pageaccueil' , component: AccueilComponent},
  { path: 'apropos' , component: AproposComponent},
  { path: 'tableaudebord' , component : TableaudebordComponent},
  { path: 'profil' , component : ProfilComponent},
  { path: 'badges' , component : BadgeComponent},
  { path: 'login', component:LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
