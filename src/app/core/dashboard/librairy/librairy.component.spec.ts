import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrairyComponent } from './librairy.component';

describe('LibrairyComponent', () => {
  let component: LibrairyComponent;
  let fixture: ComponentFixture<LibrairyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrairyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibrairyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
