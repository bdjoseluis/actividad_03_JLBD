import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  private usuarioService = inject(UsuariosService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  tipo: string;
  usuarioForm: FormGroup;

  constructor() {
    this.tipo = "Insertar";
    this.usuarioForm = new FormGroup({
      _id: new FormControl(''),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params._id) {
        this.tipo = "Actualizar";
        this.usuarioService.getById(params._id).subscribe({
          next: (usuarioResponse: IUsuario | undefined) => {
            if (usuarioResponse) {
              this.usuarioForm.setValue({
                _id: usuarioResponse._id,
                first_name: usuarioResponse.first_name,
                last_name: usuarioResponse.last_name,
                username: usuarioResponse.username,
                email: usuarioResponse.email,
                image: usuarioResponse.image,
              });
            } else {
              alert("Usuario no encontrado");
              this.router.navigate(['/home']);
            }
          },
          error: (err) => {
            alert("Error al obtener el usuario: " + err);
            this.router.navigate(['/home']);
          }
        });
      }
    });
  }

  getDataForm(): void {
    if (this.usuarioForm.invalid) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const usuario: IUsuario = this.usuarioForm.value;

    if (this.tipo === "Actualizar") {
      this.usuarioService.updateUser(usuario._id, usuario).subscribe({
        next: () => {
          alert("Usuario actualizado con éxito");
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert("Error al actualizar el usuario: " + err);
        }
      });
    } else {
      this.usuarioService.createUser(usuario).subscribe({
        next: () => {
          alert("Usuario creado con éxito");
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert("Error al crear usuario: " + err);
        }
      });
    }
  }
}
