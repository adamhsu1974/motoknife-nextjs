import * as migration_20260712_085505_initial from './20260712_085505_initial';

export const migrations = [
  {
    up: migration_20260712_085505_initial.up,
    down: migration_20260712_085505_initial.down,
    name: '20260712_085505_initial'
  },
];
