import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario';
import { BotoneraComponent } from '../botonera/botonera.component';

@Component({
  selector: 'app-usuario-card',
  imports: [BotoneraComponent],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  @Input() miUsuario! : IUsuario;

}
