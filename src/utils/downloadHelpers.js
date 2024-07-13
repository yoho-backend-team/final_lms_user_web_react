import { getFile } from "features/common/upload";
import { getImageUrl } from "./common/imageUtlils";
import toast from "react-hot-toast";

export const handleDownload = async (note,showSpinner,hideSpinner) => {
    try {
      showSpinner();
      const url = getImageUrl(note.file);
      const response = await getFile(url);
      const blob = new Blob([response?.data], {
        type: response.headers["Content-Type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = note?.file?.split("/")[2];
      link.click();
  
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      hideSpinner();
    }
  };