import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { J2WCompiler } from './compiler';

// Mock the J2WCompiler class
jest.mock('./compiler', () => ({
  J2WCompiler: jest.fn().mockImplementation(() => ({
    validate: jest.fn(),
    compile: jest.fn(),
  })),
}));

// Mock fs module
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

describe('CLI', () => {
  let mockCompiler: jest.Mocked<J2WCompiler>;
  let mockProcessExit: jest.SpyInstance;
  let mockConsoleError: jest.SpyInstance;
  let mockConsoleLog: jest.SpyInstance;
  let program: Command;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Create a new instance of the mocked compiler
    mockCompiler = new J2WCompiler('') as jest.Mocked<J2WCompiler>;
    
    // Mock process.exit and console methods
    mockProcessExit = jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined) => {
      throw new Error(`process.exit(${code})`);
    });
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    // Create a new program instance for each test
    program = new Command();
  });

  afterEach(() => {
    // Restore all mocks
    mockProcessExit.mockRestore();
    mockConsoleError.mockRestore();
    mockConsoleLog.mockRestore();
  });

  describe('compile command', () => {
    it('should successfully compile valid JavaScript file', async () => {
      // Setup mocks
      (fs.readFileSync as jest.Mock).mockReturnValue('function add(a, b) { return a + b; }');
      mockCompiler.validate.mockReturnValue(true);
      mockCompiler.compile.mockResolvedValue(new Uint8Array([0, 1, 2, 3]));

      // Setup the program
      program
        .command('compile')
        .argument('<input>', 'Input JavaScript file')
        .option('-o, --output <file>', 'Output WebAssembly file', 'output.wasm')
        .action(async (input: string, options: { output: string }) => {
          try {
            const sourceCode = fs.readFileSync(input, 'utf-8');
            const compiler = new J2WCompiler(sourceCode);

            if (!compiler.validate()) {
              console.error('Error: Invalid JavaScript code');
              process.exit(1);
            }

            const wasmBinary = await compiler.compile();
            fs.writeFileSync(options.output, wasmBinary);
            console.log(`Successfully compiled to ${options.output}`);
          } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
            process.exit(1);
          }
        });

      // Execute the command
      await program.parseAsync(['node', 'cli.js', 'compile', 'input.js', '-o', 'output.wasm']);

      // Verify the results
      expect(fs.readFileSync).toHaveBeenCalledWith('input.js', 'utf-8');
      expect(mockCompiler.validate).toHaveBeenCalled();
      expect(mockCompiler.compile).toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalledWith('output.wasm', expect.any(Uint8Array));
      expect(mockConsoleLog).toHaveBeenCalledWith('Successfully compiled to output.wasm');
    });

    it('should handle invalid JavaScript code', async () => {
      // Setup mocks
      (fs.readFileSync as jest.Mock).mockReturnValue('invalid code');
      mockCompiler.validate.mockReturnValue(false);

      // Setup the program
      program
        .command('compile')
        .argument('<input>', 'Input JavaScript file')
        .option('-o, --output <file>', 'Output WebAssembly file', 'output.wasm')
        .action(async (input: string, options: { output: string }) => {
          try {
            const sourceCode = fs.readFileSync(input, 'utf-8');
            const compiler = new J2WCompiler(sourceCode);

            if (!compiler.validate()) {
              console.error('Error: Invalid JavaScript code');
              process.exit(1);
            }

            const wasmBinary = await compiler.compile();
            fs.writeFileSync(options.output, wasmBinary);
            console.log(`Successfully compiled to ${options.output}`);
          } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
            process.exit(1);
          }
        });

      // Execute the command and expect it to throw
      await expect(program.parseAsync(['node', 'cli.js', 'compile', 'input.js']))
        .rejects
        .toThrow('process.exit(1)');

      // Verify the results
      expect(mockConsoleError).toHaveBeenCalledWith('Error: Invalid JavaScript code');
    });

    it('should handle file read errors', async () => {
      // Setup mocks
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('File not found');
      });

      // Setup the program
      program
        .command('compile')
        .argument('<input>', 'Input JavaScript file')
        .option('-o, --output <file>', 'Output WebAssembly file', 'output.wasm')
        .action(async (input: string, options: { output: string }) => {
          try {
            const sourceCode = fs.readFileSync(input, 'utf-8');
            const compiler = new J2WCompiler(sourceCode);

            if (!compiler.validate()) {
              console.error('Error: Invalid JavaScript code');
              process.exit(1);
            }

            const wasmBinary = await compiler.compile();
            fs.writeFileSync(options.output, wasmBinary);
            console.log(`Successfully compiled to ${options.output}`);
          } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
            process.exit(1);
          }
        });

      // Execute the command and expect it to throw
      await expect(program.parseAsync(['node', 'cli.js', 'compile', 'nonexistent.js']))
        .rejects
        .toThrow('process.exit(1)');

      // Verify the results
      expect(mockConsoleError).toHaveBeenCalledWith('Error:', 'File not found');
    });

    it('should use default output filename if not specified', async () => {
      // Setup mocks
      (fs.readFileSync as jest.Mock).mockReturnValue('function add(a, b) { return a + b; }');
      mockCompiler.validate.mockReturnValue(true);
      mockCompiler.compile.mockResolvedValue(new Uint8Array([0, 1, 2, 3]));

      // Setup the program
      program
        .command('compile')
        .argument('<input>', 'Input JavaScript file')
        .option('-o, --output <file>', 'Output WebAssembly file', 'output.wasm')
        .action(async (input: string, options: { output: string }) => {
          try {
            const sourceCode = fs.readFileSync(input, 'utf-8');
            const compiler = new J2WCompiler(sourceCode);

            if (!compiler.validate()) {
              console.error('Error: Invalid JavaScript code');
              process.exit(1);
            }

            const wasmBinary = await compiler.compile();
            fs.writeFileSync(options.output, wasmBinary);
            console.log(`Successfully compiled to ${options.output}`);
          } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
            process.exit(1);
          }
        });

      // Execute the command
      await program.parseAsync(['node', 'cli.js', 'compile', 'input.js']);

      // Verify the results
      expect(fs.writeFileSync).toHaveBeenCalledWith('output.wasm', expect.any(Uint8Array));
    });
  });
}); 