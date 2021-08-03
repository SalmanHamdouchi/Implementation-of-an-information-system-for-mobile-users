import { Horraire } from './horraire';
// import { Interface } from 'readline';

export interface Activite {
    id: number;
    nom: string;
    description?: string;
    ligneNvMatiere?: LigneNvMatiere;
    salle?: any;
    seances?: Array<any>;
    horraires?: Array<Horraire>;
    typeActivite?: any;
    etudiants?: Array<any>;
    image?: any;
}
interface LigneNvMatiere{
    matiere: Matiere;
    niveau : Niveau;

}
interface Matiere{
    photo: any;
    nom: string;
}
interface Niveau{
    nv: any;
}
