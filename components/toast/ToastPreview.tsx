import { toast } from 'react-toastify'

export interface ToastPreviewProps {
  deactivateUrl: string
}

/**
 * Preview mode notification with link to exit preview mode
 */
export const ToastPreview = ({ deactivateUrl }: ToastPreviewProps) => (
  <div>
    Preview mode is active
    <br />
    <a href={deactivateUrl}>Deactivate</a>
  </div>
)

export const triggerToastPreview = ({ deactivateUrl }: ToastPreviewProps) =>
  toast(() => <ToastPreview deactivateUrl={deactivateUrl} />, {
    toastId: 'preview-mode',
    position: toast.POSITION.BOTTOM_RIGHT,
    type: toast.TYPE.INFO,
    autoClose: false,
    hideProgressBar: true,
    progress: undefined,
    closeButton: true,
    closeOnClick: false,
  })

export default ToastPreview
