-- Database schema goes here --
DROP TABLE IF EXISTS user;
-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
CREATE TABLE user(useremail VARCHAR(32), username VARCHAR(32), userpassword VARCHAR(60));
-- CREATE TABLE user(useremail VARCHAR(32), username VARCHAR(32), userpassword VARCHAR(60), avatarurl TEXT, showavatar BOOLEAN);
