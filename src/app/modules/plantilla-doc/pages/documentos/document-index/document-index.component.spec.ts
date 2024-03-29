import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentIndexComponent } from './document-index.component';

describe('DocumentIndexComponent', () => {
  let component: DocumentIndexComponent;
  let fixture: ComponentFixture<DocumentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
