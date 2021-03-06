import { Inject, Injectable } from '@angular/core';
import { RenderService } from '@valcome/ng-core';
import { INotyfOptions, Notyf } from 'notyf';
import { TOASTER_OPTIONS, ToasterModule } from './toaster.module';

// @dynamic
@Injectable({ providedIn: ToasterModule })
export class ToasterService {

  public readonly toaster!: Notyf;

  public constructor(@Inject(TOASTER_OPTIONS) options: Partial<INotyfOptions>,
                     private renderService: RenderService) {
    if (this.renderService.isBrowser()) {
      this.toaster = new Notyf(options);
    }
  }
}
