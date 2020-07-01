import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

import { animate, style, transition, trigger } from '@angular/animations';

export const flyInOut = trigger('flyInOut', [
  transition('void => *', [
    style({
      transform: 'scale(0) translateX(15px)',
      opacity: 1
    }),
    animate('1s cubic-bezier(0.3, 1, 0.32, 1)')
  ]),
  transition('* => void', [
    animate('0.8s cubic-bezier(0.3, 1, 0.32, 1)', style({
      transform: 'scaleX(1) translateX(15px)',
      opacity: 0
    }))
  ])
]);

@Component({
  selector: 'notyf-toast',
  template: `{{message}}`,
  animations: [flyInOut],
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input()
  message: string;
  @Input()
  type: ToastType;

  @HostBinding('class.notyf--success') success: boolean;
  @HostBinding('class.notyf--error') error: boolean;
  @HostBinding('class.notyf--warning') warning: boolean;
  @HostBinding('class.notyf--info') info: boolean;
  @HostBinding('@flyInOut') animation;

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
    this.success = this.type === ToastType.Success;
    this.error = this.type === ToastType.Error;
    this.warning = this.type === ToastType.Warning;
    this.info = this.type === ToastType.Info;
  }
}

export enum ToastType {
  Success, Error, Warning, Info
}
