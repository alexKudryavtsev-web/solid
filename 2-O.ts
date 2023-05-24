class Figure {
  calculateArea(): number {
    throw new Error("calculateArea is undefined");
  }
}

class Circle extends Figure {
  radius: number;

  constructor(radius: number) {
    super();

    this.radius = radius;
  }

  calculateArea() {
    return this.radius ** 2 * Math.PI;
  }
}

class Square extends Figure {
  edge: number;

  constructor(edge: number) {
    super();

    this.edge = edge;
  }

  calculateArea() {
    return this.edge ** 2;
  }
}

class Triangle extends Figure {
  a: number;
  b: number;
  c: number;

  constructor(a: number, b: number, c: number) {
    super();

    this.a = a;
    this.b = b;
    this.c = c;
  }

  calculateArea() {
    const p = (this.a + this.b + this.c) / 2;

    return (p * (p - this.a) * (p - this.b) * (p - this.c)) ** 0.5;
  }
}

class AreaCalculator {
  figures: Figure[];

  constructor(...figures: Figure[]) {
    this.figures = figures;
  }

  sumAreas() {
    return this.figures.reduce((sum, value) => sum + value.calculateArea(), 0);
  }
}

const triangle = new Triangle(3, 4, 5);
const square = new Square(2);
const circle = new Circle(Math.PI ** -0.5);

console.log(new AreaCalculator(triangle, square, circle).sumAreas());
