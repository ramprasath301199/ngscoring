import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayersComponent } from './add-players.component';

describe('AddPlayersComponent', () => {
  let component: AddPlayersComponent;
  let fixture: ComponentFixture<AddPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
