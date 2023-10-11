import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

// data: [{}, {}, {}, ...]
// {} :
// "_id":"60666c42cc7b410027a1a9b1",
// "name":"Краторная булка N-200i",
// "type":"bun",
// "proteins":80,
// "fat":24,
// "carbohydrates":53,
// "calories":420,
// "price":1255,
// "image":"https://code.s3.yandex.net/react/code/bun-02.png",
// "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
// "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
// "__v":0

// import PropTypes from "prop-types";
// import {ingredientPropType} from "../../../utils/prop-types";
// ConstructorSection.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropType).isRequired
// }
