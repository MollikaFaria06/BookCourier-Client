// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const adminEmails = ["admin@gmail.com"];
  const librarianEmails = ["librarian@gmail.com"];

  // Firebase Email/Password register
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update profile
  const updateUserProfile = async ({ displayName, photoURL }) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName, photoURL });
    setUser((prev) => ({ ...prev, name: displayName, photoURL }));
  };

  // Firebase login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } finally {
      setLoading(false);
    }
  };

  // Login + Backend auto-create + role
  const loginWithBackend = async (email, password) => {
    setLoading(true);
    try {
      //  Firebase login
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;

      //  Get ID token
      const token = await firebaseUser.getIdToken();

      //  Call backend
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/firebase-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: {
            name: firebaseUser.displayName,
            picture: firebaseUser.photoURL,
          },
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Backend login failed");

      const appUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || data.user.name,
        photoURL: firebaseUser.photoURL || data.user.profileImage,
        role: data.user.role || "user",
      };

      setUser(appUser);
      return appUser;
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Google login (default user)
  const signInGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Get token
      const token = await firebaseUser.getIdToken();

      // Backend auto-create
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/firebase-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: { name: firebaseUser.displayName, picture: firebaseUser.photoURL },
        }),
      });

      const data = await res.json();

      const appUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || data.user.name,
        photoURL: firebaseUser.photoURL || data.user.profileImage,
        role: data.user.role || "user",
      };

      setUser(appUser);
      return appUser;
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Google login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        let role = "user";
        if (adminEmails.includes(firebaseUser.email)) role = "admin";
        else if (librarianEmails.includes(firebaseUser.email)) role = "librarian";

        const appUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role,
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        updateUserProfile,
        login,
        loginWithBackend,
        signInGoogle,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
