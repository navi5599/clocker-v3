// src/store/middlewares/authMiddleware.js
import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "../slices/authSlice";
import { auth } from "../../../firebase";

export const authMiddleware = (store: any) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(setUser({ uid: user.uid, email: user.email }));
    } else {
      store.dispatch(clearUser());
    }
  });
  return (next: any) => (action: any) => next(action);
};
