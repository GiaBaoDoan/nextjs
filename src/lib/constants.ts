export const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const saltRounds = 10;

export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? process.env.NEXT_PUBLIC_DOMAIN
    : "http://localhost:3000";
