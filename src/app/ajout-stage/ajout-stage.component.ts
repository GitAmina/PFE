import { Component, OnInit } from '@angular/core';
import { Stage } from '../model/stage.model';
import { Stageservice } from '../services/stage.service';
import { Service } from '../model/service.model';
import { Stagiaire } from '../model/stagiaire.model';
import { StagiaireService } from '../services/stagiaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajout-stage',
  templateUrl: './ajout-stage.component.html',
  styleUrls: ['./ajout-stage.component.css'],
})
export class AjoutStageComponent implements OnInit{
  nouveauStage = new Stage();
  message : string = "";
  listeStagiaires!: Stagiaire[];
  listeServices!: Service[];
  formajout! : FormGroup;
  Stagiaire! : Stagiaire;
  Service! : Service;
  idstagiaire! : number;
  idservice! : number;
  idbadge! : number;
  currentstagiaire!: Stagiaire;

  constructor (private stageservice : Stageservice, private stagiaireservice : StagiaireService, private router : Router, private fb : FormBuilder, private toastr : ToastrService, private route : ActivatedRoute) {
    
  }

  ngOnInit(): void {

    this.chargerStagiaires();
    this.ChargerServices();
    
    this.formajout = this.fb.group({
      libelle : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      datedebut : ['', [Validators.required]],
      datefin : ['', Validators.required],
      stagiaire : ['',  [Validators.required]],
      service : ['', Validators.required],
      badge : ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      const idStagiaire = params['uio'];
      // Utilisez idStagiaire pour récupérer les détails du stagiaire
      this.getStagiaireById(idStagiaire);
    });
  }

  getStagiaireById(id: number): void {
    this.stagiaireservice.getStagiaireById(id).subscribe(stagiaire => {
      console.log(id);
      this.currentstagiaire = stagiaire;
      console.log(stagiaire);
      this.nouveauStage.stagiaire = this.currentstagiaire!;
      this.formajout.patchValue({
        'stagiaire': this.currentstagiaire.uio,
      });
    });
  }

  chargerStagiaires() {
    this.stagiaireservice.listeStagiaire().subscribe(data => {
      console.log(data);
      this.listeStagiaires = data._embedded.stagiaires;
    });
  }

  ChargerServices() {
    this.stageservice.listeService().subscribe(data => {
      console.log(data);
      this.listeServices = data._embedded.services;
    });
  }

  ajouterStage () {
    if (this.formajout.invalid) {
      console.log("Formulaire non valide");
      Object.keys(this.formajout.controls).forEach(key => {
        const control = this.formajout.get(key);
        if (control?.invalid) {
          if (control.hasError('required')) {
            this.toastr.error(`Le champ ${key} est requis.`);
          }
          if (control.hasError('pattern')) {
            this.toastr.error(`Le champ ${key} ne doit contenir que des lettres alphabétiques.`);
          }
        }
      });
    }
    else {
      const stagiaireTrouve = this.listeStagiaires.find(stagiaire => stagiaire.uio == this.idstagiaire);
      const serviceTrouve = this.listeServices.find(service => service.uio == this.idservice);

      if (stagiaireTrouve !== undefined && serviceTrouve !== undefined) {
        this.nouveauStage.stagiaire = stagiaireTrouve as Stagiaire;
        this.nouveauStage.service = serviceTrouve as Service;

        this.stageservice.ajouterStage(this.nouveauStage).subscribe(data => {
          console.log(data);
          const stageId = data.uio;

          this.stageservice.creerBadge(this.formajout.value.badge, stageId).subscribe(badgeData => {
              console.log('Badge ajouté avec succès', badgeData);
              this.toastr.success("Le stage et le badge ont été ajoutés avec succès");
              this.router.navigate(["stages"]);
            },
            error => {
              console.error('Erreur lors de l\'ajout du badge', error);
              this.toastr.error("Erreur lors de l'ajout du badge");
            }
          );
        });
      }
      else {
        console.error("Stagiaire ou service non trouvé.");
      }
    }
  } 
  
}
