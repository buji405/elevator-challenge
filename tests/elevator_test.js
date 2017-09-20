require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Person', () => {

  it('A person should have a name, current floor and requested floor', () => {
    let person = new Person('Brittany', 7, 6);
    assert.equal(person.name, 'Brittany')
    assert.equal(person.currentFloor, 7)
    assert.equal(person.dropOffFloor, 6)
  })
})

describe('Elevator', () => {
  let elevator = new Elevator();

  beforeEach(() => {
    elevator.reset();
  });

  it('should have default properties', () => {
    assert.equal(elevator.currentFloor, 0);
    assert.deepEqual(elevator.queue, []);
    assert.deepEqual(elevator.passengers, []);
    assert.equal(elevator.stops, 0);
    assert.equal(elevator.floorsTraversed, 0);
  });

  it('should reset properties when reset is called', () => {
    elevator.currentFloor = 2;
    elevator.queue = [2,3,4];
    elevator.passengers = ['ciara', 'britbrit', 'roberto'];
    elevator.stops = 3;
    elevator.floorsTraversed = 5;

    elevator.reset()

    assert.equal(elevator.currentFloor, 0);
    assert.deepEqual(elevator.queue, []);
    assert.deepEqual(elevator.passengers, []);
    assert.equal(elevator.stops, 0);
    assert.equal(elevator.floorsTraversed, 0);

  });

  it('should go to a passengers current floor then drop off at a lower floor', () => {
    let person = new Person('Barb', 7, 6);
    elevator.currentFloor = 2;
    elevator.goToFloor(person);
    assert.equal(elevator.currentFloor, 6);
    assert.equal(elevator.floorsTraversed, 6);
    assert.equal(elevator.stops, 2);
    assert.equal(elevator.queue.length, 1);
    assert.equal(elevator.passengers.length, 1);
  })

  it('should go to a passengers current floor then drop off at a higher floor', () => {
    let person = new Person('Santa', 5, 10);
    elevator.currentFloor = 3;
    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 10);
    assert.equal(elevator.floorsTraversed, 7);
    assert.equal(elevator.stops, 2);
    assert.equal(elevator.queue.length, 1);
    assert.equal(elevator.passengers.length, 1);
  });

  it('should pick up and drop off multiple people ', () => {
    let person1 = new Person('Shaniqua', 5, 8);
    let person2 = new Person('Dr. Dre', 7, 10);

    elevator.goToFloor(person1);
    assert.deepEqual(elevator.passengers, ['Shaniqua']);
    assert.equal(elevator.queue.length, 1);
    assert.equal(elevator.stops, 2);
    assert.equal(elevator.floorsTraversed, 8);
    assert.equal(elevator.currentFloor, 8);
    assert.equal(person1.dropOffFloor, 8);

    elevator.goToFloor(person2);
    assert.deepEqual(elevator.passengers, ['Shaniqua', 'Dr. Dre']);
    assert.equal(elevator.queue.length, 2);
    assert.equal(elevator.stops, 4);
    assert.equal(elevator.floorsTraversed, 10);
    assert.equal(elevator.currentFloor, 10);
    assert.equal(person2.dropOffFloor, 10);
  })
});
