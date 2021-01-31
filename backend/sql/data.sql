-- Populates User Table Here --

DELETE FROM giftuser;
INSERT INTO giftuser(firstname, lastname, useremail, username, userpassword, avatar, showavatar) VALUES ('Claire', 'Ruffing', 'claireruffing@mail.com', 'cmruffin', '', '', TRUE);
INSERT INTO giftuser(firstname, lastname, useremail, username, userpassword, avatar, showavatar) VALUES ('Venus', 'Ku' , 'venus345@mail.com', 'vku', '', '', TRUE);
INSERT INTO giftuser(firstname, lastname, useremail, username, userpassword, avatar, showavatar) VALUES ('Carlos', 'Viche', 'carlosviche@mail.com', 'cviche', '', '', TRUE);
INSERT INTO giftuser(firstname, lastname, useremail, username, userpassword, avatar, showavatar) VALUES ('Kelsy', 'Lee', 'klee128@ucsc.edu', 'klee128', '', '', TRUE);
INSERT INTO giftuser(firstname, lastname, useremail, username, userpassword, avatar, showavatar) VALUES ('', '', '', '', '', '', '');
INSERT INTO giftuser(firstname, lastname, useremail, username, userpassword, avatar, showavatar) VALUES ('', '', '', '', '', '', '');

INSERT INTO dummy (created) VALUES (current_timestamp);

INSERT INTO questionnaireresponses(
    username, outdooractivity, place, store, musicgenre, musician,band, 
    indooractivity, movietvshow, videogame, sport, sportteam, exercise)
    VALUES ('klee128', 'walk', '', '', 'pop', '', '', 'sleeping', 'True Beauty', 'Tetris', '', '', 'walk');

    