import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 您提供的 Gold Land HK 專案設定
const firebaseConfig = {
  apiKey: "AIzaSyDgxoJInutJY7ZvqCUi6ZG8sFOn3L0pGQg",
  authDomain: "gold-land-hk.firebaseapp.com",
  projectId: "gold-land-hk",
  storageBucket: "gold-land-hk.firebasestorage.app",
  messagingSenderId: "443962742926",
  appId: "1:443962742926:web:406792d73242b0b775d1df",
  measurementId: "G-7BYE0M8EZY"
};

// 初始化 Firebase
// 檢查是否已經初始化過，避免在開發環境重複執行導致錯誤
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };