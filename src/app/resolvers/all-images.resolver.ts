import { ImageModel } from '../models/image.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagesProviderService } from '../providers/images-provider.service';

@Injectable({providedIn: 'root'})
export class AllImagesResolver implements Resolve<ImageModel[]>{
  constructor(private service: ImagesProviderService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ImageModel[]> {
    return this.service.getAllImages();
  }

}
