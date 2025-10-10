// src/store/api/firebaseApi.js
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  Timestamp,
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
    createTracker: builder.mutation({
      queryFn: async ({
        title,
        description,
        duration,
        startedAt,
        finishedAt,
        createdAt,
      }) => {
        try {
          const trackerRef = doc(collection(db, "trackers"));
          await setDoc(trackerRef, {
            title,
            description,
            duration,
            startedAt,
            finishedAt,
            createdAt,
            id: trackerRef.id,
          });
          return { data: { id: trackerRef.id } };
        } catch (error) {
          const errorMessage =
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message?: string }).message
              : String(error);
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: ["Trackers"],
    }),
    deleteTracker: builder.mutation({
      queryFn: async ({ id }: { id: string }) => {
        try {
          const trackerRef = doc(collection(db, "trackers"), id);
          await deleteDoc(trackerRef);
          return { data: { id } };
        } catch (error) {
          const errorMessage =
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message?: string }).message
              : String(error);
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: ["Trackers"],
    }),
    updateTracker: builder.mutation({
      queryFn: async ({
        id,
        updates,
      }: {
        id: string;
        updates: Partial<{
          startedAt: Date | Timestamp | null;
          finishedAt: Date | Timestamp | null;
          duration: number;
        }>;
      }) => {
        try {
          const trackerRef = doc(collection(db, "trackers"), id);
          await updateDoc(trackerRef, updates);
          return { data: { id, updates } };
        } catch (error) {
          const errorMessage =
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message?: string }).message
              : String(error);
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: ["Trackers"],
    }),
  }),
});

export const {
  useGetTrackersQuery,
  useCreateTrackerMutation,
  useDeleteTrackerMutation,
  useUpdateTrackerMutation,
} = firebaseApi;
