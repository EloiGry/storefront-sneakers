import { Link } from "gatsby"
import React from "react"

const Footer = () => {
  const socials = [
    {
      name: "GitHub",
      url: "https://www.github.com/",
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com/",
    },
    {
      name: "Discord",
      url: "https://discord.gg/",
    },
  ]

  const internals = [
    {
      name: "Retourner un article",
      to: "/create-return",
    },
    {
      name: "FAQ",
      to: "/faq",
    },
    {
      name: "Termes & Conditions",
      to: "/terms-and-conditions",
    },
  ]

  return (
    <footer>
      <div className="bg-white px-4 pt-24 pb-4 sm:px-6 lg:px-8 border-t border-ui-medium flex items-center justify-between text-sm">
        <div className="flex items-center">
          {internals.map(internal => {
            return (
              <Link
                to={internal.to}
                key={internal.name}
                className="mr-3 last:mr-0 text-ui-dark hover:text-gray-700"
              >
                {internal.name}
              </Link>
            )
          })}
        </div>
        <div className="flex items-center">
          {socials.map(social => {
            return (
              <a
                href={social.url}
                key={social.name}
                className="mr-3 last:mr-0 text-ui-dark hover:text-gray-700"
              >
                {social.name}
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
