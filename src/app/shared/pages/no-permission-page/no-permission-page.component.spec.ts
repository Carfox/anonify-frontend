import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPermissionPageComponent } from './no-permission-page.component';

describe('NoPermissionPageComponent', () => {
  let component: NoPermissionPageComponent;
  let fixture: ComponentFixture<NoPermissionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoPermissionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPermissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
