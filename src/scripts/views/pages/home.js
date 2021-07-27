/* eslint-disable linebreak-style */
import DicodingRestoSource from '../../data/dicodingResto-source';
import {createRestaurantItemTemplate} from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Explore The Resto</h2>
        <div id="restaurants" class="restaurants">

        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await DicodingRestoSource.home();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurants) => {
      // eslint-disable-next-line max-len
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurants);
    });
  },
};

export default Home;
