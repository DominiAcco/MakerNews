import axios from "axios";

export const fileUploadService = {
  uploadImage: async (file: File): Promise<string> => {
    const sig = await axios.post("/api/fileUpload");
    const { timestamp, signature, apiKey, cloudName, folder } = sig.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const upload = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    const imageUrl: string = upload.data.secure_url;

    const optimizedUrl = imageUrl.replace("/upload/", "/upload/f_auto,q_auto/");

    return optimizedUrl;
  },

  deleteImage: async (imageUrl: string) => {
    await axios.delete("/api/fileUpload", {
      data: { imageUrl }
    });
  }
};
