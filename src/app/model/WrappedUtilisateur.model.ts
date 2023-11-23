import { utilisateur } from "./utilisateur.model";

export class WrapperUtilisateur {
    _embedded!: { stages :  utilisateur[]};
}