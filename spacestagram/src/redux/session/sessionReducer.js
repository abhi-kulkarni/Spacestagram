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
      
      let currentImageGallery = state.imageGallery;
      let payloadImageGallery = action.payload;
      let currLikedImageArr = currentImageGallery.hasOwnProperty('liked')?currentImageGallery['liked']:[];
      let currSavedImageArr = currentImageGallery.hasOwnProperty('saved')?currentImageGallery['saved']:[];
      let payloadLikedImageArr = payloadImageGallery['liked'];
      let payloadSavedImageArr = payloadImageGallery['saved'];
      let newLikedImages = [...currLikedImageArr, ...payloadLikedImageArr];
      let newSavedImages = [...currSavedImageArr, ...payloadSavedImageArr];
      
      newLikedImages = newLikedImages.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.id === item.id
        ))
      )

      newSavedImages = newSavedImages.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.id === item.id
        ))
      )

      let newImageGallery = {'liked': newLikedImages, 'saved': newSavedImages}
      
      return {
        ...state,
        imageGallery: newImageGallery,
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
