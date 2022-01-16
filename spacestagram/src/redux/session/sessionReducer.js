import {
  IMAGE_GALLERY,
  IMAGES,
  DATE_FILTER
} from "./sessionTypes";

const initialState = {
  imageGallery:{},
  images:[],
  dateFilter:{}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_GALLERY:
      return {
        ...state,
        imageGallery: action.payload,
      };
    case IMAGES:
        return {
          ...state,
          images: action.payload,
        };
    case DATE_FILTER:
      return {
        ...state,
        dateFilter: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
