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
