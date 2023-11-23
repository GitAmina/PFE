import { Component, OnInit } from '@angular/core';
import { Stage } from '../model/stage.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Stageservice } from '../services/stage.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from '../model/stagiaire.model';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-masstage',
  templateUrl: './masstage.component.html',
  styleUrls: [],
})
export class MasstageComponent implements OnInit{

  currentstage = new Stage();
  message : string = "";
  formmajajout! : FormGroup;
  stageid! : number;
  Stagiaire! : Stagiaire;
  Service! : Service;

  constructor (private activatedroute : ActivatedRoute, private router : Router, private stageservice : Stageservice, private fb : FormBuilder, private toastr : ToastrService) {

  }

  ngOnInit(): void {
    console.log(this.activatedroute.snapshot.params['uio']);

    this.stageid = this.activatedroute.snapshot.params['uio'];

    this.getStageById(this.stageid);

    this.formmajajout = this.fb.group({
      libelle : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      datefin : ['', Validators.required],
      datedebut : [''],
      stagiaire : [''],
      service : [''],
      badge : [''],
    });
  }

  getStageById (id : number) : void {
    this.stageservice.consulterStage(id).subscribe(stage => {
      this.currentstage = stage;
      this.stageservice.getServicesByStage(id).subscribe(service => {
        this.Service = service;
      });
      this.stageservice.getStagiaireByStage(id).subscribe(stagiaire => {
        this.Stagiaire = stagiaire;
      });
    });
  }

  MAJStage() {
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
        }
      });
    }
    else {
      this.stageservice.MajStage(this.stageid ,this.currentstage).subscribe(data => {
        console.log(this.currentstage);
        this.toastr.info("La stage a été prolongé");
        this.router.navigate(['stages']);
      });
    }
  }

}
