import { t } from "../utils/constants";
import { ToastPresetTypes } from "./index";
import Ionicons from '@expo/vector-icons/Ionicons';

export const getIcon = (type: ToastPresetTypes) => {

  const ICON_SIZE = 24

  switch (type) {
    case 'success':
      return (
        <Ionicons name="checkmark-circle" size={ICON_SIZE} color={'#1f8722'} />
      )
    case 'error':
      return (
        <Ionicons name="close-circle" size={ICON_SIZE} color={'#d9100a'} />
      )
    case 'info':
      return (
        <Ionicons name="alert-circle" size={ICON_SIZE} color={t.gray500} />
      )
    default:
      return null
  }

}