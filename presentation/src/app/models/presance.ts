import { Etudiant } from './etudiant';
export interface Presance {
    id: number;
    remarque: string;
    absent: boolean;
    etudiant: Etudiant;
}
