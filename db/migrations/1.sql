\c e_magnet
ALTER TABLE magnets RENAME TO users_magnets;
ALTER TABLE users_magnets RENAME COLUMN magnet_id TO user_magnet_id;
ALTER TABLE users_magnets RENAME COLUMN magnet_type_id TO magnet_id;

ALTER TABLE magnet_types RENAME TO magnets;
ALTER TABLE magnets RENAME COLUMN magnet_type_id TO magnet_id;

