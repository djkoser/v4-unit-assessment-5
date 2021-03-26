CREATE TABLE helo_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT null,
  password VARCHAR NOT null,
  profile_pic TEXT
);

CREATE TABLE helo_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(45) NOT null,
  content TEXT,
  img TEXT,
  author_id INTEGER REFERENCES helo_users(id),
  date_created TIMESTAMP
);