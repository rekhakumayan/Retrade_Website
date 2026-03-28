import { store } from "@/redux/store";
import { selectToken } from "@/modules/auth/auth.selectors";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiRequest(method, path, body = null) {
  const token = selectToken(store.getState());

  const headers = { "Content-Type": "application/json" };
  if (token) headers["authorization"] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}/v1${path}`, options);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went wrong");

  return data;
}
