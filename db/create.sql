CREATE DATABASE e_magnet;
\c e_magnet


CREATE TABLE users (
	user_id serial PRIMARY KEY,
	nick text NOT NULL,
	email text UNIQUE NOT NULL,
	password text NOT NULL,
  salt text NOT NULL 
);


CREATE TABLE magnet_types (
	magnet_type_id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  main_color VARCHAR(8),
  second_color VARCHAR(8),
  icon text,
  created_by INT,

  FOREIGN KEY (created_by)
      REFERENCES users (user_id)
);

CREATE TABLE magnets (
	magnet_id serial PRIMARY KEY,
  user_id INT NOT NULL,
  magnet_type_id INT NOT NULL,
  given_at TIMESTAMP default current_timestamp,

  FOREIGN KEY (user_id)
      REFERENCES users (user_id),

  FOREIGN KEY (magnet_type_id)
      REFERENCES magnet_types (magnet_type_id)
);
