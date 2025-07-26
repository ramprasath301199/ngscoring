import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMactchComponent } from './new-mactch.component';

describe('NewMactchComponent', () => {
  let component: NewMactchComponent;
  let fixture: ComponentFixture<NewMactchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMactchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMactchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
