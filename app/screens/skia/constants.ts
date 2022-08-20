import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("screen");

export const SQUARES_HORIZONTAL = 10;
export const SQUARE_CONTAINER_SIZE = SCREEN_WIDTH / SQUARES_HORIZONTAL;
export const PADDING = 10;
export const SQUARE_SIZE = SQUARE_CONTAINER_SIZE - PADDING;
export const SQUARES_VERTICAL =
  Math.floor(SCREEN_HEIGHT / SQUARE_CONTAINER_SIZE) - 2;
export const CANVAS_HEIGHT = SQUARES_VERTICAL * SQUARE_CONTAINER_SIZE;
export const MAX_DISTANCE = Math.sqrt(SCREEN_WIDTH ** 2 + CANVAS_HEIGHT ** 2);
