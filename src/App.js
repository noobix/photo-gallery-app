import { Container } from "@mui/material";
import ImagesList from "./components/ImagesList";
import Nav from "./components/Nav";
import { Upload } from "./components/Upload";
import { store } from "./store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase/config";
import { setUser, login } from "./store";
import { useDispatch } from "react-redux";
import Modal from "./components/modal";
import NotificationMain from "./components/notificationMain";
import Loading from "./components/Loading";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
        dispatch(login({ isAuthenticated: false, uid: null }));
      }
    });
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: "3rem", textAlign: "center" }}>
      <Provider store={store}>
        <Loading />
        <Modal />
        <NotificationMain />
        <Nav />
        <Upload />
        <ImagesList />
      </Provider>
    </Container>
  );
}

export default App;
