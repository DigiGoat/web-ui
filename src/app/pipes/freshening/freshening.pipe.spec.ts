import { FresheningPipe } from './freshening.pipe';

describe('FresheningPipe', () => {
  let pipe: FresheningPipe;

  beforeEach(() => {
    pipe = new FresheningPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return empty string for empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return "1st" for 1', () => {
    expect(pipe.transform(1)).toBe('1st');
  });

  it('should return "2nd" for 2', () => {
    expect(pipe.transform(2)).toBe('2nd');
  });

  it('should return "3rd" for 3', () => {
    expect(pipe.transform(3)).toBe('3rd');
  });

  it('should return "4th" for 4', () => {
    expect(pipe.transform(4)).toBe('4th');
  });

  it('should return "11th" for 11', () => {
    expect(pipe.transform(11)).toBe('11th');
  });

});
