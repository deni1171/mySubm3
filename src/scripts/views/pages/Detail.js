/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import UrlParser from '../../routes/url-parser';
import DicodingRestoSource from '../../data/dicodingResto-source';
import {createRestaurantDetailTemplate} from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestoIdb from '../../data/favoriteresto-idb';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant-detail">
      
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await DicodingRestoSource.detailresto(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);
    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestoIdb,
      restaurant: {
        id: url.id,
        pictureId: restaurant.restaurant.pictureId,
        name: restaurant.restaurant.name,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
        city: restaurant.restaurant.city,
      },
    });
  },
};

export default Detail;
