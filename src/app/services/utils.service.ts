import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  loadingError(error) {
    if (error) {
      alert('Error while loading the list of products');
    }
  }
}
