import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario';
import { IPages } from '../interfaces/ipages';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  constructor() {}

  getAll(page: number, itemPerPage: number): Observable<IPages> {
    return this.httpClient.get<IPages>(
      this.baseUrl + "?page=" + page + "&size=" + itemPerPage
    );
  }

  getById(_id: string): Observable<IUsuario | undefined> {
    return this.httpClient.get<IUsuario>(this.baseUrl+"/"+_id);
  }

  createUser(user: IUsuario): Observable<IUsuario> {
    alert('Usuario creado exitosamente (simulado)');
    return of(user);
  }

  updateUser(id: string, user: IUsuario): Observable<IUsuario> {
    alert('Usuario actualizado exitosamente (simulado)');
    return of(user);
  }

  delete(_id: string): Observable<IUsuario | undefined> {
    alert('Usuario eliminado exitosamente (simulado)');
    return of(undefined);
  }
}
