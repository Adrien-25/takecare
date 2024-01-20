// // pages/settings.js
// import React from "react";
// import Layout from "@/components/Layout";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const SettingsPage = () => {
//   return (
//     <Layout>
//       <div>
//         <h1>Paramètres</h1>
//         {/* Ajoutez ici les composants pour afficher les réglages de votre application */}
//       </div>
//     </Layout>
//   );
// };

// export default SettingsPage;

// pages/settings.js
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [role, setRole] = useState("Utilisateur");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre les modifications
    console.log("Modifications soumises :", { name, email, role });
  };
  const { data: session } = useSession();

  return (
    <Layout>
      {/* <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-md"> */}
        <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
        {/* <div className="flex bg-gray-300 gap-1 text-black rounded overflow-hidden"> */}
          <img src={session?.user?.image} alt="" className="w-15 h-15 rounded-full my-6" />
        {/* </div> */}
      
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Nom
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border rounded-md"
              value={session?.user?.name}
              onChange={(e) => setName(e.target.value)}
              readOnly
              disabled
            />
          </div>

          {/* Ajoutez ici d'autres champs pour l'image, l'e-mail, et le rôle */}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={session?.user?.email}
              readOnly
              disabled
            />
          </div>

          {/* <button
            type="submit"
            // className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            className="btn-primary py-1 "
          >
            Enregistrer les modifications
          </button> */}
        </form>
      {/* </div> */}
    </Layout>
  );
};

export default SettingsPage;
