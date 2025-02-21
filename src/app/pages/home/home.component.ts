import { Component, inject } from '@angular/core';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';
import { IUsuario } from '../../interfaces/iusuario';
import { UsuariosService } from '../../services/usuarios.service';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-home',
  imports: [UsuarioCardComponent, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrUsuarios : IUsuario[];
  usuarioService = inject(UsuariosService);
  p: number = 1;


  constructor(){
    this.arrUsuarios = [];
  }

  ngOnInit(): void {
    this.usuarioService.getAll(this.p,3).subscribe((data: any) => {
      this.arrUsuarios = data.results;
    })
  }
}