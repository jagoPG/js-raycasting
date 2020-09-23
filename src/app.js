import {renderMinimap} from './cameras/minimap-renderer';
import {PLAYER, WORLD} from './world';
import Position from './position';
import Player from './player';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from './config';
import {renderNormal} from './cameras/first-person-renderer';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

let isFirstPersonCamera = true;

const init = () => {
  const player = new Player({defaultPosition: initialPositionForPlayer()});
  // console.debug(player);
  setUpWindow();
  registerControls(player);
  renderNormal(player);
};

const setUpWindow = () => {
  const canvas = document.querySelector('canvas');
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
};

const registerControls = (player) => {
  window.addEventListener('keydown', (evt) => {
    switch (evt.key.toLowerCase()) {
      case 'd':
        player.turnRight();
        render(player);
        break;
      case 'a':
        player.turnLeft();
        render(player);
        break;
      case 'w':
        player.moveForward();
        render(player);
        break;
      case 's':
        player.moveBackward();
        render(player);
        break;
      case 'p':
        console.debug(
          `Switch camera to ${isFirstPersonCamera ? 'FirstPerson' : 'MAP'}`);
        isFirstPersonCamera = !isFirstPersonCamera;
        render(player);
        break;
    }
  });
};

const render = (player) =>
  isFirstPersonCamera ? renderNormal(player) : renderMinimap(player);

const initialPositionForPlayer = () => {
  for (let i = 0; i < WORLD.length; i++) {
    for (let j = 0; j < WORLD[i].length; j++) {
      if (WORLD[i][j] === PLAYER) {
        return new Position({x: j, y: i});
      }
    }
  }
};
