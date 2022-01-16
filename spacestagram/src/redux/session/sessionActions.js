import {
  IMAGE_GALLERY,
  IMAGES,
  DATE_FILTER
} from "./sessionTypes";

export const sessionImageGallery = (imagesDict={}) => {
  return {
    type: IMAGE_GALLERY,
    payload: imagesDict,
  };
};

export const sessionImages = (images=[]) => {
  return {
    type: IMAGES,
    payload: images,
  };
};

export const sessionDateFilter = (dateObj=[]) => {
  return {
    type: DATE_FILTER,
    payload: dateObj,
  };
};