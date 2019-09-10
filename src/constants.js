const KEYS = {
  UP: 'ArrowUp',
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  RIGHT: 'ArrowRight',
  OK: 'Enter',
  BACK: 'Backspace',
  HOME: 'Escape'
};

const ACTIONS = {
  [KEYS.UP]: 'Up',
  [KEYS.LEFT]: 'Left',
  [KEYS.DOWN]: 'Down',
  [KEYS.RIGHT]: 'Right',
  [KEYS.OK]: 'Select',
  [KEYS.BACK]: 'Back',
  [KEYS.HOME]: 'Home'
};

module.exports = {
  KEYS,
  ACTIONS
};