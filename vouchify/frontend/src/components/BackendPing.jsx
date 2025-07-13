import { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function BackendPing() {
  const { user } = useAuth();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user) return;
    api.get("/hello/")
       .then((r) => setMsg(r.data.msg))
       .catch(console.error);
  }, [user]);

  return <p className="mt-6 text-xl">{msg || "Sign in to ping backend…"}</p>;
}
