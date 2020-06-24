import { Component, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { BaseProductImageGalleryComponent } from './base-product-image-gallery.component';

@Component({
  selector: 'val-product-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageGalleryComponent extends BaseProductImageGalleryComponent {

  public constructor(@Inject(PLATFORM_ID)  platformId: any) {
    super(platformId);
  }
}
