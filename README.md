# J2W – JavaScript to WebAssembly Compiler

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Build](https://img.shields.io/github/actions/workflow/status/makalin/J2W/build.yml?branch=main)](https://github.com/makalin/j2w/actions) [![npm version](https://img.shields.io/npm/v/j2w.svg)](https://www.npmjs.com/package/j2w) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/makalin/J2W/pulls) [![Made with Love](https://img.shields.io/badge/made%20with-love-red.svg)](https://github.com/makalin/J2W)

**J2W** is a high-performance compiler that converts JavaScript into WebAssembly (WASM), enabling fast, portable, and secure execution across **frontend** and **backend** environments.

## Features

- **Compile JS to WASM** for browser and server environments  
- **Optimized output** for performance-critical applications  
- Supports **modular builds** and custom JS subsets  
- Integrates easily with **Node.js**, **Deno**, and **browser runtimes**  
- Optional CLI and API interfaces
- **TypeScript support** for better type safety
- Comprehensive **test coverage** and linting
- Modern development workflow with **ES modules**

## Why J2W?

JavaScript is everywhere. But for performance, size, and security, **WebAssembly** is the future. J2W bridges the gap—bringing the best of both worlds to your stack.

## Quick Start

### Installation

```bash
npm install -g j2w
```

Or use it directly via CLI:

```bash
npx j2w compile yourfile.js -o output.wasm
```

### Basic Usage

```bash
j2w compile hello.js -o hello.wasm
```

Use the generated `.wasm` in browser or backend environments like so:

### Browser

```html
<script type="module">
  const wasm = await WebAssembly.instantiateStreaming(fetch('hello.wasm'));
  console.log(wasm.instance.exports.main());
</script>
```

### Node.js

```js
const fs = require('fs');
const wasmBuffer = fs.readFileSync('./hello.wasm');
WebAssembly.instantiate(wasmBuffer).then(({ instance }) => {
  console.log(instance.exports.main());
});
```

## Documentation

For detailed documentation, including API reference, architecture, and development guidelines, please see [DETAILED_DOCUMENTATION.md](docs/DETAILED_DOCUMENTATION.md).

## Development

```bash
# Clone the repository
git clone https://github.com/makalin/J2W.git
cd J2W

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Development mode
npm run dev
```

## Roadmap

- [x] Basic JavaScript to WASM compilation
- [x] CLI interface
- [x] TypeScript support
- [x] Test coverage
- [ ] Support full JS subset
- [ ] WASI support for backend
- [ ] REPL and playground
- [ ] VSCode extension

## Contributing

Contributions are welcome! Please see our [Contributing Guide](docs/DETAILED_DOCUMENTATION.md#contributing) for details.

## License

MIT
