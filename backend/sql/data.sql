-- Populates User Table Here --

DELETE FROM giftuser;
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('cmruffin', '', 'Claire', 'Ruffing', 'claireruffin@gmail.com', '', TRUE);
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('vwku', '', 'Venus', 'Ku' , 'venus345@mail.com', '', TRUE);
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('cviche', '', 'Carlos', 'Viche', 'carlosviche@mail.com', '', FALSE);
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('sobyrne', '', 'Sean', 'OByrne', 'sean234@mail.com', '', FALSE);
INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES ('klee128', '', 'Kelsy', 'Lee', 'kelsylee@mail.com', '', FALSE);

DELETE FROM questionnaireresponses;
INSERT INTO questionnaireresponses(
    username, outdooractivity, place, store, musicgenre, musician, band,
    indooractivity, movietvshow, videogame, sport, sportsteam, exercise)
    VALUES ('klee128', 'walk', '', '', 'pop', '', '', 'sleeping', 'True Beauty', 'Tetris', '', '', 'walk');
