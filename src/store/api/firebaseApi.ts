// src/store/api/firebaseApi.js
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Trackers"],
  endpoints: (builder) => ({
    getTrackers: builder.query({
      queryFn: async () => {
        try {
          const trackersRef = collection(db, "trackers");
          const q = query(trackersRef);
          const querySnapshot = await getDocs(q);
          const trackers = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data: trackers };
        } catch (error) {
          const errorMessage =
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message?: string }).message
              : String(error);
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      providesTags: ["Trackers"],
    }),
  }),
});

export const { useGetTrackersQuery } = firebaseApi;
