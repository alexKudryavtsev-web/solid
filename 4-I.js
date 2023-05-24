class Robot {
  constructor(name) {
    this.name = name;
  }
}

const swimmer = {
  swim() {
    console.log(`${this.name} умеет плавать`);
  },
};

const walker = {
  walker() {
    console.log(`${this.name} умеет ходить`);
  },
};

const flier = {
  walker() {
    console.log(`${this.name} умеет летать`);
  },
};

class Dog extends Robot {}
class Eagle extends Robot {}

Object.assign(Dog.prototype, walker, swimmer);
Object.assign(Eagle.prototype, flier, walker);

const scooby = new Dog("Скуби-ду");

scooby.walker();
scooby.swim();

scooby.fly(); // вызовет ошибку
