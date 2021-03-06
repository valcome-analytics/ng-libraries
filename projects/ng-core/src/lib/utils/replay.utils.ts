import { ReplaySubject } from 'rxjs';

// @dynamic
export class ReplayUtils {
  public static toPromise<T>(replaySubject: ReplaySubject<T>): Promise<T> {
    return new Promise<T>(resolve => {
      // TODO should you unsubscribe?
      replaySubject.subscribe(value => resolve(value));
    });
  }
}
