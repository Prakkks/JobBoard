import { Link } from 'react-router-dom'

interface Props
{
    content: string,
    url : string
}

const Button = ({content, url}: Props) => {
  return (
    <Link className=' hidden sm:block rounded-3xl font-semibold text-xs sm:text-base px-3 py-2 nav-link bg-white text-black ' to={url}> {content}</Link>
  )
}

export default Button