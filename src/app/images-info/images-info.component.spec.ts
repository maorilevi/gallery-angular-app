import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesInfoComponent } from './images-info.component';
import { RouterModule } from '@angular/router';

describe('ImagesInfoComponent', () => {
  let component: ImagesInfoComponent;
  let fixture: ComponentFixture<ImagesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesInfoComponent ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
