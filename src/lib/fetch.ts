import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "@/types/api-schema";
import { getCookie } from "cookies-next";

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = getCookie("ACCESS_TOKEN");
    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return request;
  },
};

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  querySerializer: {
    allowReserved: true,
  },
});
client.use(authMiddleware);

export default client;
