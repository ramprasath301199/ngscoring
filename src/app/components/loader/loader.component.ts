import { Component, Input } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgxLoadingModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  @Input() loading = false;
}
