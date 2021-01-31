-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Database schema goes here --
DROP TABLE IF EXISTS giftuser;
-- Your database schema goes here --
CREATE TABLE giftuser(firstname VARCHAR(32), lastname VARCHAR(32), useremail VARCHAR(32), username VARCHAR(32), userpassword VARCHAR(60), avatar TEXT, showavatar BOOLEAN);

CREATE TABLE questionnaireresponses(
    username VARCHAR(32),
    outdooractivity VARCHAR(50),
    place VARCHAR(50),
    store VARCHAR(50),
    musicgenre VARCHAR(50),
    musician VARCHAR(50),
    band VARCHAR(50),
    indooractivity VARCHAR(50),
    movietvshow VARCHAR(50),
    videogame VARCHAR(50),
    sport VARCHAR(50),
    sportteam VARCHAR(50),
    exercise VARCHAR(50),
);