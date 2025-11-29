import axios from "axios";

export const fileUploadService = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", "publications");

    const { data } = await axios.post("/api/fileUpload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!data?.res?.secure_url) {
      throw new Error("Erro ao enviar imagem para o Cloudinary");
    }

    return data.res.secure_url;
  },
};
