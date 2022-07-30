import ReactDOM from 'react-dom'

interface IProps {
  text: string
  className?: string
}

const Toast = ({ text, className }: IProps) => {
  return (
    <div
      className={`fixed bottom-2.5 left-0 right-0 z-[99999] mx-auto max-w-[50vw] rounded-sm bg-[#111] py-1 text-center text-white ${className}`}
    >
      {text}
    </div>
  )
}

Toast.show = (text: string, delay = 2000) => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  ReactDOM.render(<Toast text={text} />, div)

  const close = () => {
    ReactDOM.unmountComponentAtNode(div)
    if (div && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  let timer: NodeJS.Timeout | null = null
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    close()
  }, delay)
}

export default Toast
