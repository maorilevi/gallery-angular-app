import { Injectable } from '@angular/core';
import { ImageModel } from '../models/image.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ImagesService {
  constructor() {}
  selectedImage = new BehaviorSubject<ImageModel>(null);
  images = new BehaviorSubject<ImageModel[]>(null);
  favorites = new BehaviorSubject<{ [k: string]: any }>(null);
  setImages(images: ImageModel[]): void {
    this.images.next(images);
    if (!!images) { this.setSelectedImage(0); }
  }
  favoriteToggle(id: string): void {
    let updatedFavorites = this.favorites.getValue();
    if (!updatedFavorites) { updatedFavorites = {}; }
    updatedFavorites[id] = !updatedFavorites[id];
    this.favorites.next(updatedFavorites);

  }
  setSelectedImage(index: number): void {
    const imagesTemp = this.images.getValue();
    if (!!imagesTemp) {
      const selectedImageTemp: ImageModel = imagesTemp[index];
      this.selectedImage.next(selectedImageTemp);
    }
  }
}
