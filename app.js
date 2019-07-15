const feathers = require('@feathersjs/feathers');

class Day {
  constructor() {
    this.tasks = [];
    this.taskId = 0;
  }

  async find(params) {
    // Return all of a day's tasks
    return this.tasks;
  }

  async create(data, params) {
    // Create a new task and assign it a fresh id
    const task = Object.assign(
      {
        id: ++this.taskId
      },
      data
    );

    this.tasks.push(task);

    return task;
  }

  async remove(id, params) {
    // Get a task by id and get rid of it
    const task = await this.get(id);
    const index = this.tasks.indexOf(task);

    this.task.splice(index, 1);

    return task;
  }
}

const app = feathers();

app.use('day', new Day());

async function processTasks() {
  await app.service('day').create({
    taskName: 'turn water to wine',
    completed: false
  });

  await app.service('day').create({
    taskName: 'make fish from loaves',
    completed: false
  });

  const taskList = await app.service('day').find();

  console.log(taskList);
}

processTasks();
