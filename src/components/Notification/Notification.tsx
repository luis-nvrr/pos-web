import toast from 'react-hot-toast'

const SuccessToast = ({ t, message }: any) => (
  <div
    className={`bg-green-500 px-6 py-4 shadow-md rounded-xl text-white ${
      t.visible ? 'animate-enter' : 'animate-leave'
    }`}
  >
    {message}
  </div>
)

export const showSuccessNotification = (message: string) => {
  toast.custom((t) => <SuccessToast t={t} message={message} />)
}

const ErrorToast = ({ t, message }: any) => (
  <div
    className={`bg-red-500 px-6 py-4 shadow-md rounded-xl text-white ${
      t.visible ? 'animate-enter' : 'animate-leave'
    }`}
  >
    {message}
  </div>
)

export const showErrorNotification = (message: string) => {
  toast.custom((t) => <ErrorToast t={t} message={message} />)
}
