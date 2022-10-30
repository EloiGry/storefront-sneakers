import { Link } from "gatsby"
import React from "react"
import SearchEngineOptimization from "../components/utility/seo"

const NotFoundPage = () => (
  <div className="layout-base">
    <SearchEngineOptimization title="404: Not found" />
    <div className="h-full w-full flex flex-col justify-center items-center mt-8">
      <h1 className="text-3xl">404: NOT FOUND</h1>
      <p className="mt-2">
        Vous venez d'emprunter un itinéraire qui n'existe pas... 😢
      </p>
      <Link to="/" className="mt-4 btn-ui">
        Page d'accueil
      </Link>
    </div>
  </div>
)

export default NotFoundPage
