import { Component, OnInit } from '@angular/core';
import { Stagiaire } from '../model/stagiaire.model';
import { StagiaireService } from '../services/stagiaire.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajout-stagiaire',
  templateUrl: './ajout-stagiaire.component.html',
  styleUrls: ['./ajout-stagiaire.component.css']
})
export class AjoutStagiaireComponent implements OnInit{

  nouveauStagiaire = new Stagiaire();
  formajout! : FormGroup;

  constructor( private stagiaireservice : StagiaireService, private router : Router, private toastr : ToastrService, private fb : FormBuilder) {
    
  }

  ngOnInit(): void {
    this.formajout = this.fb.group({
      prenom : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      nom : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      genre : ['', Validators.required],
      nni : ['',  [Validators.required, Validators.pattern(/^\d{10}$/)]],
      datenaiss : ['', Validators.required],
      adresse : ['', [Validators.required]],
      nationnalite : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      telephone : ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      email : ['', [Validators.required, Validators.email, Validators.pattern(/.*@.*/)]],
      etablissement: [''],
      formation: [''],
      niveau: [''],
    });
  }

  ajouterStagiaire() {
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
          if (key === 'nni' && control.hasError('pattern')) {
            this.toastr.error(`Le Nni doit contenir exactement 10 chiffres.`);
          }
          if (key === 'telephone' && control.hasError('pattern')) {
            this.toastr.error(`Le champ ${key} doit contenir exactement 8 chiffres.`);
          }
          if (key === 'email' && control.hasError('pattern')) {
            this.toastr.error(`L'adresse email doit contenir au moins un caractère "@".`);
          }
        }
      });
    }
    else {
      console.log(this.nouveauStagiaire);
      this.stagiaireservice.ajouterStagiaire(this.nouveauStagiaire).subscribe(data => {
        console.log(data);
        this.toastr.success("Stagiaire ajouté avec succès");
        this.router.navigate(['stagiaires']);
      });
    }
  }  
}
