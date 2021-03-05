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
  "1vwku1231",
  "1sobyrne1231",
  "1cmruffin1231",
  "1bandit1231",
  "1mfinch1231",
  "1sobyrne1231",
];

let valid_email = [
  "carlosviche@mail.com",
  "kelsylee@mail.com",
  "lfern@mail.com",
  "cmruffin@ucsc.edu",
  "venuswku@gmail.com",
  "sean234@mail.com",
];

let invalid_email = [
  "carlosviche123@mail.com",
  "kelsylee123@mail.com",
  "lfern123@mail.com",
  "cmruffin123@ucsc.edu",
  "venuswku123@gmail.com",
  "sean2341123@mail.com",
];

// End Testing Fixtures

// Unit Test 1: selecting wishlist function
describe("Database: [UT1] selectWishlist function works properly", () => {
  test(`Test Case 1: Valid username and wishlist (has at least 1 item)`, async () => {
    for (let i = 0; i < valid_users.length; i++) {
      let users_wishlist = await db.selectWishlist(valid_users[i]);
      expect(users_wishlist.gift.length).toBeGreaterThan(0);
    }
  });

  test(`Test Case 2: Invalid username (not in our database)`, async () => {
    for (let i = 0; i < invalid_users.length; i++) {
      let users_wishlist = await db.selectWishlist(invalid_users[i]);
      expect(users_wishlist.gift).toStrictEqual([]);
    }
  });
});

// Unit Test 2: selecting users function
describe(`Database: [UT2] selectUsers function works properly`, () => {
  test(`Test Case 1: Valid username returns info`, async () => {
    for (let i = 0; i < valid_users.length; i++) {
      let user_info = await db.selectUsers(valid_users[i]);
      expect(user_info).not.toStrictEqual([]);
    }
  });

  test(`Test Case 2: Invalid username returns empty array`, async () => {
    for (let i = 0; i < invalid_users.length; i++) {
      let user_info = await db.selectUsers(invalid_users[i]);
      expect(user_info).toStrictEqual([]);
    }
  });
});

// Unit Test 3: inserting user function
// NOTE: This must be used carefully. Once a new user is inserted,
// they are in the database. Make sure to take remember that.
// describe(`Database: [UT3] insertUser function works properly`, () => {
//   test(`Test Case 1: New user can be inserted`, async () => {
//     for (let i = 0; i < invalid_users.length; i++) {
//       await db.insertUser(
//         invalid_users[i],
//         "password",
//         "Temp",
//         "User",
//         `${invalid_users[i]}000@gmail.com`,
//         "",
//         false
//       );
//       let user_info = await db.selectUsers(invalid_users[i]);
//       expect(user_info).not.toStrictEqual([]);
//     }
//   });
// });

// //Unit Test 4: Updating username function
// //Note: Make sure to tell someone you are running
// //this as it could change your user during a demo.
// describe(`Database: [UT4] updateUsername function works properly`, () => {
//   test(`Test Case 1: Valid username returns info`, async () => {
//     for (let i = 0; i < valid_users.length; i++) {
//       let user_info = await db.updateUsername(
//         `${valid_users[i]}123 ${valid_users[i]}` Note: Put 123 at the end on the strings
//       );
//       let new_name = await db.selectUsers(`${valid_users[i]}`);
//       expect(new_name).not.toStrictEqual([]);
//     }
//   });
// });

// Unit Test 5: selecting users function
describe(`Database: [UT5] selectQResponses function works properly`, () => {
  test(`Test Case 1: Valid username returns questionnaire responses`, async () => {
    for (let i = 0; i < valid_users.length; i++) {
      let user_questionnnaire = await db.selectQResponses(valid_users[i]);
      expect(user_questionnnaire).toBeTruthy();
    }
  });

  test(`Test Case 2: Invalid username returns empty array`, async () => {
    for (let i = 0; i < invalid_users.length; i++) {
      let user_questionnnaire = await db.selectQResponses(invalid_users[i]);
      expect(user_questionnnaire).not.toBeDefined;
    }
  });
});

// Unit Test 6: inserting questionnaire answers function
// Note: Will change a person's questionnaire answers
// describe(`Database: [UT6] insertQResponses function works properly`, () => {
//   test(`Test Case 1: Able to insert questionnaire responses`, async () => {
//     for (let i = 0; i < valid_users.length; i++) {
//       await db.insertQResponses(valid_users[i], '','','','','','','','','','','','');
//     }
//   });
// });

// Unit Test 7: inserting questionnaire answers function
// Note: Will change a person's questionnaire answers
// describe(`Database: [UT7] updateQResponses function works properly`, () => {
//   test(`Test Case 1: Able to update questionnaire responses`, async () => {
//     for (let i = 0; i < valid_users.length; i++) {
//       await db.updateQResponses(valid_users[i], 'bannana','apples','','','','','','','','','','');
//     }
//   });
// });

// Unit Test 8: deleting questionnaire answers function
// Note: Will change a person's questionnaire answers
// describe(`Database: [UT8] deleteQResponse function works properly`, () => {
//   test(`Test Case 1: Able to delete questionnaire topic`, async () => {
//     for (let i = 0; i < valid_users.length; i++) {
//       await db.deleteQResponse(valid_users[i], 'store');
//     }
//   });
// });

//Unit Test 9: Authenticate user
//Note: Need hash function to do this
// describe(`Database: [UT9]  authenticateUser`, () => {
//   test(`Test Case 1: Authenticate with proper password`, async () => {

//   });
// });

//Unit Test 10: Store wishlist item
//Note: Need to change wishlist item everytime you run this
// describe(`Database: [UT10]  storeUserWishlistGift`, () => {
//   test(`Test Case 1: Able to store wishlist gift`, async () => {
//     let confirmation = await db.storeUserWishlistGift(
//       "bandit",
//       "1taeyeon song"
//     );
//     expect(confirmation).toEqual("Success");
//   });
// });

//Unit Test 11: Remove wishlist item
//Note: Need to change wishlist item everytime you run this
// describe(`Database: [UT11]  removeWishlistItem`, () => {
//   test(`Test Case 1: Able to delete wishlist gift`, async () => {
//     let confirmation = await db.removeWishlistItem("bandit", "1taeyeon song");
//     expect(confirmation).toEqual("Success");
//   });
// });
