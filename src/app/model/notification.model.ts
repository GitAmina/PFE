import { Stagiaire } from "./stagiaire.model";
import { utilisateur } from "./utilisateur.model";

export class Notification {
    uio! : number;
    uuid! : string;
    dateenvoie! : Date;
    contenu! : string;
    stagiaire! : Stagiaire;
    utilisateur! : utilisateur;
}