export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.queue = [];
    this.passengers = [];
    this.stops = 0
    this.floorsTraversed = 0
  }

  reset() {
    this.currentFloor = 0;
    this.queue = [];
    this.passengers = [];
    this.stops = 0;
    this.floorsTraversed = 0
  }

  goToFloor(person) {
    this.queue.push(person);

    while (this.currentFloor < person.currentFloor) {
      this.currentFloor++;
      this.floorsTraversed++;
    }
    this.passengers.push(person.name);
    this.stops++;

    while (this.currentFloor > person.dropOffFloor) {
      this.currentFloor--;
      this.floorsTraversed++;
    }

    while (this.currentFloor < person.dropOffFloor) {
      this.currentFloor++;
      this.floorsTraversed++;
    }
    this.stops++;
  }
}
