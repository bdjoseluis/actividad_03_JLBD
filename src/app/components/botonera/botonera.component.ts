import { Component, inject, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-botonera',
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrls: ['./botonera.component.css']
})
export class BotoneraComponent {
  usuarioService = inject(UsuariosService);
  router = inject(Router);

  @Input() _id: string;
  @Input() parent: string;

  constructor() {
    this._id = "";
    this.parent = "";
  }

  borrarUsuario(_id: string) {
    const confirmacion = confirm('¿Está seguro de que quiere eliminar el usuario: ' + this._id + '?');
    if (confirmacion) {
      this.usuarioService.delete(_id).subscribe({
        next: (response) => {
          if (response) {
            alert("Se ha borrado correctamente el usuario " + this._id);
            if (this.parent === 'view') {
              this.router.navigate(['/usuarios']);
            } else if (this.parent === "card") {
              location.reload();
            }
          }
        },
        error: (err) => {
          console.error("Error al eliminar el usuario:", err);
          alert("No se pudo eliminar el usuario.");
        }
      });
    }
  }
}
