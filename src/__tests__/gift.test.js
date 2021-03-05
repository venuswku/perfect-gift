import db from "../../backend/src/db";

/*
Each describe block is for a single unit test.
Each test block is for a single case with respect to the unit test
This whole file is a unit test for the the database functions
*/

// Unit Test 1: selecting wishlist function
describe("Database: selectWishlist function works properly", () => {
  test(`Test Case 1: Valid username and wishlist (has at least 1 item)`, async () => {
    // Testing Fixture for our valid username inputs
    let valid_users = [
      "vwku",
      "sobyrne",
      "cmruffin",
      "bandit",
      "mfinch",
      "sobyrne",
    ];

    // Exercising SUT (Sysem Under Test)
    for (let i = 0; i < valid_users.length; i++) {
      let users_wishlist = await db.selectWishlist(valid_users[i]);
      expect(users_wishlist.gift.length).toBeGreaterThan(0);
    }

    //Cleanup Fixture
  });

  test(`Test Case 2: Invalid username (not in our database)`, async () => {
    // Testing Fixture for our valid username inputs
    let invalid_users = [
      "vwku123",
      "sobyrne123",
      "cmruffin123",
      "bandit123",
      "mfinch123",
      "sobyrne123",
    ];

    // Exercising the SUT
    for (let i = 0; i < invalid_users.length; i++) {
      let users_wishlist = await db.selectWishlist(invalid_users[i]);
      expect(users_wishlist.gift.length).toEqual(0);
    }

    //Cleanup Fixture
  });
});

describe(`Database: selectWishlist function works properly`, () => {
  test(`Unit Test 2:`, async () => {
    let valid_users = [
      "vwku",
      "sobyrne",
      "cmruffin",
      "bandit",
      "mfinch",
      "sobyrne",
    ];
    for (let i = 0; i < valid_users.length; i++) {
      let user_info = await db.selectUsers(valid_users[i]);
      expect(user_info).toBeTruthy();
    }
  });
});
