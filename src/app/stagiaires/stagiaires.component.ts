import { Component, OnInit } from '@angular/core';
import { Stagiaire } from '../model/stagiaire.model';
import { StagiaireService } from '../services/stagiaire.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';

@Component({
  selector: 'app-stagiaires',
  templateUrl: './stagiaires.component.html',
  styleUrls: ['./stagiaires.component.css'],
})

export class StagiairesComponent implements OnInit {

  stagiaires? : Stagiaire[];
  message : string = "";
  dtoptions : DataTables.Settings = {};
  dttrigger : Subject<any> = new Subject<any>();
  prenom! : string;
  nom! : string;
  telephone! : number;
  nni! : number;
  page : number = 0;

  constructor( private stagiaireservice : StagiaireService, private toastr : ToastrService) {
    
  }

  ngOnInit(): void {
    this.dtoptions = {
      pagingType : 'full_numbers',
      lengthMenu : [5, 10, 20, 30, 40, 50],
      ordering : true,
      pageLength : 5,
    };

    this.chargerPageStagiaires();  
  }

  chargerStagiaires() {
    this.stagiaireservice.listeStagiaire().subscribe(data => {
      console.log(data);
      this.stagiaires = data._embedded.stagiaires;
      console.log('Nombre d\'entrées:', this.stagiaires.length);
      this.dttrigger.next(this.stagiaires);
    });
  }

  chargerPageStagiaires() {
    this.stagiaireservice.listePageStagiaire(this.page).subscribe(data => {
      console.log(data);
      this.stagiaires = data._embedded.stagiaires;
      console.log('Nombre d\'entrées:', this.stagiaires.length);
      this.dttrigger.next(this.stagiaires);
    });
  }

  supprimerStagiaire(st : Stagiaire) {
    let confirmation = confirm('Confirmez vous la suppression de ce stagiaire ?');
    if (confirmation) {
      this.stagiaireservice.supprimerStagiaire(st.uio).subscribe(() => {
        console.log("Stagiaire supprime");
        this.toastr.error("Stagiaire supprimé");
        this.chargerStagiaires();
      });
    }
  }

  rechercherParPrenom() {
    this.stagiaireservice.searchStagiaireByPrenom(this.prenom).subscribe(data => {
      this.stagiaires = data._embedded.stagiaires;
    });
  }

  rechercherParNom() {
    this.stagiaireservice.searchStagiaireByNom(this.nom).subscribe(data => {
      this.stagiaires = data._embedded.stagiaires;
    });
  }

  rechercherParNni() {
    this.stagiaireservice.searchStagiaireByNni(this.nni).subscribe(data => {
      this.stagiaires = data._embedded.stagiaires;
    });
  }

  rechercherParTelephone() {
    this.stagiaireservice.searchStagiaireByTelephone(this.telephone).subscribe(data => {
      this.stagiaires = data._embedded.stagiaires;
    });
  }
}
