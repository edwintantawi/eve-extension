// Import the functions you need from the SDKs you need
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  InferenceMode,
} from "firebase/ai";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: new GoogleAIBackend() });
export const model = getGenerativeModel(ai, {
  mode: InferenceMode.PREFER_IN_CLOUD,
});
