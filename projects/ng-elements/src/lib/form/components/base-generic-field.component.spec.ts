import { BaseGenericFieldComponent } from './base-generic-field.component';
import { Subject } from 'rxjs';
import { FormErrorType } from '../model/form-error-type';
import createSpy = jasmine.createSpy;

describe('BaseGenericFieldComponent', () => {

  let component: BaseGenericFieldComponent;
  let valueChange: Subject<any> = new Subject<any>();

  let formControlSpy: any = {
    valueChanges: valueChange.asObservable(),
    hasError: createSpy('hasError').and.returnValue(false),
    valid: false
  };

  beforeEach(() => {
    component = new BaseGenericFieldComponent();
    component.formName = 'field';
    component.form = getMockedFormGroup();
    component.errorMessages = [] as any;
  });

  afterEach(() => {
    component.ngOnDestroy();
  })

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should init with id and formControl', () => {
    component.ngOnInit();
    expect(component.id).toEqual('fieldInput');
    expect(component.isValid).toBeFalsy();
  });

  it('should validate form if submitted', () => {
    formControlSpy.valid = true;
    component.ngOnInit();

    component.ngOnChanges({ isFormSubmitted: { currentValue: true } } as any);

    expect(component.isValid).toBeTruthy();
  });

  it('should listen on changes and validate control', () => {
    formControlSpy.valid = true;
    component.ngOnInit();

    valueChange.next();

    expect(component.isValid).toBeTruthy();
  });

  it('should display and show error messages accordingly', () => {
    let showMessageSpy = createSpy('showMessage');
    let hideMessageSpy = createSpy('hideMessage');
    component.errorMessages = getMockedErrorMessages(showMessageSpy, hideMessageSpy);
    formControlSpy.hasError.withArgs(FormErrorType.MAX_LENGTH).and.returnValue(true);
    component.ngOnInit();

    valueChange.next();

    expect(showMessageSpy).toHaveBeenCalledTimes(1);
    expect(hideMessageSpy).toHaveBeenCalledTimes(2);
  });

  function getMockedFormGroup(): any {
    return {
      get: () => formControlSpy
    }
  }

  function getMockedErrorMessages(showMessageSpy: jasmine.Spy, hideMessageSpy: jasmine.Spy): any {
    return [
      { errorType: FormErrorType.REQUIRED, hideError: hideMessageSpy, showError: showMessageSpy },
      { errorType: FormErrorType.MAX_LENGTH, hideError: hideMessageSpy, showError: showMessageSpy },
      { errorType: FormErrorType.PATTERN, hideError: hideMessageSpy, showError: showMessageSpy }
    ];
  }
});