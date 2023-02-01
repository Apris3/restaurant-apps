/* eslint-disable new-cap */
/* eslint-disable no-new */
import FavoriteRestaurantIdb from '../../data/favorite-restaurants-idb';
// import { createRestaurantItemFavoriteTemplate } from '../template-creator';
import favoriteRestaurantSearchView from './liked-restaurants/favorite-restaurants-search-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurants-search-presenter';
// import CONFIG from '../../globals/config';

const view = new favoriteRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });

    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });

    // const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    // const restaurantsContainer = document.querySelector('#restaurants');

    // restaurants.forEach((restaurant) => {
    //   restaurantsContainer.innerHTML += createRestaurantItemFavoriteTemplate(restaurant);
    // });
  },
};

export default Favorite;
