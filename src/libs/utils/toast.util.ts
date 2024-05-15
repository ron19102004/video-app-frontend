import { toast as toastify, ToastOptions } from "react-toastify";
export enum EToastType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}
interface IToastProps {
  type: EToastType;
  message: string;
}
const toast = ({ type, message }: IToastProps) => {
  const options: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  switch (type) {
    case EToastType.success:
      toastify.success(message, options);
      break;
    case EToastType.error:
      toastify.error(message, options);
      break;
    case EToastType.warning:
      toastify.warning(message, options);
      break;
    case EToastType.info:
      toastify.info(message, options);
      break;
    default:
      break;
  }
};
export default toast;
