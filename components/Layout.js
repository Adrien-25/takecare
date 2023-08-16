// Importing required modules and components
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "@/components/Logo";

// Defining the Layout component which acts as a wrapper for other components
export default function Layout({ children }) {
  // Using useState hook to manage state for showing/hiding navigation menu
  const [showNav, setShowNav] = useState(false);

  // Fetching the session data using next-auth's useSession hook
  const { data: session } = useSession();

  // If the user is not authenticated (session is not available), display a login button
  if (!session) {
    return (
      <div className="bg-bgDark bg-cyan-300 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FLogo%20-%20Take%20Care%20Second%20hand%20(1).png?alt=media&token=2c376238-72e4-4b47-8532-88628ec59020"
            alt="logo take care second hand"
            className="mx-auto w-64"
          />

          <button
            onClick={() => signIn("google")}
            className="bg-white p-3 px-10 rounded-lg flex mx-auto gap-5 mt-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="24"
              width="24"
            >
              <path
                fill="#4285f4"
                d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"
              ></path>
              <path
                fill="#34a853"
                d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"
              ></path>
              <path
                fill="#fbbc02"
                d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"
              ></path>
              <path
                fill="#ea4335"
                d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"
              ></path>
            </svg>
            Se Connecter avec Google
          </button>
        </div>
      </div>
    );
  }

  // If the user is authenticated (session is available), display the main layout
  return (
    <div className="bg-bgGray min-h-screen ">
      {/* Mobile navigation toggle button */}
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Logo component */}
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>

      {/* Main layout */}
      <div className="flex">
        {/* Render the Nav component with the showNav state */}
        <Nav show={showNav} />
        {/* Render the children components */}
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
