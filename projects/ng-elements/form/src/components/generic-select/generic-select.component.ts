import { ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { DisplayValue } from '@valcome/ng-core';
import { BaseGenericFieldComponent } from '../base-generic-field.component';
import { JsUtils } from '../../../../../ts-core/src/lib/utils/js.utils';

@Component({
  selector: 'val-generic-select',
  templateUrl: './generic-select.component.html',
  styleUrls: ['../base-styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenericSelectComponent extends BaseGenericFieldComponent {

  private _options: DisplayValue<any>[] = [];

  @Input()
  public set options(options: DisplayValue<any>[]) {
    this._options = options;

    // fixes value reset after displays have changed
    JsUtils.callAfterStackResolved(() => this.formControl.setValue(this.formControl.value));
  }

  public get options(): DisplayValue<any>[] {
    return this._options;
  }

  @Input()
  public label!: string;

  @Input()
  public placeholder!: string;

  public constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

}
