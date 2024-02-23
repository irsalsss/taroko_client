import { ToastOptions, toast } from "react-toastify";

export const notify = (message: string, options?: ToastOptions) =>
  toast(message, options);
