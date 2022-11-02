import { Link } from "gatsby"
import React from "react"
import AuthLayout from "../components/auth/auth-layout"
import Field from "../components/forms/field"
import ErrorMessage from "../components/utility/error-message"
import SearchEngineOptimization from "../components/utility/seo"
import { useAuth } from "../hooks/use-auth"

const SignUp = () => {
  const {
    forms: { registerForm },
  } = useAuth()

  return (
    <AuthLayout>
      <SearchEngineOptimization title="Créer mon compte" />
      <div className="w-3/5">
        <div className="mb-6 flex-grow">
          <h1 className="mb-1">Créer mon compte</h1>
          <p className="text-sm font-light">
          Vous avez déjà un compte?{" "}
            <Link to="/sign-in" className="underline">
              Se connecter
            </Link>
          </p>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault()
            registerForm.handleSubmit()
          }}
        >
          {registerForm.status?.authError && (
            <ErrorMessage error={registerForm.status.authError} />
          )}
          <Field
            label="Prénom"
            className="mb-4"
            autocomplete="given-name"
            name={"first_name"}
            formik={registerForm}
            defaultValue={registerForm.values.first_name}
          />
          <Field
            label="Nom"
            className="mb-4"
            autocomplete="family-name"
            name={"last_name"}
            formik={registerForm}
            defaultValue={registerForm.values.last_name}
          />
          <Field
            label="Email"
            autocomplete="email"
            className="mb-4"
            name={"email"}
            formik={registerForm}
            defaultValue={registerForm.values.email}
          />
          <Field
            label="Téléphone (optionnel)"
            autocomplete="tel"
            className="mb-4"
            name={"phone"}
            formik={registerForm}
            defaultValue={registerForm.values.phone}
          />
          <Field
            label="Mot de passe"
            type="password"
            autocomplete="new-password"
            name={"password"}
            formik={registerForm}
            defaultValue={registerForm.values.password}
          />
          <button className="btn-ui w-full mt-8" type="submit">
            Créer mon compte
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
