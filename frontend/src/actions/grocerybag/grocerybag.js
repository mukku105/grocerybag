import axios from "axios";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth";
import {
  GET_ITEM,
  DELETE_ITEM,
  ADD_ITEM,
  UPDATE_ITEM,
  FILTER_ITEMS,
  LOADING_TARGET,
  GET_ERRORS,
} from "../types";

export const loadingTarget = () => (dispatch) => {
  dispatch({
    type: LOADING_TARGET,
  });
};

//GET GROCERY ITEM
export const getGroceryItems = () => (dispatch, getState) => {
  axios
    .get("/api/grocery-bag", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ITEM,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//DELETE GROCERY ITEM
export const deleteGroceryItem = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/grocery-bag/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteItem: "Item Deleted" }));
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//ADD GROCERY ITEM
export const addGroceryItem = (item) => (dispatch, getState) => {
  axios
    .post("/api/grocery-bag/", item, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addItem: "Item Added" }));
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//UPDATE GROCERY ITEM
export const updateGroceryItem = (item) => (dispatch, getState) => {
  axios
    .patch(`/api/grocery-bag/${item.id}/`, item, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateItem: "Item Updated" }));
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//FILTER GROCERY ITEMS
export const filterGroceryItems =
  (status, scheduled_date) => (dispatch, getState) => {
    axios
      .get(
        `/api/grocery-bag?status=${status}&scheduled_date=${scheduled_date}`,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: FILTER_ITEMS,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };
