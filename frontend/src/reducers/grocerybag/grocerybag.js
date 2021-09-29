import {
  GET_ITEM,
  DELETE_ITEM,
  ADD_ITEM,
  UPDATE_ITEM,
  FILTER_ITEMS,
  LOADING_TARGET,
  GET_ERRORS,
} from "../../actions/types";

const initialState = {
  items: [],
  isLoading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        isLoading: false,
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        isLoading: false,
      };
    case FILTER_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case LOADING_TARGET:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
