import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { utilisateur } from "../model/utilisateur.model";

@Injectable({
    providedIn: 'root'
})

export class Authentificationservice {

    api = "http://localhost:8080/snim/utilisateurs";

    constructor (private http : HttpClient) {

    }

    listeUtilisateurs (): Observable<utilisateur[]> {
        return this.http.get<any>(this.api);
    }
}