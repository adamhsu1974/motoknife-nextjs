import * as migration_20260712_085505_initial from './20260712_085505_initial';
import * as migration_20260714_071400_split_family_tier_light_medium from './20260714_071400_split_family_tier_light_medium';

export const migrations = [
  {
    up: migration_20260712_085505_initial.up,
    down: migration_20260712_085505_initial.down,
    name: '20260712_085505_initial',
  },
  {
    up: migration_20260714_071400_split_family_tier_light_medium.up,
    down: migration_20260714_071400_split_family_tier_light_medium.down,
    name: '20260714_071400_split_family_tier_light_medium'
  },
];
