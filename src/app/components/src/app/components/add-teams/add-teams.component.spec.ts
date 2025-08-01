import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamsComponent } from './add-teams.component';

describe('AddTeamsComponent', () => {
  let component: AddTeamsComponent;
  let fixture: ComponentFixture<AddTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
