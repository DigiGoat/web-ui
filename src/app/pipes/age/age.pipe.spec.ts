import { AgePipe } from './age.pipe';

describe('AgePipe', () => {
  let pipe: AgePipe;
  const consoleSpy = jest.spyOn(console, 'warn');
  beforeAll(() => {
    pipe = new AgePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return the original value if it isn\'t a valid date', () => {
    expect(pipe.transform('Invalid Date')).toBe('Invalid Date');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to parse age from date:', 'Invalid Date', 'With error:', new Error('Failed to parse date'));
  });
  it('should return the original value if the value is a date in the future', () => {
    expect(pipe.transform(getDate(-1))).toBe(getDate(-1));
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to parse age from date:', getDate(-1), 'With error:', new Error('Provided date is in the future'));
  });
  describe('should return ages less than a week old in days', () => {
    test.each([0, 1, 6])('day %i', (day) => {
      expect(pipe.transform(getDate(day))).toContain('day');
    });
  });
  describe('should return ages less than 5 weeks old in weeks', () => {
    test.each([7, 8, 34])('day %i', (day) => {
      expect(pipe.transform(getDate(day))).toContain('week');
    });
  });
  describe('should return ages less than 1 year old in months', () => {
    test.each([105, 106, 364])('day %i', (day) => {
      expect(pipe.transform(getDate(day))).toContain('month');
    });
  });
  describe('should return any ages over 1 year in years', () => {
    test.each([365, 366])('day %i', (day) => {
      expect(pipe.transform(getDate(day))).toContain('year');
    });
  });
});
function getDate(daysAgo: number) {
  return new Date(Date.now() - (1000 * 3600 * 24 * daysAgo)).toString();
}
