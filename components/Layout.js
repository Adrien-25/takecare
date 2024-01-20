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
      <div className="bg-zinc-800 w-screen h-screen flex items-center">
        <div className="bg-slate-600 text-center mx-auto gap-y-4 flex flex-col p-4 rounded-3xl	w-96">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FLogo%20-%20Take%20Care%20Second%20hand%20(1).png?alt=media&token=2c376238-72e4-4b47-8532-88628ec59020"
            alt="logo take care second hand"
            className="mx-auto w-64"
          />

          <button
            onClick={() => signIn("google")}
            className="bg-white p-3 px-10 rounded-lg flex mx-auto gap-5 justify-center w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="24" width="24"><path fill="#4285f4" d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"></path><path fill="#34a853" d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"></path><path fill="#fbbc02" d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"></path><path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"></path></svg>
            Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="bg-white p-3 px-10 rounded-lg flex mx-auto gap-5 justify-center w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Github
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd"/>
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
