
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

// Context + Hook
export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Default export: AuthProvider (HMR safe)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const adminEmails = ["admin@gmail.com"];
  const librarianEmails = ["librarian@gmail.com"];

  // ================= Register =================
  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } finally {
      setLoading(false);
    }
  };

  // ================= Update Profile =================
  const updateUserProfile = async ({ displayName, photoURL }) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName, photoURL });
    setUser((prev) => ({ ...prev, name: displayName, photoURL }));
  };

  // ================= Login =================
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } finally {
      setLoading(false);
    }
  };

  // ================= Login with Backend =================
  const loginWithBackend = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;

      const token = await firebaseUser.getIdToken();
      localStorage.setItem("token", token);

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
      if (!data.success) throw new Error(data.message || "Backend login failed");

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

  // ================= Google Login =================
  const signInGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const token = await firebaseUser.getIdToken();
      localStorage.setItem("token", token);

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

  // ================= Logout =================
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      // localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // ================= Auth State Listener =================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        let role = "user";
        if (adminEmails.includes(firebaseUser.email)) role = "admin";
        else if (librarianEmails.includes(firebaseUser.email)) role = "librarian";

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role,
        });
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

export default AuthProvider;
