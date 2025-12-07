import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgxoJInutJY7ZvqCUi6ZG8sFOn3L0pGQg",
  authDomain: "gold-land-hk.firebaseapp.com",
  projectId: "gold-land-hk",
  storageBucket: "gold-land-hk.firebasestorage.app",
  messagingSenderId: "443962742926",
  appId: "1:443962742926:web:406792d73242b0b775d1df",
  measurementId: "G-7BYE0M8EZY"
};

// 初始化 Firebase (加入防錯處理)
let app;
let db;
let auth;

try {
  // 檢查是否已經初始化
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  // 加入 try-catch 防止瀏覽器隱私設定導致 Auth 初始化失敗
  try {
    auth = getAuth(app);
  } catch (e) {
    console.warn("Auth initialization blocked by browser settings (likely Incognito mode).", e);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { db, auth };
