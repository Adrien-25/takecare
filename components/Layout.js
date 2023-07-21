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
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
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
