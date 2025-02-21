import { IUsuario } from "./iusuario";

export interface IPages {
    total: number; 
    page: number;
    perPage: number;
    totalPages: number;
    data: IUsuario[];
  }
  