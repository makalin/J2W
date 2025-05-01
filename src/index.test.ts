import { J2WCompiler } from './compiler';

describe('J2W Module', () => {
  it('should export the J2WCompiler class', () => {
    expect(J2WCompiler).toBeDefined();
    expect(typeof J2WCompiler).toBe('function');
  });

  it('should create a new instance of J2WCompiler', () => {
    const compiler = new J2WCompiler('function test() {}');
    expect(compiler).toBeInstanceOf(J2WCompiler);
  });

  it('should have the required methods', () => {
    const compiler = new J2WCompiler('function test() {}');
    expect(typeof compiler.validate).toBe('function');
    expect(typeof compiler.compile).toBe('function');
  });
}); 