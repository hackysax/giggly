import React, { useReducer, useContext } from "react";
import axios from "axios";
import { reducer } from "./reducer";
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

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token || null,
  location: userLocation || "",
  showSidebar: false,
  //start gig
  isEditing: false,
  editGigId: "",
  venue: "",
  venueemail: "",
  date: "",
  status: "Requested",
  statusOptions: ["Requested", "Booked", "Completed", "Canceled"],
  genre: "Mixed",
  genreOptions: [
    "Mixed",
    "Rock",
    "Electronic",
    "Hip Hop",
    "DJ Set",
    "Acoustic",
  ],
  gigLocation: userLocation || "",
  gigs: [],
  totalGigs: 0,
  page: 1,
  numPages: 1,
  statsStatus: {},
  statsGenre: {},
  monthlyGigs: [],
  filterStatus: "all",
  filterGenre: "all",
  searchVenue: "",
  searchLocation: "",
  sortCurrent: "Newest",
  sortOptions: ["Newest", "Oldest", "A-Z", "Z-A"],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios...basically copy pasted from docs for Auth header token
  const authHeader = axios.create({
    baseURL: "api/v1/",
    headers: { Authorization: `Bearer ${state.token}` },
  });

  authHeader.interceptors.request.use(
    (config) => {
      //console.log("From Interceptors", `Bearer ${state.token}`);
      config.headers.common["Authorization"] = `Bearer ${state.token}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authHeader.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //console.log(error.response);
      if (error.response.status === 401) {
        //console.log("AUTH ERROR");
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const displayAlertPassword = () => {
    dispatch({ type: DISPLAY_ALERT_PASSWORD });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 4000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      //console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      //add to local storage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log("Error:", error.response.data.msg);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //login user
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      //console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      //add to local storage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  //Update user is separate, TO-DO maybe merge some of these functions.
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authHeader.patch("auth/updateUser", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  const createGig = async () => {
    //console.log("Gig added!", state)
    dispatch({ type: CREATE_GIG_BEGIN });
    try {
      const { venue, venueemail, date, gigLocation, genre, status } = state;
      const location = gigLocation;
      //{data} is unused, but nice for testing.
      await authHeader.post("/gigs", {
        venue,
        venueemail,
        date,
        location,
        genre,
        status,
      });
      dispatch({
        type: CREATE_GIG_SUCCESS,
      });
      handleClearGig();
    } catch (error) {
      if (error.response.status === 401) return; //if unauth logout and go to landing page.
      dispatch({
        type: CREATE_GIG_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const handleChangeGlob = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE_GLOB, payload: { name, value } });
  };

  const handleClearGig = () => {
    dispatch({ type: HANDLE_CLEAR_GIG });
  };

  const getGigs = async () => {
    const {
      searchVenue,
      searchLocation,
      filterGenre,
      filterStatus,
      sortCurrent,
      page,
    } = state;

    let url = `/gigs?page=${page}&status=${filterStatus}&genre=${filterGenre}&sort=${sortCurrent}`;
    if (searchVenue) {
      url = url + `&searchvenue=${searchVenue}`;
    }
    if (searchLocation) {
      url = url + `&searchlocation=${searchLocation}`;
    }
    dispatch({ type: FETCH_GIGS_BEGIN });
    //console.log("Try Begin: Fetching gis form appContext functiion getGigs");
    try {
      const { data } = await authHeader.get(url);
      const { gigs, totalGigs, numPages } = data;
      // console.log(
      //   "Try Success: Fetching gis form appContext functiion getGigs"
      // );
      dispatch({
        type: FETCH_GIGS_SUCCESS,
        payload: { gigs, totalGigs, numPages },
      });
    } catch (error) {
      //console.log(error);
      logoutUser();
    }
    clearAlert();
  };
  const setEditGig = (id) => {
    dispatch({ type: SET_EDIT_GIG, payload: id });
    //console.log("Edit Gig with Id: ", id);
  };

  const editGig = async () => {
    //console.log("editGig");
    //TODO format date properly...
    dispatch({ type: EDIT_GIG_BEGIN });
    try {
      const { venue, venueemail, gigLocation, status, date, genre, editGigId } =
        state;
      const location = gigLocation;
      await authHeader.patch(`/gigs/${editGigId}`, {
        venue,
        venueemail,
        location,
        status,
        date,
        genre,
      });
      dispatch({ type: EDIT_GIG_SUCCESS });
      handleClearGig();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_GIG_ERROR,
        payload: { msg: error.response.status },
      });
    }
    clearAlert();
  };

  const deleteGig = async (id) => {
    dispatch({ type: DELETE_GIG_BEGIN });
    try {
      await authHeader.delete(`/gigs/${id}`);
      getGigs();
    } catch (error) {
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authHeader.get("/gigs/stats/");
      //console.log("Data:", data);
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          statsStatus: data.gigstatsStatusDefault,
          statsGenre: data.gigstatsGenreDefault,
          monthlyGigs: data.monthlyGigs,
        },
      });
    } catch (error) {
      //console.log(error);
      logoutUser();
    }

    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePg = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        displayAlertPassword,
        clearAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChangeGlob,
        handleClearGig,
        createGig,
        getGigs,
        setEditGig,
        editGig,
        deleteGig,
        showStats,
        clearFilters,
        changePg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };
