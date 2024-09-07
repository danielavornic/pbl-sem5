import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// TODO: Implement auth function
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const appFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url, type: file.type, size: file.size };
    })
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
