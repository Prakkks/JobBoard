import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section className="flex flex-col w-full h-[100vh] items-center justify-center text-center">404 Error
    <Link to={'/'} replace className="underline hover:text-blue-600"> Go to Home Page</Link>
    </section>
  )
}

export default NotFound