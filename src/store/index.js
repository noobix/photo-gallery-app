import {
  configureStore,
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firestore, auth } from "../firebase/config";

const authSlice = createSlice({
  name: "authUser",
  initialState: {
    isAuthenticated: false,
    uid: null,
    isOpen: false,
    title: null,
    content: null,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.uid = action.payload.uid;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    modalOpen(state, action) {
      state.isOpen = action.payload.isOpen;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
  },
});
const windowAlerts = createSlice({
  name: "userExperience",
  initialState: {
    isAlert: false,
    severity: "",
    message: "",
    timeout: null,
    location: "",
    isloading: false,
  },
  reducers: {
    Alerts(state, action) {
      state.isAlert = action.payload.isAlert;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.timeout = action.payload.timeout;
      state.location = action.payload.location;
      state.isloading = action.payload.isloading;
    },
  },
});
export const signInUser = createAsyncThunk(
  "authUser/signInUser",
  async (data, { dispatch }) => {
    const { email, password } = data;
    try {
      const userCredentails = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredentails.user.uid;
      dispatch(login({ isAuthenticated: true, uid: uid }));
    } catch (err) {
      console.log(err);
    }
  }
);
export const registerUser = createAsyncThunk(
  "authUser/registeruser",
  async (regdata, { dispatch }) => {
    const { email, password } = regdata;
    try {
      const userCredentails = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredentails.user.uid;
      dispatch(login({ isAuthenticated: true, uid: uid }));
    } catch (err) {
      console.log(err);
    }
  }
);
export const useGoogle = createAsyncThunk(
  "authUser/useGoogle",
  async ({ dispatch }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentails = await signInWithPopup(auth, provider);
      console.log(userCredentails);
      const uid = userCredentails.user.uid;
      dispatch(login({ isAuthenticated: true, uid: uid }));
    } catch (err) {
      console.log(err.message);
    }
  }
);
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    uxperience: windowAlerts.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const { login, modalOpen, setUser } = authSlice.actions;
export const authdata = (state) => state.auth;
export const { Alerts } = windowAlerts.actions;
export const showalerts = (state) => state.uxperience;
