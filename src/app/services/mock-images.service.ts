import { ImagesService } from './images.service';
import { ImageModel } from '../models/image.model';
import { BehaviorSubject } from 'rxjs';

export class MockImagesService extends ImagesService {

  selectedImage: BehaviorSubject<ImageModel>;
  images: BehaviorSubject<ImageModel[]>;
  favorites: BehaviorSubject<{ [p: string]: any }>;

  setImages(images: ImageModel[]): void {
    super.setImages(images);
  }

  favoriteToggle(id: string): void {
    super.favoriteToggle(id);
  }

  setSelectedImage(index: number): void {
    super.setSelectedImage(index);
  }
}
