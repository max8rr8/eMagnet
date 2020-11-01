\c e_magnet
ALTER TABLE magnets RENAME TO users_magnets;
ALTER TABLE users_magnets RENAME COLUMN magnet_id TO user_magnet_id;
ALTER TABLE users_magnets RENAME COLUMN magnet_type_id TO magnet_id;

ALTER TABLE magnet_types RENAME TO magnets;
ALTER TABLE magnets RENAME COLUMN magnet_type_id TO magnet_id;
ALTER TABLE magnets RENAME COLUMN created_by TO author;


CREATE INDEX idx_magnet_author ON magnets(author);
CREATE INDEX idx_users_magnets_user ON users_magnets(user_id);
CREATE INDEX idx_users_magnets_magnet ON users_magnets(magnet_id);

