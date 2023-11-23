import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Authentificationservice } from '../services/authentification.service';
import { utilisateur } from '../model/utilisateur.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform! : FormGroup;
  login! : string;
  mdp! : string;
  user! : utilisateur;

  constructor (private toastr : ToastrService, private fb : FormBuilder, private router : Router, private authService: Authentificationservice) {

  }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      login : ['', [Validators.required]],
      mdp : ['', [Validators.required]],
    });
    
  }

  SeConnecter() {
    if (this.loginform.invalid) {
      console.log("Formulaire non valide");
      Object.keys(this.loginform.controls).forEach(key => {
        const control = this.loginform.get(key);
        if (control?.invalid) {
          if (control.hasError('required')) {
            this.toastr.error(`Le champ ${key} est requis.`);
          }
        }
      });
    }
    else {
      const login = "Amina";
      const mdp = "123456";

      if (this.login === login && this.mdp === mdp ) {
        this.toastr.success("Connexion réussie'", "Bienvenue!");
        console.log('Bienvenue');
        this.router.navigate(['/pageaccueil']);
      }
      else {
        this.toastr.error('Identifiants incorrects', 'Erreur d\'authentification');
      }
    }
  }

}