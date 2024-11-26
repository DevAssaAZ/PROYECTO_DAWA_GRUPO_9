import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
