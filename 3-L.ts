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
