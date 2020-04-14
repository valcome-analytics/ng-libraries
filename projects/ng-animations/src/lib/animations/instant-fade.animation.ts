import { animate, style, transition, trigger } from '@angular/animations';

export const instantFadeIn = trigger('instantFadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(100, style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate(100, style({ opacity: 0 }))
  ])
]);
