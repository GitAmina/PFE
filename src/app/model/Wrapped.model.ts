import { Stagiaire } from "./stagiaire.model";

export class Wrapper {
    _embedded!: { stagiaires: Stagiaire[]};
}