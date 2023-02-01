/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Restaurant tidak ditemukan', '.restaurant-item_not_found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Restaurant tidak ditemukan', '.restaurant-item_not_found');
  I.amOnPage('/');

  I.seeElement('.nameRestaurant a');

  const firstRestaurant = locate('.nameRestaurant a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurantInfo');
  const likedRestaurantTitle = await I.grabTextFrom('.nameRestaurant');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
