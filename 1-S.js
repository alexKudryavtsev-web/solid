// Single responsibility Principle

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
