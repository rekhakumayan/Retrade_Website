import { toast } from "react-toastify";
import styles from "./Toast.module.css"

export const useToast = () => {

  const showToast = (type, message) => {
     
    const classMap = {
        success: styles.successToast,
        error: styles.errorToast
    };
    toast[type](message, {
        className: classMap[type] 
    });
  };

  return { showToast };
};