const KEYS = {
  UP: 'ArrowUp',
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  RIGHT: 'ArrowRight',
  OK: 'Enter',
  BACK: 'Backspace',
  HOME: 'Escape',
  REV: 'BracketLeft',
  PLAY: 'Backslash',
  FWD: 'BracketRight',
  INFO: 'Equal',
  INSTANT_REPLAY: 'Minus'
};

const ACTIONS = {
  [KEYS.UP]: 'Up',
  [KEYS.LEFT]: 'Left',
  [KEYS.DOWN]: 'Down',
  [KEYS.RIGHT]: 'Right',
  [KEYS.OK]: 'Select',
  [KEYS.BACK]: 'Back',
  [KEYS.HOME]: 'Home',
  [KEYS.REV]: 'Rev',
  [KEYS.PLAY]: 'Play',
  [KEYS.FWD]: 'Fwd',
  [KEYS.INFO]: 'Info',
  [KEYS.INSTANT_REPLAY]: 'InstantReplay'
};

module.exports = {
  KEYS,
  ACTIONS
};