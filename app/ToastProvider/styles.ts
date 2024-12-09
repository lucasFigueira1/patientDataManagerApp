import { t } from "../utils/constants";
import { ToastPresetTypes } from "./index";

export const getStyles = (type: ToastPresetTypes) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: '#def1d7',
        titleColor: '#1f8722',
        descriptionColor: '#1f8722',
      }
    case 'error':
      return {
        backgroundColor: '#fae1db',
        titleColor: '#d9100a',
        descriptionColor: '#d9100a',
      }
    case 'info':
      return {
        backgroundColor: '#f5f5f5',
        titleColor: t.gray700,
        descriptionColor: 'gray',
      }
    default:
      return {
        backgroundColor: '#f5f5f5',
        titleColor: '#000',
        descriptionColor: 'gray',
      }
  }
}