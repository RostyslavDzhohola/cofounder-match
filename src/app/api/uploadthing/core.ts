import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  profilePhotoUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
  })
    .middleware(async () => {
      const { userId } = await auth();

      if (!userId) {
        throw new Error("Unauthorized");
      }

      return { userId };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
        key: file.key,
      };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
