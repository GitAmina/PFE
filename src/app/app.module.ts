import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { StagiairesComponent } from './stagiaires/stagiaires.component';
import { AjoutStagiaireComponent } from './ajout-stagiaire/ajout-stagiaire.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAJStagiaireComponent } from './majstagiaire/majstagiaire.component';
import { StagesComponent } from './stages/stages.component';
import { AjoutStageComponent } from './ajout-stage/ajout-stage.component';
import { MasstageComponent } from './masstage/masstage.component';
import { HistoriqueComponent } from './historique/historique.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AproposComponent } from './apropos/apropos.component';
import { TableaudebordComponent } from './tableaudebord/tableaudebord.component';
import { ProfilComponent } from './profil/profil.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BadgeComponent } from './badge/badge.component';

@NgModule({
  declarations: [
    AppComponent,
    StagiairesComponent,
    AjoutStagiaireComponent,
    LoginComponent,
    MAJStagiaireComponent,
    StagesComponent,
    AjoutStageComponent,
    MasstageComponent,
    HistoriqueComponent,
    AccueilComponent,
    SidebarComponent,
    AproposComponent,
    TableaudebordComponent,
    ProfilComponent,
    BadgeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgSelectModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
