import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-add-players',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './add-players.component.html',
  styleUrl: './add-players.component.css',
})
export class AddPlayersComponent implements OnInit {
  loader = false;
  playerform!: FormGroup;
  private httpservice = inject(HttpService);
  private fb = inject(FormBuilder);
  label = 'Add Player';
  teamlist: { ID: number; city: string; image: string; name: string }[] = [];
  selectedFile: any;
  ngOnInit(): void {
    this.httpservice.GetallTeams().subscribe((response: any) => {
      this.teamlist = response.data;
    });
    this.initform();
  }
  initform() {
    this.playerform = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobile: ['', Validators.required],
      profileurl: ['', Validators.required],
      team: ['', Validators.required],
      file: [''],
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  submit() {
    console.log(this.playerform.get('file')?.value, 'cheking');
    if (this.playerform.valid) {
      if (this.playerform.get('file')?.value == '') {
        this.loader = true;
        this.httpservice
          .createPlayer(
            this.playerform.get('team')?.value,
            this.playerform.get('mobile')?.value,
            this.playerform.get('firstname')?.value,
            this.playerform.get('lastname')?.value,
            this.playerform.get('profileurl')?.value
          )
          .subscribe(
            (response: any) => {
              this.loader = false;
              if (response.status === 1) {
                console.log(response);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    } else {
      if (this.playerform.get('file')?.value != '') {
        this.httpservice.createplayerExcel(this.selectedFile).subscribe(
          (response: any) => {
            if (response.status === 1) {
              console.log(response);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        alert('invalid form');
      }
    }
  }
}
