import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import UploadProfileImg from "../feature/UploadProfileImg";
import DeleteImage from "../feature/DeleteImage";
import { auth } from "../firebase/config";
import { v4 as uuid } from "uuid";
import UpdateUserDataDetails from "../feature/UpdateUserDataDetails";
import ChangeEmail from "../components/user/settings/ChangeEmail";
import DeleteAccount from "../components/user/settings/DeleteAccount";
import ChangePassword from "../components/user/settings/ChangePassword";

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
export const authWithGoogle = createAsyncThunk(
  "authUser/useGoogle",
  async (_value, { dispatch }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);
      const uid = userCredentials.user.uid;
      dispatch(login({ isAuthenticated: true, uid: uid }));
    } catch (err) {
      console.log(err.message);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "authUser/updateProfile",
  async (data, { dispatch }) => {
    const authdata = auth;
    const user = authdata.currentUser;
    const { file, userObj, imagesObj } = data;
    try {
      if (file) {
        const imageName = uuid() + "." + file?.name?.split(".")?.pop();
        const url = await UploadProfileImg(
          file,
          `profile/${user.uid}/${imageName}`
        );
        if (user?.photoURL) {
          const previous = user.photoURL
            ?.split(`${user.uid}%2F`)[1]
            .split("?")[0];
          if (previous) {
            try {
              await DeleteImage(`profile/${user.uid}/${previous}`);
            } catch (err) {
              dispatch(
                Alerts({
                  isAlert: true,
                  severity: "error",
                  message: err.message,
                  timeout: 5000,
                  location: "modal",
                })
              );
            }
          }
        }
        const flow1 = { ...userObj, photoURL: url };
        const flow2 = { ...imagesObj, uPhoto: url };
        await updateProfile(user, flow1);
        await UpdateUserDataDetails("gallery", user.uid, flow2);
      } else {
        await updateProfile(user, userObj);
        await UpdateUserDataDetails("gallery", user.uid, imagesObj);
      }
      dispatch(
        Alerts({
          isAlert: true,
          severity: "success",
          message: "Your profile has been updated",
          timeout: 3000,
          location: "modal",
        })
      );
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 5000,
          location: "modal",
        })
      );
    }
  }
);
export const googleAccountSettings = createAsyncThunk(
  "authUser/googleAccountSettings",
  async (action, { dispatch }) => {
    const authdata = auth;
    const user = authdata.currentUser;
    try {
      await reauthenticateWithPopup(user, new GoogleAuthProvider());
      switch (action) {
        case "change_email":
          dispatch(
            modalOpen({
              isOpen: true,
              title: "Update Email",
              content: <ChangeEmail />,
            })
          );
          break;
        case "remove_account":
          dispatch(
            modalOpen({
              isOpen: true,
              title: "Remove Account",
              content: <DeleteAccount />,
            })
          );
          break;
        default:
          throw new Error("Action can not be determined");
      }
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 5000,
          location: "modal",
        })
      );
    }
  }
);
export const userAccountSettings = createAsyncThunk(
  "authUser/userAccountSettings",
  async (token, { dispatch }) => {
    const { action, credentails } = token;
    const authdata = auth;
    const user = authdata.currentUser;
    try {
      await reauthenticateWithCredential(user, credentails);
      switch (action) {
        case "change_password":
          dispatch(
            modalOpen({
              isOpen: true,
              title: "Update Password",
              content: <ChangePassword />,
            })
          );
          break;
        case "change_email":
          dispatch(
            modalOpen({
              isOpen: true,
              title: "Update Email",
              content: <ChangeEmail />,
            })
          );
          break;
        case "remove_account":
          dispatch(
            modalOpen({
              isOpen: true,
              title: "Remove Account",
              content: <DeleteAccount />,
            })
          );
          break;
        default:
          throw new Error("Action can not be determined");
      }
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 5000,
          location: "modal",
        })
      );
    }
  }
);
export const updateAccountPassword = createAsyncThunk(
  "authUser/updatePassword",
  async (password, { dispatch }) => {
    const authdata = auth;
    const user = authdata.currentUser;
    try {
      await updatePassword(user, password);
      dispatch(modalOpen({ isOpen: false }));
      dispatch(
        Alerts({
          isAlert: true,
          severity: "success",
          message: "Your password has been updated",
          timeout: 8000,
          location: "main",
        })
      );
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 5000,
          location: "modal",
        })
      );
    }
  }
);
export const unpdateAccountEmail = createAsyncThunk(
  "authUser/updateAccountEmail",
  async (email, { dispatch }) => {
    const authdata = auth;
    const user = authdata.currentUser;
    try {
      await updateEmail(user, email);
      dispatch(modalOpen({ isOpen: false }));
      dispatch(
        Alerts({
          isAlert: true,
          severity: "success",
          message: "Your email has been updated",
          timeout: 8000,
          location: "main",
        })
      );
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 5000,
          location: "modal",
        })
      );
    }
  }
);
export const verifyEmail = createAsyncThunk(
  "authUser/verifyEmail",
  async (user, { dispatch }) => {
    try {
      await sendEmailVerification(user);
      dispatch(
        Alerts({
          isAlert: true,
          severity: "info",
          message: "verification link has been sent to your email inbox",
          timeout: 8000,
          location: "main",
        })
      );
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 80000,
          location: "main",
        })
      );
    }
  }
);
export const resetPassword = createAsyncThunk(
  "authUser/resetPassword",
  async (email, { dispatch }) => {
    const authdata = auth;
    try {
      await sendPasswordResetEmail(authdata, email);
      dispatch(
        Alerts({
          isAlert: true,
          severity: "info",
          message: "Reset link has been sent to your email inbox",
          timeout: 8000,
          location: "main",
        })
      );
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 5000,
          location: "modal",
        })
      );
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
