import db from "../../backend/src/db";

/*
Each describe block is for a single unit test.
Each test block is for a single case with respect to the unit test
This whole file is a unit test for the the database functions
*/

// Testing Fixtures
let valid_users = [
  "vwku",
  "sobyrne",
  "cmruffin",
  "bandit",
  "mfinch",
  "sobyrne",
];

let invalid_users = [
  "vwku123",
  "sobyrne123",
  "cmruffin123",
  "bandit123",
  "mfinch123",
  "sobyrne123",
];

let valid_email = [
  "carlosviche@mail.com",
  "kelsylee@mail.com",
  "	lfern@mail.com",
  "cmruffin@ucsc.edu",
  "venuswku@gmail.com",
  "sean234@mail.com",
];

let invalid_email = [
  "carlosviche123@mail.com",
  "kelsylee123@mail.com",
  "	lfern123@mail.com",
  "cmruffin123@ucsc.edu",
  "venuswku123@gmail.com",
  "sean2341123@mail.com",
];
// End Testing Fixtures

// Unit Test 1: selecting wishlist function
describe("Database: selectWishlist function works properly", () => {
  test(`Test Case 1: Valid username and wishlist (has at least 1 item)`, async () => {
    // Exercising SUT (Sysem Under Test)
    for (let i = 0; i < valid_users.length; i++) {
      let users_wishlist = await db.selectWishlist(valid_users[i]);
      expect(users_wishlist.gift.length).toBeGreaterThan(0);
    }
  });

  test(`Test Case 2: Invalid username (not in our database)`, async () => {
    // Testing Fixture for our valid username inputs

    // Exercising the SUT
    for (let i = 0; i < invalid_users.length; i++) {
      let users_wishlist = await db.selectWishlist(invalid_users[i]);
      expect(users_wishlist.gift.length).toEqual(0);
    }

    //Cleanup Fixture
  });
});

// Unit Test 2: selecting users function
describe(`Database: selectUsers function works properly`, () => {
  test(`Test Case 1: Valid username returns info`, async () => {
    for (let i = 0; i < valid_users.length; i++) {
      let user_info = await db.selectUsers(valid_users[i]);
      expect(user_info).not.toStrictEqual();
    }
  });

  test(`Test Case 2: Invalid username returns empty array`, async () => {
    for (let i = 0; i < invalid_users.length; i++) {
      let user_info = await db.selectUsers(invalid_users[i]);
      expect(user_info).toStrictEqual([]);
    }
  });
});

// // Unit Test 3: inserting user function
// NOTE: This must be used carefully. Once a new user is inserted,
// they are in the database. Make sure to take note.
// describe(`Database: insertUser function works properly`, () => {
//   test(`Test Case 1: New user can be inserted`, async () => {
//     for (let i = 0; i < invalid_users.length; i++) {
//       let user_info = await db.selectUsers(invalid_users[i]);
//       expect(user_info).not.toStrictEqual();
//     }
//   });

//   test(`Test Case 2:  Old username returns undefined`, async () => {
//     for (let i = 0; i < valid_users.length; i++) {
//       let user_info = await db.selectUsers(valid_users[i]);
//       expect(user_info).toStrictEqual([]);
//     }
// //   });
// });

// Unit Test 4: Updating username function
// Note: Make sure to tell someone you are running
// this as it could change your user during a demo.
// describe(`Database: updateUsername function works properly`, () => {
//   test(`Test Case 1: Valid username returns info`, async () => {
//     for (let i = 0; i < valid_users.length; i++) {
//       let user_info = await db.updateUsername(`${valid_users[i]} ${valid_users[i]}123`);
//       let new_name = await db.selectUsers(`${valid_users[i]}123`)
//       expect(new_name).not.toStrictEqual([]);
//     }
//   });
// });

// Unit Test 5: selecting users function
describe(`Database: selectQResponses function works properly`, () => {
  test(`Test Case 1: Valid username returns questionnaire responses`, async () => {
    for (let i = 0; i < valid_users.length; i++) {
      let user_questionnnaire = await db.selectQResponses(valid_users[i]);
      expect(user_questionnnaire).toBeTruthy();
    }
  });

  test(`Test Case 2: Invalid username returns empty array`, async () => {
    for (let i = 0; i < invalid_users.length; i++) {
      let user_questionnnaire = await db.selectUsers(invalid_users[i]);
      expect(user_questionnnaire).toStrictEqual([]);
    }
  });
});
