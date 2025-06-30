import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprocessingStepComponent } from './preprocessing-step.component';

describe('PreprocessingStepComponent', () => {
  let component: PreprocessingStepComponent;
  let fixture: ComponentFixture<PreprocessingStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreprocessingStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreprocessingStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
