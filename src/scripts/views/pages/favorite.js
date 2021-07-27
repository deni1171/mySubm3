/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import FavoriteRestoIdb from '../../data/favoriteresto-idb';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantSearchView from './liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';

const view = new FavoriteRestaurantSearchView();

const favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({view, favoriteRestaurants: FavoriteRestoIdb});
    new FavoriteRestaurantSearchPresenter({view, favoriteRestaurants: FavoriteRestoIdb});
  },
};

export default favorite;
