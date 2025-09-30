import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          return { data: { uid: user.uid, email: user.email } };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          return { data: { uid: user.uid, email: user.email } };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: null };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: ["Auth"],
    }),

    getCurrentUser: builder.query({
      queryFn: async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            return { data: { uid: user.uid, email: user.email } };
          }
          return { data: null };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useRegisterMutation,
} = authApi;
