import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { J2WCompiler } from '../dist/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runDemo() {
  console.log('J2W Demo\n');

  // Simple demo
  console.log('Simple Demo:');
  try {
    const simpleCode = fs.readFileSync(path.join(__dirname, 'simple.js'), 'utf-8');
    const simpleCompiler = new J2WCompiler(simpleCode);
    
    if (simpleCompiler.validate()) {
      console.log('✓ Simple code validation passed');
      try {
        const simpleWasm = await simpleCompiler.compile();
        fs.writeFileSync(path.join(__dirname, 'simple.wasm'), simpleWasm);
        console.log('✓ Simple code compiled to WebAssembly');
      } catch (error) {
        console.error('✗ Simple code compilation failed:', error.message);
        process.exit(1);
      }
    } else {
      console.error('✗ Simple code validation failed');
      process.exit(1);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('✗ Simple demo file not found:', error.message);
    } else {
      console.error('✗ Error reading simple demo file:', error.message);
    }
    process.exit(1);
  }

  console.log('\nComplex Demo:');
  try {
    const complexCode = fs.readFileSync(path.join(__dirname, 'complex.js'), 'utf-8');
    const complexCompiler = new J2WCompiler(complexCode);
    
    if (complexCompiler.validate()) {
      console.log('✓ Complex code validation passed');
      try {
        const complexWasm = await complexCompiler.compile();
        fs.writeFileSync(path.join(__dirname, 'complex.wasm'), complexWasm);
        console.log('✓ Complex code compiled to WebAssembly');
      } catch (error) {
        console.error('✗ Complex code compilation failed:', error.message);
        process.exit(1);
      }
    } else {
      console.error('✗ Complex code validation failed');
      process.exit(1);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('✗ Complex demo file not found:', error.message);
    } else {
      console.error('✗ Error reading complex demo file:', error.message);
    }
    process.exit(1);
  }
}

runDemo().catch(error => {
  console.error('✗ Unexpected error:', error.message);
  process.exit(1);
}); 