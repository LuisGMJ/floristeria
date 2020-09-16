import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(image: string): string {

    if (!image) {
      return 'assets/img/no-image.png';
    }

    return image;
    
  }

}
