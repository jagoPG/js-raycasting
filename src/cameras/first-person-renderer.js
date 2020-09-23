import {SCREEN_HEIGHT, SCREEN_WIDTH, VISION_ANGLE} from '../config';
import {BLUE_WALL, EMPTY, GREEN_WALL, RED_WALL, WORLD} from '../world';
import {toRadians} from '../math/angle';

const renderNormal = player => {
  const canvas = document.querySelector('canvas').getContext('2d');
  canvas.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  canvas.strokeStyle = '#000';
  canvas.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  let x = SCREEN_WIDTH;
  let anglePerXAccumulator = player.lookingToAngle - (VISION_ANGLE / 2);
  const anglePerPixel = VISION_ANGLE / SCREEN_WIDTH;
  do {
    const collidingObject = collideRayWithWall(
      player.position, anglePerXAccumulator
    );
    print(collidingObject, canvas, x);
    anglePerXAccumulator += anglePerPixel;
    x -= 1;
  } while (x > 0);
};

const print = (collidingObject, canvas, x) => {
  const distance = collidingObject.distance;
  const SCREEN_OUTLINE = (SCREEN_HEIGHT / 4);
  const wallOutline = ((SCREEN_HEIGHT - SCREEN_OUTLINE) / distance);
  const ceilingY = SCREEN_HEIGHT / 2 - wallOutline / 2;
  const floorY = SCREEN_HEIGHT / 2 + wallOutline / 2;

  canvas.beginPath();
  canvas.strokeStyle = colorOf(collidingObject.object);
  canvas.shadowColor = `rgba(0,0,0,${darkenAlpha(distance)}`;
  canvas.shadowBlur = 16;
  canvas.moveTo(x, ceilingY);
  canvas.lineTo(x, floorY);
  canvas.stroke();
};

const darkenAlpha = distance => .20 * distance;

const colorOf = object => {
  let color;
  switch (object) {
    case RED_WALL:
      color = '#ff0000';
      break;
    case GREEN_WALL:
      color = '#00ff00';
      break;
    case BLUE_WALL:
      color = '#0000ff';
      break;
  }
  return color;
};

const getItemFor = ({x, y}) => {
  return WORLD[y][x] || EMPTY;
};

const collideRayWithWall = (playerPosition, lookingAngle) => {
  let object;
  let distanceToWall = 0;
  let intersectsWithWall;
  do {
    distanceToWall += 0.01;
    object = intersectsRayWithWall(
      playerPosition, lookingAngle, distanceToWall
    );
    intersectsWithWall = object === RED_WALL || object === GREEN_WALL
      || object === BLUE_WALL;
  } while ((!intersectsWithWall));
  return {object: object, distance: distanceToWall};
};

const intersectsRayWithWall = (rayPosition, angle, amount) => {
  // console.debug(`IntersectsRayWithWall: {rayPosition: ${rayPosition.toString()}, angle: ${angle}, amount: ${amount}`);
  const
    newX = Math.round(rayPosition.x + amount * Math.cos(toRadians(angle))),
    newY = Math.round(rayPosition.y - amount * Math.sin(toRadians(angle)));
  // console.debug([newX,  newY]);
  return getItemFor({x: newX, y: newY});
};

export {renderNormal};
