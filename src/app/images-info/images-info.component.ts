import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ImageModel } from '../models/image.model';
import { ImagesService } from '../services/images.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-images-info',
  templateUrl: './images-info.component.html',
  styleUrls: ['./images-info.component.scss']
})
export class ImagesInfoComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedImage = new BehaviorSubject<ImageModel>(null);
  get SelectedImage(): Observable<ImageModel> {
    return this.selectedImage.asObservable();
  }
  sub: Subscription[] = [];
  constructor(
    private renderer: Renderer2,
    private activityRoute: ActivatedRoute, private imagesService: ImagesService) { }


  ngOnInit(): void {
    this.sub.push(this.imagesService.selectedImage.asObservable().subscribe(selectedImage => {
      if (!!selectedImage) {
        this.selectedImage.next(selectedImage);
      } else {
        this.selectedImage.next(null);
      }
    }));
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe());
  }
}
