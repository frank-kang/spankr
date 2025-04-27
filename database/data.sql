-- This file contains the SQL commands to populate the database with initial data.

insert into "genders"
  ("genderName")
    values
  ('male'),
  ('female');

insert into "handedness"
  ("handedNessName")
    values
  ('right'),
  ('left');

insert into "skills"
  ("skillName", "skillDescription")
    values
  ('NTRP 2.5', 'Beginner - Has limited experience and is still working primarily on getting the ball into play.'),
  ('NTRP 3.0', 'Improving - Has a fair amount of experience and is working to develop more consistent stroke mechanics.'),
  ('NTRP 3.5', 'Intermediate - Has acquired the basic skills needed to play tennis.'),
  ('NTRP 4.0', 'Advanced - Has dependable strokes and is developing control over depth and direction.'),
  ('NTRP 4.5', 'Pro - Has good shot anticipation and frequently has a well-developed game plan.'),
  ('NTRP 5.0', 'Expert - Has a complete game and can hit all the shots with power and control.');

insert into "playTypes"
  ("playTypeName")
    values
  ('singles'),
  ('doubles'),
  ('both');

insert into "users"
   ("firstName", "lastName", "email","longDescription", "zipCode", "hashedPassword","skillId","playTypeId","genderId","handedNessId")
   values
   ('Frank', 'Kang', 'frankkang@rocketmail.com', 'Plays offensive all court game', 92026, 'tennis', 4, 1, 1, 1),
   ('Tom', 'Brown', 'tombrown@rocketmail.com', 'Plays defensive baseline game', 92025, 'tennis', 5, 1, 1, 1),
   ('Mary', 'Larkin', 'marylarkin@rocketmail.com', 'Plays defensive all court game', 92024, 'tennis', 4, 1, 2, 2),
   ('Barry', 'Dirt', 'barydirt@rocketmail.com', 'Plays serve and volley game', 92023, 'tennis', 4, 3, 1, 1),
   ('John', 'Rosin', 'johnrosin@rocketmail.com', 'Plays defensive all court game', 92021, 'tennis', 4, 1, 1, 1),
   ('Brian', 'Banks', 'brianbanks@rocketmail.com', 'Plays offensive all court game', 92022, 'tennis', 4, 1, 1, 1),
   ('Jennie', 'Jones', 'jennyjones@rocketmail.com', 'Plays defensive baseline game', 92024, 'tennis', 4, 3, 2, 1);
