#!/usr/bin/env node

import { program } from 'commander';
import { J2WCompiler } from './compiler';
import * as fs from 'fs';
import * as path from 'path';

program
  .name('j2w')
  .description('JavaScript to WebAssembly Compiler')
  .version('1.0.0');

program
  .command('compile')
  .description('Compile JavaScript to WebAssembly')
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

program.parse(); 