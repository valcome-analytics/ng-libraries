import { BaseComponent } from '@valcome/ng-core';
import { FormGroup } from '@angular/forms';

export class BaseFormComponent extends BaseComponent {

  public form: FormGroup;
  public isLoading: boolean;
  public isSubmitted: boolean = false;

  public resetSubmission(): void {
    this.isSubmitted = false;
  }

  public submit(event: Event): Promise<boolean> {
    this.isSubmitted = true;
    this.form.markAllAsTouched();

    if (this.isFormValid()) {
      return Promise.resolve(true);
    } else {
      event.preventDefault();
      return Promise.resolve(false);
    }
  }

  public isFormValid(): boolean {
    return this.form.valid;
  }
}
