import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ImageModel } from '../models/image.model';
import { ImagesService } from '../services/images.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesListComponent implements OnInit, OnDestroy {
  sub: Subscription[] = [];
  images = new BehaviorSubject<ImageModel[]>([]);
  get Images(): Observable<ImageModel[]> {
    return this.images;
  }

  timeout = 2000;  // timer reset in ms
  touchtime = 0;
  clicked = 0;
  clickedId = '';
  lastClickedId;
  imageFilter = 0; // 0 = 'all', 1 = 'favorites';
  favorites = new BehaviorSubject<{ [k: string]: any }>({});
  get Favorites(): Observable<{ [k: string]: any }> {
    return this.favorites.asObservable();
  }
  constructor(
    private activityRoute: ActivatedRoute,
    private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.sub.push(this.imagesService.images.asObservable().subscribe(images => {
      if (!!images) { this.images.next(images); }
    }));
    this.sub.push(this.imagesService.favorites.asObservable().subscribe(favorites => {
      if (!!favorites) { this.favorites.next(favorites); }
    }));
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe());
  }

  onClicked(index: number, id: string): void {
    this.clicked++;
    this.clickedId = id;
    if (!this.lastClickedId) {
      this.lastClickedId = id;
    }
    this.imagesService.setSelectedImage(index);
    if (this.touchtime === 0) {
      // set first click
      this.touchtime = new Date().getTime();
    } else {
      if (((new Date().getTime()) - this.touchtime) < this.timeout && this.clicked === 3 && this.clickedId === this.lastClickedId) {
        this.imagesService.favoriteToggle(id);
        this.touchtime = 0;
        this.clicked = 0;
      } else if (((new Date().getTime()) - this.touchtime) > this.timeout) {
        this.clicked = 0;
        // not a triple click so set as a new first click
        this.touchtime = 0;
        this.clickedId = '';
      }
    }
    this.lastClickedId = id;
  }
  removeFromFavorite(id: string): void {
    let tempFavoriteArr = this.favorites.getValue();
    if (!tempFavoriteArr) {
      tempFavoriteArr = {};
    }
    if (tempFavoriteArr[id]) {
      this.imagesService.favoriteToggle(id);
    }
  }
}
