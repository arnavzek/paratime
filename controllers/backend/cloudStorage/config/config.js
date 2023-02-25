import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.CLOUDSTORAGE_PROJECT_ID,
  credentials: {
    private_key: process.env.CLOUDSTORAGE_PRIVATE_KEY.replace(
      new RegExp("\\\\n", "g"),
      "\n"
    ),
    client_email: process.env.CLOUDSTORAGE_CLIENT_EMAIL,
  },
});

export default storage;
