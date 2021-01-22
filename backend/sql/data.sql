-- Populates User Table Here --

DELETE FROM emailuser;
INSERT INTO emailuser(useremail, username, userpassword) VALUES ('claireruffing@mail.com', 'Claire Ruffing', '');
INSERT INTO emailuser(useremail, username, userpassword) VALUES ('emily345@mail.com', 'Emily Fan', '');
INSERT INTO emailuser(useremail, username, userpassword) VALUES ('brianmurphy@mail.com', 'Brian Murphy', '');
INSERT INTO emailuser(useremail, username, userpassword) VALUES ('kevinjames@mail.com', 'Kevin James', '');
INSERT INTO emailuser(useremail, username, userpassword) VALUES ('aloha24@mail.com', 'Kristen Stewart', '');
INSERT INTO emailuser(useremail, username, userpassword) VALUES ('bluestar@mail.com', 'Lily Flyer', '');

INSERT INTO dummy (created) VALUES (current_timestamp);
