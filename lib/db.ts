import { openDB } from "idb";

const DB_NAME = "BlogDB";
const STORE_NAME = "blogs";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
      }
    },
  });
};
