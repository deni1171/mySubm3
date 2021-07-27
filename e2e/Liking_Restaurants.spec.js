/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
const assert = require('assert');

Feature('Liking Restaurants');

Before((I) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', (I) => {
  I.seeElement('#query');
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async (I) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  pause();

  I.seeElement('.restaurants-item__name a');

  const firstRestaurant = locate('.restaurants-item__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurants-item');
  const likedRestaurantName = await I.grabTextFrom('.restaurants-item__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async (I) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurants-item__name a');

  const firstRestaurant = locate('.restaurants-item__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurants-item__name a');
  const likedRestaurant = await I.grabTextFrom('.restaurants-item__name a');

  assert.strictEqual(firstRestaurantName, likedRestaurant);

  I.click(likedRestaurant);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('#query');
  pause();
  const EmptyFavoriteRestaurant = await I.grabTextFrom('.restaurant-item__not__found');
  assert.strictEqual(EmptyFavoriteRestaurant, 'Tidak ada restoran untuk ditampilkan' );
});

Scenario('searching restaurants', async (I) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurants-item__name a');

  const names = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurants-item__name a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    names.push(await I.grabTextFrom('.restaurants__name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = names[1].substring(1, 3);
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurants-item');
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (name, index) => {
    const visibleName = await I.grabTextFrom(locate('.restaurants-item__name').at(index + 1));
    assert.strictEqual(name, visibleName);
  });
});
