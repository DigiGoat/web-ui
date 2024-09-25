import { LongDatePipe } from './longDate.pipe';

describe('LongDatePipe', () => {
  it('create an instance', () => {
    const pipe = new LongDatePipe();
    expect(pipe).toBeTruthy();
  });
});
