import "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export type Tracker = {
  createdAt: Timestamp;
  description: string;
  duration: number;
  finishedAt: Timestamp;
  startedAt: Timestamp;
  title: string;
};

export const dummyTracker: Tracker = {
  createdAt: Timestamp.now(),
  description: "some string",
  duration: 0,
  finishedAt: Timestamp.now(),
  startedAt: Timestamp.now(),
  title: "title string",
};
