\c e_magnet
INSERT INTO users(nick, email, password, salt)
VALUES ('test user 1',
        'email1@test.com',
        '1600d0d315443b7f29c6ff4ee9a2c2969f5c0b25190984a883c59d9755e6f737e29c1269a0a7b60911f0aa01b66c7325d64d6e9a4c97f7ae95904be04c8fa0fb',
        'b0647cdbc56c378839ffd467d5efd213'); -- Password testtest1


INSERT INTO users(nick, email, password, salt)
VALUES ('test user 2',
        'email2@test.com',
        '97a762fe9a76552d786d9e5861860c78a2aee12dd5aca3d9c58363d7d4e8d519b2869d94b0d257b9b62cb8abf7f320507726c1528f17d6e302d5c1f997e67cd6',
        '9a6149819112428a1f8ab3894dc45e70'); -- Password testtest2


INSERT INTO users(nick, email, password, salt)
VALUES ('test user 3',
        'email3@test.com',
        'a1ce9dd5051c76774b72e51b5f959fc0b3658b6bde918d5808c93ed35d07da78f0ca8e290f5c4769222177aea55a31ec5b624c7bb7b0b9fdcb3b436fd0ad9235',
        'fc4bda146f520912cf0cadd32e3ed541'); -- Password testtest3


INSERT INTO magnet_types(name, main_color, second_color, icon, created_by)
VALUES ('JS master',
        '#00ff00',
        '#ff0000',
        'javascript',
                (SELECT user_id
                 FROM users
                 WHERE users.email = 'email1@test.com'));


INSERT INTO magnet_types(name, main_color, second_color, icon, created_by)
VALUES ('Math master',
        '#0000ff',
        '#ff00ff',
        'math',
                (SELECT user_id
                 FROM users
                 WHERE users.email = 'email3@test.com'));


INSERT INTO magnets(user_id, magnet_type_id)
VALUES (
                (SELECT user_id
                 FROM users
                 WHERE users.email = 'email2@test.com'),
                (SELECT magnet_type_id
                 FROM magnet_types
                 WHERE name = 'Math master'));


INSERT INTO magnets(user_id, magnet_type_id)
VALUES (
                (SELECT user_id
                 FROM users
                 WHERE users.email = 'email3@test.com'),
                (SELECT magnet_type_id
                 FROM magnet_types
                 WHERE name = 'JS master'));


INSERT INTO magnets(user_id, magnet_type_id)
VALUES (
                (SELECT user_id
                 FROM users
                 WHERE users.email = 'email2@test.com'),
                (SELECT magnet_type_id
                 FROM magnet_types
                 WHERE name = 'Math master'));

