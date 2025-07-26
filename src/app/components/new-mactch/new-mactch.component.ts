import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal/modal.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-new-mactch',
  standalone: true,
  imports: [HeaderComponent, CommonModule, NgbModule, RouterLink, FormsModule],
  templateUrl: './new-mactch.component.html',
  styleUrl: './new-mactch.component.css',
})
export class NewMactchComponent implements OnInit {
  datetime: any;
  ground: any;
  balltype: any;
  overs: any;
  firstteam: any;
  secondteam: any;
  allsquad: any[] = [];
  firstSqaud: any[] = [];
  secondSqaud: any[] = [];
  label = 'New Match';
  teamsquad: any;
  private service = inject(HttpService);
  private modalService = inject(ModalService);
  private router = inject(Router);
  allteams: { name: string; city: string; image: string }[] = [];
  id: any;
  opencontent: any;
  selectedSquad: any[] = [];
  type: any;
  ngOnInit(): void {
    this.Getall();
    console.log(this.firstteam ? 'ram' : 'pras');
  }
  Getall() {
    this.service.GetallTeams().subscribe((repsonse: any) => {
      this.allteams = repsonse.data;
    });
  }
  isInOtherSquad(item: any): boolean {
    return this.type === 'first' ? item.second : item.first;
  }
  open(content: any, id: any, type: any) {
    this.selectedSquad = this.allsquad.filter((p) =>
      type === 'first' ? p.first : p.second
    );
    console.log(this.selectedSquad, 'selectsquad');
    this.id = id;
    this.type = type;
    this.opencontent = this.modalService.openModal(
      content,
      false,
      'static',
      false,
      'xl'
    );
    if (content._declarationTContainer.localNames[0] == 'squadModal') {
      this.getsquad();
    }
  }
  trackByFn(index: number, item: any) {
    return item.playerId;
  }

  toggleSelection(item: any, event: any) {
    const checked = event.target.checked;
    const index = this.selectedSquad.findIndex(
      (s: any) => s.playerId === item.playerId
    );

    if (checked && index === -1) {
      this.selectedSquad.push(item); // add to selected
    } else if (!checked && index !== -1) {
      this.selectedSquad.splice(index, 1); // remove from selected
    }
  }

  isSelected(item: any): boolean {
    const isInSelected = this.selectedSquad.some(
      (p) => p.playerId === item.playerId
    );
    return this.type === 'first'
      ? item.first === true || isInSelected
      : item.second === true || isInSelected;
  }
  squad(item: any) {
    const index = this.selectedSquad.findIndex(
      (s: any) => s.playerId === item.playerId
    );
    if (index !== -1) {
      // Already selected → remove
      this.selectedSquad.splice(index, 1);
    } else {
      // Not selected → add
      this.selectedSquad.push(item);
    }
  }
  submit(): void {
    const isFirst = this.type === 'first';

    // Save selected squad
    if (isFirst) {
      this.firstSqaud = [...this.selectedSquad];
    } else {
      this.secondSqaud = [...this.selectedSquad];
    }

    // Reset all flags first
    for (let player of this.allsquad) {
      if (isFirst) {
        player.first = false;
      } else {
        player.second = false;
      }
    }

    // Set flags to true only for selected players
    for (let player of this.selectedSquad) {
      const found = this.allsquad.find((p) => p.playerId === player.playerId);
      if (found) {
        if (isFirst) found.first = true;
        else found.second = true;
      }
    }
    console.log(this.firstSqaud, this.secondSqaud, 'sqaud');
    this.selectedSquad = [];
    this.modalService.closeModal(this.opencontent);
  }
  createMatch() {
    const payload = {
      team1: this.firstteam.ID,
      team1Squad: this.firstSqaud.map((data) => data.playerId),
      team2: this.secondteam.ID,
      team2Squad: this.secondSqaud.map((data) => data.playerId),
      overs: this.overs,
      balltype: this.balltype,
      ground: this.ground,
      datetime: this.datetime,
    };
    this.service.createMatch(payload).subscribe(
      (response: any) => {
        if (response.status == 1) {
          console.log(response);
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        console.log(err, 'error');
      }
    );
  }
  getsquad() {
    this.service.getAllsquad(this.id).subscribe((response: any) => {
      if (response.status == 1) {
        this.allsquad = response.data;
      }
    });
  }
  closeModal() {
    this.modalService.closeModal(this.opencontent);
  }
  team(data: any) {
    if (this.id == 1) {
      if (this.secondteam) {
        if (this.secondteam.ID !== data.ID) {
          this.firstteam = data;
          this.closeModal();
        } else {
          alert('You can not select the same team twice');
        }
      } else {
        this.firstteam = data;
        this.closeModal();
      }
    } else {
      if (this.firstteam) {
        if (this.firstteam.ID !== data.ID) {
          this.secondteam = data;
          this.closeModal();
        } else {
          alert('You can not select the same team twice');
        }
      } else {
        this.secondteam = data;
        this.closeModal();
      }
    }
    console.log(this.firstteam, this.secondteam);
  }
}
