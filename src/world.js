const
  EMPTY = 0,
  GREEN_WALL = 1,
  RED_WALL = 2,
  BLUE_WALL = 3,
  PLAYER = 17;

const
  ELEMENT_SIZE = 8,
  ROOM_HEIGHT = 90;

const WORLD = [
  [GREEN_WALL, GREEN_WALL,  GREEN_WALL,   GREEN_WALL,   GREEN_WALL,   GREEN_WALL,   GREEN_WALL,   GREEN_WALL,   GREEN_WALL, GREEN_WALL, GREEN_WALL, GREEN_WALL, GREEN_WALL, GREEN_WALL, GREEN_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        RED_WALL,     RED_WALL,     RED_WALL,     EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      RED_WALL,   RED_WALL,   RED_WALL,   EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        RED_WALL,     EMPTY,        RED_WALL,     PLAYER,       EMPTY,        EMPTY,        EMPTY,      EMPTY,      RED_WALL,   EMPTY,      RED_WALL,   EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        RED_WALL,     RED_WALL,     RED_WALL,     EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      RED_WALL,   RED_WALL,   RED_WALL,   EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [BLUE_WALL, EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,        EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      EMPTY,      BLUE_WALL],
  [GREEN_WALL, GREEN_WALL,  GREEN_WALL,   GREEN_WALL,   GREEN_WALL,   GREEN_WALL,   GREEN_WALL,   GREEN_WALL,   GREEN_WALL, GREEN_WALL, GREEN_WALL, GREEN_WALL, GREEN_WALL, GREEN_WALL, GREEN_WALL]
];

const BASE_WORLD = WORLD.map(row => row.map(item => item === PLAYER ? EMPTY : item));

export {
  BASE_WORLD,
  WORLD,
  ELEMENT_SIZE,
  ROOM_HEIGHT,
  EMPTY,
  GREEN_WALL,
  RED_WALL,
  BLUE_WALL,
  PLAYER,
}