-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Database schema goes here --
DROP TABLE IF EXISTS giftuser;
-- Your database schema goes here --
CREATE TABLE giftuser(firstname VARCHAR(32), lastname VARCHAR(32), useremail VARCHAR(32), username VARCHAR(32), userpassword VARCHAR(60), avatar TEXT, showavatar BOOLEAN);
