// Complex number operations
class Complex {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  add(other) {
    return new Complex(
      this.real + other.real,
      this.imaginary + other.imaginary
    );
  }

  subtract(other) {
    return new Complex(
      this.real - other.real,
      this.imaginary - other.imaginary
    );
  }

  multiply(other) {
    return new Complex(
      this.real * other.real - this.imaginary * other.imaginary,
      this.real * other.imaginary + this.imaginary * other.real
    );
  }

  magnitude() {
    return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
  }

  toString() {
    return `${this.real} + ${this.imaginary}i`;
  }
}

// Matrix operations
class Matrix {
  constructor(rows, cols, data = null) {
    this.rows = rows;
    this.cols = cols;
    this.data = data || new Array(rows * cols).fill(0);
  }

  get(row, col) {
    return this.data[row * this.cols + col];
  }

  set(row, col, value) {
    this.data[row * this.cols + col] = value;
  }

  multiply(other) {
    if (this.cols !== other.rows) {
      throw new Error('Matrix dimensions do not match for multiplication');
    }

    const result = new Matrix(this.rows, other.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.get(i, k) * other.get(k, j);
        }
        result.set(i, j, sum);
      }
    }
    return result;
  }

  toString() {
    let str = '';
    for (let i = 0; i < this.rows; i++) {
      str += '[';
      for (let j = 0; j < this.cols; j++) {
        str += this.get(i, j);
        if (j < this.cols - 1) str += ', ';
      }
      str += ']\n';
    }
    return str;
  }
}

// Export the classes
export {
  Complex,
  Matrix
}; 