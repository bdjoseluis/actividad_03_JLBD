import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario';
import { BotoneraComponent } from '../../components/botonera/botonera.component';

@Component({
  selector: 'app-usuario-view',
  imports: [BotoneraComponent],
  templateUrl: './usuario-view.component.html',
  styleUrls: ['./usuario-view.component.css']
})
export class UsuarioViewComponent {
  usuarioService = inject(UsuariosService);
  activatedRoute = inject(ActivatedRoute);

  miUsuario!: IUsuario;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const id_usuario: string = params.id_usuario as string;

      this.usuarioService.getById(id_usuario).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.miUsuario = usuario;
          } else {
            console.error('Usuario no encontrado');
          }
        },
        error: (err) => {
          console.error('Error al obtener el usuario:', err);
        }
      });
    });
  }
}
