import { useFormik } from "formik"
import React from "react"
import * as Yup from "yup"
import AccountLayout from "../../components/account/account-layout"
import Field from "../../components/forms/field"
import FormContainer from "../../components/forms/form-container"
import SearchEngineOptimization from "../../components/utility/seo"
import { useCustomer } from "../../hooks/use-customer"

const Account = () => {
  const {
    customer,
    actions: { updateCustomerDetails },
  } = useCustomer()

  const contactForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: customer?.first_name || "",
      last_name: customer?.last_name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Requis"),
      last_name: Yup.string().required("Requis"),
      email: Yup.string().email("Email invalide").required("Requis"),
      phone: Yup.string().optional(),
    }),
    onSubmit: async values => {
      const response = await updateCustomerDetails(values)
    },
  })

  const passwordForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Mot de passe est requis"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe doivent être les mêmes"
      ),
    }),
    onSubmit: async (values, { setStatus }) => {
      const response = await updateCustomerDetails({
        password: values.password,
      })

      if (response.error) {
        return
      }

      setStatus({ success: true })
    },
  })

  return (
    <AccountLayout>
      <SearchEngineOptimization title="Mon Compte" />
      <div>
        <FormContainer
          title="Contact"
          description="Nous avons besoin de ces informations au cas où nous aurions besoin de vous contacter."
          handleSubmit={contactForm.handleSubmit}
        >
          <div className="flex items-center mb-4">
            <Field
              label="Prénom"
              autocomplete="given-name"
              name="first_name"
              formik={contactForm}
              defaultValue={contactForm.values.first_name}
            />
            <div className="mx-2" />
            <Field
              label="Nom"
              autocomplete="family-name"
              name="last_name"
              formik={contactForm}
              defaultValue={contactForm.values.last_name}
            />
          </div>
          <div className="flex items-center">
            <Field
              label="Email"
              autocomplete="email"
              name="email"
              formik={contactForm}
              defaultValue={contactForm.values.email}
            />
            <div className="mx-2" />
            <Field
              label="Téléphone (optionnel)"
              autocomplete="tel"
              name="phone"
              formik={contactForm}
              defaultValue={contactForm.values.phone}
            />
          </div>
        </FormContainer>
      </div>
      <div className="mt-16">
        <FormContainer
          title="Mot de passe"
          description="Vous pouvez utiliser ce formulaire pour réinitialiser votre mot de passe."
          handleSubmit={passwordForm.handleSubmit}
        >
          <div className="flex items-center">
            <Field
              label="Nouveau mot de passe"
              type="password"
              autocomplete="new-password"
              name="password"
              formik={passwordForm}
              defaultValue={passwordForm.values.password}
            />
            <div className="mx-2" />
            <Field
              label="Confirmer mot de passe"
              type="password"
              autocomplete="new-password"
              name="passwordConfirmation"
              formik={passwordForm}
              defaultValue={passwordForm.values.passwordConfirmation}
            />
          </div>
        </FormContainer>
      </div>
    </AccountLayout>
  )
}

export default Account
