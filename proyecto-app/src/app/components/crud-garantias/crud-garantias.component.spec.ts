import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGarantiasComponent } from './crud-garantias.component';

describe('CrudGarantiasComponent', () => {
  let component: CrudGarantiasComponent;
  let fixture: ComponentFixture<CrudGarantiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudGarantiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudGarantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
