import {
  WORLD,
  GREEN_WALL,
  RED_WALL,
  EMPTY,
  PLAYER,
  ELEMENT_SIZE,
  BLUE_WALL
} from '../world';
import Position from '../position';
import {
  MINIMAP_BASE_X,
  MINIMAP_BASE_Y,
  SCREEN_HEIGHT,
  SCREEN_WIDTH
} from '../config';
import {toRadians} from '../math/angle';

let itemsToRender = [];

class ItemToRender {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}

export const renderMinimap = player => {
  const renderer = document.querySelector('canvas').getContext('2d');
  itemsToRender = [];

  renderer.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.strokeStyle = '#000';
  renderer.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  for (let y = 0; y < WORLD.length; y++) {
    for (let x = 0; x < WORLD[y].length; x++) {
      checkWorldItems(x, y);
    }
  }
  for (let i = 0; i < itemsToRender.length; i++) {
    renderWorldItem(itemsToRender[i], renderer);
  }
  renderPlayer(player, renderer);
}

const checkWorldItems = (x, y) => {
  const element = WORLD[y][x];
  switch (element) {
    case GREEN_WALL:
    case RED_WALL:
    case BLUE_WALL:
      itemsToRender.push(
        new ItemToRender(x, y, element)
      );
      break;
    case EMPTY:
  }
}

const renderWorldItem = (item, renderer) => {
  switch (item.type) {
    case RED_WALL:
    case GREEN_WALL:
    case BLUE_WALL:
      renderToAdjacent(item, renderer, 1, 0);
      renderToAdjacent(item, renderer, 0, 1);
      renderToAdjacent(item, renderer, -1, 0);
      renderToAdjacent(item, renderer, 0, -1);
      break;
    default:
      console.error(`World item ${item.type} unknown`);
  }
};

const renderPlayer = (player, renderer) => {
  const position = coordinateFor(player.position.x, player.position.y);
  // console.debug(`render player at ${player.position.x}, ${player.position.y}`);
  renderer.beginPath();
  renderer.strokeStyle = colorFor(PLAYER);
  renderer.arc(position.x, position.y, ELEMENT_SIZE / 2, 0, 360);
  renderer.stroke();
  renderer.beginPath();
  renderer.moveTo(position.x, position.y);
  renderer.lineTo(
    position.x + 5 * Math.cos(toRadians(player.lookingToAngle)),
    position.y - 5 * Math.sin(toRadians(player.lookingToAngle))
  );
  renderer.stroke();
}

const renderToAdjacent = (item, renderer, offsetX, offsetY) => {
  if (typeof WORLD[item.y + offsetY] === 'undefined') {
    return;
  }
  const adjacentItem = WORLD[item.y + offsetY][item.x + offsetX];
  // console.debug(`{Position: ${item.x}, ${item.y}, Offset: ${offsetX}, ${offsetY}, Type of item: ${adjacentItem}`);
  if (typeof adjacentItem === 'undefined' || adjacentItem === EMPTY
    || adjacentItem === PLAYER) {
    return;
  }
  renderWall(item, offsetX, offsetY, renderer);
}

const renderWall = (item, offsetX, offsetY, renderer) => {
  const from = coordinateFor(item.x, item.y);
  const to = coordinateFor(item.x + offsetX, item.y + offsetY);
  renderer.beginPath();
  renderer.moveTo(from.x, from.y);
  renderer.strokeStyle = colorFor(item.type);
  renderer.lineTo(to.x, to.y);
  renderer.stroke();
}

const coordinateFor = (x, y) => new Position({
  x: MINIMAP_BASE_X + (x * ELEMENT_SIZE), y: MINIMAP_BASE_Y + (y * ELEMENT_SIZE)
});

const colorFor = itemType => {
  let color;
  switch (itemType) {
    case GREEN_WALL:
      color = 'green';
      break;
    case RED_WALL:
      color = 'red';
      break;
    case BLUE_WALL:
      color = 'blue';
      break;
    default:
      color = 'white';
  }
  return color;
}