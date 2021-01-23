import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  images;
  constructor(private activateRoute: ActivatedRoute,
              private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.images = this.activateRoute.snapshot.data.images;
    this.imagesService.setImages(this.images);
  }

}
