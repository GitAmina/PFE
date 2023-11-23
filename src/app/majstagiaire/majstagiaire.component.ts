import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StagiaireService } from '../services/stagiaire.service';
import { Stagiaire } from '../model/stagiaire.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-majstagiaire',
  templateUrl: './majstagiaire.component.html',
  styleUrls: []
})
export class MAJStagiaireComponent implements OnInit{

  currentstagiaire = new Stagiaire;
  message : string = "";
  stagiaireId!: number;
  formmajajout!: FormGroup;
  genre! : string;

  constructor( private activatedroute: ActivatedRoute, private stagiaireservice: StagiaireService, private router : Router, private route: ActivatedRoute, private toastr : ToastrService, private fb : FormBuilder) {
    
  }

  ngOnInit(): void {
    // console.log(this.currentstagiaire);
    this.stagiaireId = this.activatedroute.snapshot.params['uio'];
    this.getStagiaireById(this.stagiaireId);
    this.formmajajout = this.fb.group({
      prenom : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      nom : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      genre : [''],
      nni : [''],
      datenaiss : ['', Validators.required],
      adresse : ['', [Validators.required]],
      nationnalite : [''],
      telephone : ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      email : ['', [Validators.required, Validators.email, Validators.pattern(/.*@.*/)]],
      etablissement: [''],
      formation: [''],
      niveau: [''],
    });
  }

  getStagiaireById(id: number): void {
    this.stagiaireservice.getStagiaireById(id).subscribe(stagiaire => {
        this.currentstagiaire = stagiaire;
        this.genre = String(this.currentstagiaire!.genre);
    });
  }

  

  MAJStagiaire(): void {
    if (this.formmajajout.invalid) {
      console.log("Formulaire non valide");
      Object.keys(this.formmajajout.controls).forEach(key => {
        const control = this.formmajajout.get(key);
        if (control?.invalid) {
          if (control.hasError('required')) {
            this.toastr.error(`Le champ ${key} est requis.`);
          }
          if (control.hasError('pattern')) {
            this.toastr.error(`Le champ ${key} ne doit contenir que des lettres alphabétiques.`);
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
      console.log(this.currentstagiaire);
      this.stagiaireservice.updateStagiaire(this.stagiaireId, this.currentstagiaire).subscribe(response => {
        this.toastr.info("Les informations du stagiaire ont été mise a jour");
        this.router.navigate(["stagiaires"]);
      });
    }
  }

}
