import {toRadians} from './math/angle';
import {BASE_WORLD, PLAYER, WORLD} from './world';

export default class Player {
  constructor({defaultPosition}) {
    this.position = defaultPosition;
    this.lookingToAngle = 90;
  }

  moveForward() {
    const oldX = this.position.x;
    const oldY = this.position.y;
    const newX = Math.round(
      this.position.x + Math.cos(toRadians(this.lookingToAngle))
    );
    const newY = Math.round(
      this.position.y - Math.sin(toRadians(this.lookingToAngle))
    );
    if (this.isValidCoordinate(newX,  newY)) {
      this.updatePosition(newX, newY, oldX, oldY);
    }
  }

  moveBackward() {
    const oldX = this.position.x;
    const oldY = this.position.y;
    const newX = Math.round(
      this.position.x - Math.cos(toRadians(this.lookingToAngle))
    );
    const newY = Math.round(
      this.position.y + Math.sin(toRadians(this.lookingToAngle))
    );
    if (this.isValidCoordinate(newX,  newY)) {
      this.updatePosition(newX, newY, oldX, oldY);
    }
  }

  updatePosition(newX, newY, oldX, oldY) {
    this.position.x = newX;
    this.position.y = newY;
    WORLD[oldY][oldX] = BASE_WORLD[oldY][oldX];
    WORLD[this.position.y][this.position.x] = PLAYER;
  }

  turnRight() {
    this.lookingToAngle -= 10;
    this.lookingToAngle = correctAngle(this.lookingToAngle);
  }

  turnLeft() {
    this.lookingToAngle += 10;
    this.lookingToAngle = correctAngle(this.lookingToAngle);
  }

  toString() {
    return `{position: ${this.position.toString()}, lookingToAngle: ${this.lookingToAngle}`;
  }

  isValidCoordinate(newX, newY) {
    return newX > 0 && newY > 0
      && newY < WORLD.length - 1 && newX < WORLD[newY].length - 1;
  }
}

const correctAngle = angle => {
  let newAngle;
  if (angle > 360) {
    newAngle = angle - 360;
  } else if (angle < 0) {
    newAngle = angle + 360;
  } else {
    newAngle = angle;
  }
  return newAngle;
}
