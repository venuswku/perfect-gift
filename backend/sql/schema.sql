-- Database schema goes here --
DROP TABLE IF EXISTS giftuser;
CREATE TABLE giftuser(username VARCHAR(32) PRIMARY KEY, userpassword VARCHAR(100), firstname VARCHAR(32), lastname VARCHAR(32), useremail VARCHAR(32), avatar TEXT, showavatar BOOLEAN);

DROP TABLE IF EXISTS questionnaireresponses;
CREATE TABLE questionnaireresponses(
    username VARCHAR(32) PRIMARY KEY,
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
    sportsteam VARCHAR(50),
    exercise VARCHAR(50),
    FOREIGN KEY (username) REFERENCES giftuser(username)
);

-- For now, we can only let a user have 10 items on their wishlist.
-- Not sure how to add attributes to a table once they're been initialzed
CREATE TABLE wishlist(
    username VARCHAR(32) PRIMARY KEY,
    gift1 VARCHAR(50),
    gift2 VARCHAR(50),
    gift3 VARCHAR(50),
    gift4 VARCHAR(50),
    gift5 VARCHAR(50),
    gift6 VARCHAR(50),
    gift7 VARCHAR(50),
    gift8 VARCHAR(50),
    gift9 VARCHAR(50),
    gift10 VARCHAR(50),
    FOREIGN KEY (username) REFERENCES giftuser(username)
);
