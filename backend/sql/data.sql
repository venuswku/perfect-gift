-- Populates User Table Here --

DELETE FROM giftuser;
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('cmruffin', '', 'Claire', 'Ruffing', 'claireruffing@mail.com', '', TRUE);
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('vwku', '', 'Venus', 'Ku' , 'venus345@mail.com', '', TRUE);
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('cviche', '', 'Carlos', 'Viche', 'carlosviche@mail.com', '', FALSE);
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('sobyrne', '$2b$10$WKbjP0A30l6CtJge.ycZYelIGLMEY2iOK0a8W7KuOkDd0Naa4lW7K', 'Sean', 'OByrne', 'sean234@mail.com', '', FALSE);
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('klee128', '', 'Kelsy', 'Lee', 'kelsylee@mail.com', '', FALSE);

DELETE FROM questionnaireresponses;
INSERT INTO questionnaireresponses(
    username, outdooractivity, place, store, musicgenre, musician, band,
    indooractivity, movietvshow, videogame, sport, sportsteam, exercise)
    VALUES ('klee128', 'walk', '', '', 'pop', '', '', 'sleeping', 'True Beauty', 'Tetris', '', '', 'walk');
INSERT INTO questionnaireresponses(
    username, outdooractivity, place, store, musicgenre, musician, band,
    indooractivity, movietvshow, videogame, sport, sportsteam, exercise)
    VALUES ('sobyrne', 'walk', '', '', 'pop', '', '', 'sleeping', 'True Beauty', 'Tetris', '', '', 'walk');
