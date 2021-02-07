import * as types from "../const/actionTypes";

/**
 * @description action for picking marble
 */
export const marblePicked = (payload) => ({
  type: types.MARBLE_PICKED,
  payload,
});

/**
 * @description action for releasing marble on same position
 */
export const marbleReleased = (payload) => ({
  type: types.MARBLE_RELEASED,
  payload,
});

/**
 * @description action for dropping marble on vacant place
 */
export const marbleDropped = (payload) => ({
  type: types.MARBLE_DROPPED,
  payload,
});

/**
 * @description action for removing marble
 */
export const marbleRemoved = (payload) => ({
  type: types.MARBLE_REMOVED,
  payload,
});
