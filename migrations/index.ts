import * as migration_20260712_085505_initial from './20260712_085505_initial';
import * as migration_20260714_071400_split_family_tier_light_medium from './20260714_071400_split_family_tier_light_medium';
import * as migration_20260714_091115_products_orderable from './20260714_091115_products_orderable';

export const migrations = [
  {
    up: migration_20260712_085505_initial.up,
    down: migration_20260712_085505_initial.down,
    name: '20260712_085505_initial',
  },
  {
    up: migration_20260714_071400_split_family_tier_light_medium.up,
    down: migration_20260714_071400_split_family_tier_light_medium.down,
    name: '20260714_071400_split_family_tier_light_medium',
  },
  {
    up: migration_20260714_091115_products_orderable.up,
    down: migration_20260714_091115_products_orderable.down,
    name: '20260714_091115_products_orderable'
  },
];
