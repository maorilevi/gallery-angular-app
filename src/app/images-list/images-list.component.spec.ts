import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ImagesListComponent } from './images-list.component';
import { RouterModule } from '@angular/router';
import { ImagesService } from '../services/images.service';
import { switchMap, take } from 'rxjs/operators';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

describe('ImagesListComponent', () => {
  let component: ImagesListComponent;
  let fixture: ComponentFixture<ImagesListComponent>;
  let imagesService: ImagesService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesListComponent ],
      imports: [
        RouterModule.forRoot([]),
        ScrollingModule,
        MatButtonToggleModule
      ],
      providers: [ImagesService]
    })
    .compileComponents();
    imagesService = await TestBed.inject(ImagesService);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('triple click (add to favorite)', fakeAsync(() => {
    const imageId = '0';
    fetch('./assets/mock-images.json').then(response => response.json()).then((response: any) => {
      imagesService.setImages(response);
    });
    tick(3000);
    const subscription: Subscription = imagesService.images.asObservable().pipe(take(1), switchMap((res) => {
      return imagesService.favorites.asObservable();
    })).subscribe(res => {
      console.log('add', res);
      if (!!res) {
        expect(res[imageId]).toBeTruthy();
        subscription.unsubscribe();
      }
    });
    component.onClicked(0, imageId);
    tick(500);
    component.onClicked(0, imageId);
    tick(700);
    component.onClicked(0, imageId);
    tick(900);
  }));
  it('triple click (remove favorite)',  fakeAsync(() => {
    const imageId = '0';
    const subscription: Subscription = imagesService.favorites.asObservable().pipe(take(2)).subscribe(res => {
      console.log('remove favorite', res);
      if (!!res){
        expect(res[imageId]).toBeTruthy();
        subscription.unsubscribe();
      }
    });
    tick(800);
    component.removeFromFavorite(imageId);
  }));
});
