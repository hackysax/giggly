import {
  DISPLAY_ALERT,
  DISPLAY_ALERT_PASSWORD,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE_GLOB,
  HANDLE_CLEAR_GIG,
  CREATE_GIG_BEGIN,
  CREATE_GIG_SUCCESS,
  CREATE_GIG_ERROR,
  FETCH_GIGS_BEGIN,
  FETCH_GIGS_SUCCESS,
  SET_EDIT_GIG,
  EDIT_GIG_BEGIN,
  EDIT_GIG_SUCCESS,
  EDIT_GIG_ERROR,
  DELETE_GIG_BEGIN,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please enter values for all fields.",
    };
  }
  if (action.type === DISPLAY_ALERT_PASSWORD) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Password must be six or more characters.",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN || action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    const { user, token, location } = action.payload;
    return {
      ...state,
      isLoading: false,
      user: user,
      token: token,
      userLocation: location,
      gigLocation: location,
      showAlert: true,
      alertType: "success",
      alertText: "User added, redirecting...",
    };
  }
  // if (action.type === UPDATE_USER_SUCCESS) {
  //   return {
  //     ...initialState,
  //   };
  // }
  if (action.type === LOGIN_USER_ERROR) {
    const { msg } = action.payload;
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: msg,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    const { msg } = action.payload;
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: msg,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    const { user, token, location } = action.payload;
    return {
      ...state,
      isLoading: false,
      user: user,
      token: token,
      userLocation: location,
      gigLocation: location,
      showAlert: true,
      alertType: "success",
      alertText: "Login successful, redirecting...",
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      gigLocation: "",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    const { user, token, location } = action.payload;
    return {
      ...state,
      isLoading: false,
      user: user,
      token: token,
      userLocation: location,
      gigLocation: location,
      showAlert: true,
      alertType: "success",
      alertText: "Update successful...",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    const { msg } = action.payload;
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: msg,
    };
  }
  if (action.type === HANDLE_CHANGE_GLOB) {
    return { ...state, page: 1, [action.payload.name]: action.payload.value };
  }
  if (action.type === HANDLE_CLEAR_GIG) {
    const tempHolder = {
      isEditing: false,
      editGigId: "",
      venue: "",
      venueemail: "",
      date: "",
      status: "Requested",
      genre: "Mixed",
      gigLocation: state.userLocation || "",
    };
    return { ...state, ...tempHolder };
  }
  if (action.type === CREATE_GIG_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_GIG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "This gig has been added!",
    };
  }
  if (action.type === CREATE_GIG_ERROR) {
    const { msg } = action.payload;
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: msg,
    };
  }
  if (action.type === FETCH_GIGS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === FETCH_GIGS_SUCCESS) {
    const { gigs, totalGigs, numPages } = action.payload;
    return {
      ...state,
      isLoading: false,
      gigs: gigs,
      totalGigs: totalGigs,
      numPages: numPages,
    };
  }
  if (action.type === SET_EDIT_GIG) {
    const theGig = state.gigs.find((gig) => gig._id === action.payload);
    const { venue, venueemail, _id, status, genre, date, location } = theGig;
    return {
      ...state,
      isEditing: true,
      editGigId: _id,
      venue,
      venueemail,
      status,
      genre,
      date,
      gigLocation: location,
    };
  }
  if (action.type === EDIT_GIG_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === EDIT_GIG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertType: "success",
      showAlert: true,
      alertText: "Gig has been updated!",
    };
  }

  if (action.type === EDIT_GIG_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertType: "danger",
      showAlert: true,
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_GIG_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      statsStatus: action.payload.statsStatus,
      statsGenre: action.payload.statsGenre,
      monthlyGigs: action.payload.monthlyGigs,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filterStatus: "all",
      filterGenre: "all",
      sortCurrent: "Newest",
      searchVenue: "",
      searchLocation: "",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
};

export { reducer };
