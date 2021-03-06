import { BaseInitializableService } from './base-initializable.service';

describe('BaseInitializableService', () => {

  let service: BaseInitializableServiceSpec;

  beforeEach(() => {
    service = new BaseInitializableServiceSpec();
  })

  it('should create', () => {
    expect(service).toBeDefined();
  });

  it('should not be initialzed on creation', () => {
    expect(service.isInitialized()).toBeFalsy();
  });

  it('should initialize after calling', () => {
    service.markAsInitialized();
    expect(service.isInitialized()).toBeTruthy();
  });

  it('should wait for initialization', async () => {
    setTimeout(() => service.markAsInitialized(), 250);

    await service.waitUntilInitialized();
    expect(service.isInitialized()).toBeTruthy();
  });

  it('should pass if preInitialised', async () => {
    service.markAsInitialized();
    await service.waitUntilInitialized();
    expect(service.isInitialized()).toBeTruthy();
  });

  it('should catch errors', done => {
    service.createError();
    service.waitUntilInitialized().catch((e) => {
      expect(e).toBeDefined();
      done()
    });
  });
})

class BaseInitializableServiceSpec extends BaseInitializableService {
  public markAsInitialized(): void {
    super.markAsInitialized();
  }

  public createError(): void {
    this.isInitialized$ = null!;
  }
}
