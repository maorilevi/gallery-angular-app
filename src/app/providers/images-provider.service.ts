import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageModel } from '../models/image.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ImagesProviderService {

  constructor(private http: HttpClient) {}

  getAllImages(): Observable<ImageModel[]> {
    return this.http.get(environment.apiUrl).pipe(map((images: any[]) => {
      return images;
    }));
  }
}
