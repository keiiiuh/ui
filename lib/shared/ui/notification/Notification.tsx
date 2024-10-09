import { type ReactElement } from 'react'
import toast, { type Toast } from 'react-hot-toast'
import { CustomToast } from './ui/CustomToast'

export interface INotificationProps {
  duration?: number
  intent: 'info' | 'error'
  text: string
  customIcon?: ReactElement
  content?: ReactElement
  closure?: boolean
}

const renderToast = (props: INotificationProps) => {
  switch (props.intent) {
    case 'info':
      return toast.custom((toastOptions: Toast) => <CustomToast {...toastOptions} {...props} />, {
        duration: props.duration ?? 501000000
      })
    case 'error':
      return toast.custom((toastOptions: Toast) => <CustomToast {...toastOptions} {...props} />, {
        duration: props.duration ?? 1100000000
      })
    default:
      return null
  }
}

export const Notification = (props: INotificationProps) => {
  return renderToast(props)
}
