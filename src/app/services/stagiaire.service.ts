import { Injectable } from '@angular/core';
import { Stagiaire } from '../model/stagiaire.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wrapper } from '../model/Wrapped.model';

const httpOptions = {
  headers : new HttpHeaders( { 'Content-Type' : 'application/json' } )
}

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  apiurl : string = 'http://localhost:8080/snim/stagiaires';

  stagiaires! : Stagiaire[];
  stagiaire! : Stagiaire;

  constructor(private http : HttpClient) {

  }

  listeStagiaire (): Observable<Wrapper>{
    return this.http.get<Wrapper>(this.apiurl);
  }

  ajouterStagiaire (s : Stagiaire) : Observable<Stagiaire> {
    return this.http.post<Stagiaire>(this.apiurl, s, httpOptions);
  }

  supprimerStagiaire (uio : number) {
    const url = `${this.apiurl}/${uio}`;
    return this.http.delete(url, httpOptions);
  }

  consulterStagiaire(uio:number): Observable<Stagiaire>{
    const url = `${this.apiurl}/${uio}`;
    return this.http.get<Stagiaire>(url);
  }

  getStagiaireById(id: number): Observable<Stagiaire> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<Stagiaire>(url);
  }

  updateStagiaire(id: number, stagiaire: Stagiaire): Observable<any> {
    const url = `${this.apiurl}/${id}`;
    return this.http.put<any>(url, stagiaire);
  }

  MajStagiaire (s : Stagiaire): Observable<Stagiaire> {
    return this.http.patch<Stagiaire>(this.apiurl, s, httpOptions);
  }

  searchStagiaireByPrenom(prenom: string): Observable<Wrapper> {
    return this.http.get<Wrapper>(`${this.apiurl}/search/prenom?prenom=${prenom}`);
  }

  searchStagiaireByNom(nom: string): Observable<Wrapper> {
    return this.http.get<Wrapper>(`${this.apiurl}/search/nom?nom=${nom}`);
  }

  searchStagiaireByNni(nni: number): Observable<Wrapper> {
    return this.http.get<Wrapper>(`${this.apiurl}/search/nni?nni=${nni}`);
  }

  searchStagiaireByTelephone(telephone: number): Observable<Wrapper> {
    return this.http.get<Wrapper>(`${this.apiurl}/search/telephone?telephone=${telephone}`);
  }

  searchStagiaires(prenom: string, nom: string, nni: number, telephone: number): Observable<any> {
    // Construire les paramètres de la requête en fonction des filtres non vides
    let params = new HttpParams()
      .set('prenom', prenom || '')
      .set('nom', nom || '')
      .set('nni', nni ? nni.toString() : '')
      .set('telephone', telephone ? telephone.toString() : '');

    return this.http.get(`${this.apiurl}/search/`, { params });
  }

}
