import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/pages/navbar/navbar.component';
import { FooterComponent } from './layout/pages/footer/footer.component';
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet , NgxSpinnerComponent , NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private spinner: NgxSpinnerService){}
  title = 'FreshCart';
}
