import { customAlphabet } from "nanoid";

const nanoId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

export const xId = () => nanoId();
