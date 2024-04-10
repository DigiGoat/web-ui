import * as TitleStrategy from './title.strategy';
describe('TitleStrategy', () => {
  let titleStrategy: typeof TitleStrategy;
  beforeEach(() => {
    titleStrategy = TitleStrategy;
  });
  describe('getParam()', () => {
    it('should find top-level params', () => {
      const route = {
        root: { children: [{ children: [], params: { test: 'TEST' } }] }
      };
      expect(titleStrategy.getParam('test', route as any)).toEqual('TEST');
    });
    it('should find second-level params', () => {
      const route = {
        root: { children: [{ children: [{ children: [], params: { test: 'TEST' } }] }] }
      };
      expect(titleStrategy.getParam('test', route as any)).toEqual('TEST');
    });
    it('should find third-level params', () => {
      const route = {
        root: { children: [{ children: [{ children: [{ children: [], params: { test: 'TEST' } }] }] }] }
      };
      expect(titleStrategy.getParam('test', route as any)).toEqual('TEST');
    });
    it('should return the param if no match is found', () => {
      const route = {
        root: { children: [{ children: [], params: { _test: 'TEST' } }] }
      };
      expect(titleStrategy.getParam('test', route as any)).toEqual(':test');
    });
    it('should handle empty children arrays', () => {
      const route = {
        root: { children: [] }
      };
      expect(titleStrategy.getParam('test', route as any)).toEqual(':test');
    });
  });
  describe('formatTitle()', () => {
    it('should find top-level params', () => {
      const route = {
        root: { children: [{ children: [], params: { test: 'TEST' } }] }
      };
      expect(titleStrategy.formatTitle(':test - TEST_TITLE', route as any)).toEqual('TEST · TEST_TITLE');
    });
    it('should find second-level params', () => {
      const route = {
        root: { children: [{ children: [{ children: [], params: { test: 'TEST' } }] }] }
      };
      expect(titleStrategy.formatTitle(':test - TEST_TITLE', route as any)).toEqual('TEST · TEST_TITLE');
    });
    it('should find third-level params', () => {
      const route = {
        root: { children: [{ children: [{ children: [{ children: [], params: { test: 'TEST' } }] }] }] }
      };
      expect(titleStrategy.formatTitle(':test - TEST_TITLE', route as any)).toEqual('TEST · TEST_TITLE');
    });
    it('should return the param if no match is found', () => {
      const route = {
        root: { children: [{ children: [], params: { _test: 'TEST' } }] }
      };
      expect(titleStrategy.formatTitle(':test - TEST_TITLE', route as any)).toEqual(':test · TEST_TITLE');
    });
    it('should handle empty children arrays', () => {
      const route = {
        root: { children: [] }
      };
      expect(titleStrategy.formatTitle(':test - TEST_TITLE', route as any)).toEqual(':test · TEST_TITLE');
    });
  });
});
