import { Button, Label, TextInput } from "flowbite-react"
import { PiGitlabLogoFill } from "react-icons/pi"
import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-4">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl bold dark:text-white">
            <span className="py-2 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              <PiGitlabLogoFill className="inline" /> Blogs
            </span> Sing Up
          </Link>
          <p className="text-sm mt-4">This is the place where devlopers can create there blog and share with the world!</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your name" color="info" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" color="info" />
              <TextInput type="email" placeholder="Email" id="email" />
            </div>
            <div>
              <Label value="Your password" color="info" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink" outline>Sign Up</Button>
          </form>
          <p className="text-center mt-2">Have an account?
            <Link to="/sign-in" className="text-blue-600 ml-1">Sign-In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
