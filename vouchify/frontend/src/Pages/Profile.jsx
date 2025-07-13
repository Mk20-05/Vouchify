// src/Pages/Profile.jsx
import { useEffect, useState } from "react";
import api from "../lib/api";            // 👈 the instance with interceptor
import { useAuth } from "../Contexts/AuthContext";

export default function Profile() {
  const { loading: authLoading, isLoggedIn, user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    // wait for Firebase to finish AND user to be logged in
    if (authLoading || !isLoggedIn) return;

    (async () => {
      try {
        /* ── 1. try GET (most cases) ─────────────────────────── */
        let { data } = await api.get("/api/profile/");
        if (data.length === 0) {
          /* ── 2. if none, create one via POST ──────────────── */
          const res = await api.post("/api/profile/", {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "User",
          });
          data = res.data;
        } else {
          data = data[0]; // queryset filtered by user, so first item
        }
        setProfile(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setErr("Couldn't load profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, isLoggedIn, user]);

  /* ── render states ─────────────────────────────────────────── */
  if (authLoading || loading) {
    return (
      <div className="min-h-screen grid place-content-center text-lg">
        Loading profile…
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen grid place-content-center text-red-600">
        {err}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={
            profile.profile_pic ||
            `https://api.dicebear.com/6.x/initials/svg?seed=${profile.name}`
          }
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
          <p className="mt-2">{profile.bio || "No bio added yet."}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <strong>Phone:</strong> {profile.phone || "—"}
            </div>
            <div>
              <strong>Address:</strong> {profile.address || "—"}
            </div>
            <div>
              <strong>Date of Birth:</strong>{" "}
              {profile.dob ? profile.dob : "—"}
            </div>
            <div>
              <strong>Joined:</strong>{" "}
              {new Date(profile.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
