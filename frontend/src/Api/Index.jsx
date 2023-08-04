import React from "react";

export const API_URL = "http://localhost:3000/api/user";

export function USER_POST_LOGIN(body) {
  return {
    url: API_URL,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
