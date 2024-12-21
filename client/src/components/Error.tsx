
interface ErrorProps {
    message: string;
  }

const Error = ({message }: ErrorProps) => {
  return (
    <span className='text-red-600 text-sm'>{message}</span>
  )
}

export default Error