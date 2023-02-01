/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { createRestaurantItemFavoriteTemplate } from '../../template-creator';

class favoriteRestaurantSearchView {
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text">
        <h2 class="content_heading">Your Liked Restaurant</h2>
          <div id="restaurants" class="restaurants">
          </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemFavoriteTemplate(restaurant)), '');

      // restaurants.forEach((restaurant) => {
      //   html += createRestaurantItemFavoriteTemplate(restaurant);
      // });
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `<div class="restaurant-item_not_found">Restaurant tidak ditemukan</div>`;
  }
}

export default favoriteRestaurantSearchView;
