import React from 'react';
import AuthLayout from "../components/auth/auth-layout"
import SearchEngineOptimization from "../components/utility/seo"

const Contact = () => {
          return (
            <AuthLayout>
              <SearchEngineOptimization title="Contact"/>
              <div className="w-3/5">
                <div className="mb-4 flex-grow">
                  <h1 className="mb-1">Une question ?</h1>
                  <p className="text-sm font-light">
                    N'hésitez pas à nous contacter !
                  </p>
                </div>
                <form>
                    <label htmlFor="FirstName" className="block text-xs font-medium text-gray-700">
                        Prénom
                    </label>
                    <input
                        type="text"
                        id="FirstName"
                        placeholder="Prénom"
                        className="mt-1 mb-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                    <label htmlFor="Name" className="block text-xs font-medium text-gray-700">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="Name"
                        placeholder="Nom"
                        className="mt-1 mb-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                    <label htmlFor="Email" class="block text-xs font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="Email"
                        placeholder="Email"
                        className="mt-1 mb-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                    <label htmlFor="Message" className="block text-xs font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        id="Message"
                        placeholder="Votre message.."
                        className="mt-1 mb-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />

                  <button className="btn-ui w-full mt-6" type="submit">
                    Envoyer
                  </button>
                </form>
              </div>
            </AuthLayout>
          )
};

export default Contact;