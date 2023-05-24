_SOLID - это принципы, позволяющие создавать масштабируемый и поддерживаемый код._ Он подходит для всех ЯП, независимо от его парадигм: ООП, ФП, процедурное.

# S - single responsibility

Принцип единой ответственности. 

Каждая сущность должна отвечать за одну операцию.

![single responsibility](https://hsto.org/webt/ug/2v/ts/ug2vtsbxvspdx0elsmexemp3kxm.png)

Пример:

```js
class Robot {}

class Cook extends Robot {
  cook() {
    console.log("Готовим");
  }
}

class Gardener extends Robot {
  serveGarden() {
    console.log("Работаем над садом");
  }
}

class Driver extends Robot {
  drive() {
    console.log("Водим машину");
  }
}

class Painter extends Robot {
  paint() {
    console.log("I see a red door and I want it painted black");
  }
}

const cooker = new Cook();
cooker.cook();

const gardener = new Gardener();
gardener.serveGarden();

const driver = new Driver();
driver.drive();

const painter = new Painter();
painter.paint();
```

# O - Open-closed

Сущности можно только расширять - модифицировать нельзя.

![open-closed](https://hsto.org/webt/ir/sm/eb/irsmeboddq2dcx1eaky5qo83v64.png)

Пример:

```js
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
```

# L - Liskov Substitution

Сущность потомок должна выполнять все методы родителя. В противном случае надо вводить новый слой.

![liskov substitution](https://habrastorage.org/webt/hj/dt/a-/hjdta-bs2bvk2ga_dabxajfqjnk.png)

```js
// Base class
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// First layer
class OfficeWorker extends Person {
  work() {
    console.log(`${this.name} полноценно работает`);
  }
}

class DevOps extends OfficeWorker {
  constructor() {
    super("DevOps");
  }
}

class Developer extends OfficeWorker {
  constructor() {
    super("Developer");
  }
}

class ProjectManager extends OfficeWorker {
  constructor() {
    super("Project Manager");
  }
}

// Second layer
class OutstaffingWorker extends Person {
  help() {
    console.log(`${this.name} помогает`);
  }
}

class Lawyer extends OutstaffingWorker {
  constructor() {
    super("Lawyer");
  }
}

// Benefit
class Project {
  constructor(
    private readonly office: OfficeWorker[],
    private readonly outstaffing: OutstaffingWorker[]
  ) {}

  createJob() {
    this.office.forEach((employee) => employee.work());
    this.outstaffing.forEach((employee) => employee.help());
  }
}

const pm = new ProjectManager();
const developer = new Developer();

const layer = new Lawyer();

const project = new Project([pm, developer], [layer]);

project.createJob();
```

# I - interface segregation

Принцип разделения интерфейса.

Класс, который не использует методы базового класса, не должен от него наследоваться. В таком случае нужно использовать композицию.

![interface segregation](https://habrastorage.org/webt/v8/co/dn/v8codny8xpy355zcqvfro-7ep8a.png)

Пример:

```js
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
```

# D - Dependency Inversion

Принцип инверсии зависимостей.

Класс не должен соединяться с инструментом, который использует для своей работы. Вместо этого он должен быть соединен с интерфейсом, который поможет установить связь между инструментом и классом.

![dependency inversion](https://habrastorage.org/webt/du/7r/0u/du7r0use6rfrrqr8wc9a2qcvf2y.png)

Пример:

```js
interface MoneyTransferClient {
  transfer: () => any;
}

class PayPalClient implements MoneyTransferClient {
  transfer() {
    console.log("Работаем с PayPal");
  }
}

class BitcoinClient implements MoneyTransferClient {
  transfer() {
    console.log("Работаем с Bitcoin");
  }
}

class Marketplace {
  constructor(private readonly moneyTransferClient: MoneyTransferClient) {}

  buyApp() {
    this.moneyTransferClient.transfer();
  }
}

const market = new Marketplace(new PayPalClient());

market.buyApp();
```