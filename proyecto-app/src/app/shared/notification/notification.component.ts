import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface notiData{
  titulo:string;
  contenido:string;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  constructor(
    public notiRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: notiData
  ) {}


  onAceptar():void{
    this.notiRef.close("Aceptar");
  }
}
