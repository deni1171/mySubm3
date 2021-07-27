/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import API_ENDPOINT from '../globals/api-endpoint';

class DicodingRestoSource {
  static async home() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async favorite() {
    const response = await fetch(API_ENDPOINT.FAVORITE);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailresto(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default DicodingRestoSource;
