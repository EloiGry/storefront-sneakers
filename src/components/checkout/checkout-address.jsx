import React, { useEffect, useState } from "react"
import { useRegion } from "../../hooks/use-region"
import Field from "../forms/field"
import Select from "../forms/select"
import SplitField from "../forms/split-field"

const CheckoutAddress = ({ controller }) => {
  const [countries, setCountries] = useState([])
  const { region } = useRegion()

  useEffect(() => {
    if (region) {
      setCountries(region.countries)
    }
  }, [region])

  return (
    <div className="mt-3 mb-6">
      <SplitField>
        <Field
          label="Prénom"
          autocomplete="given_name"
          name="first_name"
          formik={controller}
          defaultValue={controller.values.first_name}
        />
        <Field
          label="Nom"
          autocomplete="family-name"
          name="last_name"
          formik={controller}
          defaultValue={controller.values.last_name}
        />
      </SplitField>
      <Field
        label="Entreprise"
        className="mt-4"
        autocomplete="organization"
        name="company"
        formik={controller}
        defaultValue={controller.values.company}
      />
      <Field
        label="Adresse"
        className="mt-4"
        autocomplete="address-line1"
        name="address_1"
        formik={controller}
        defaultValue={controller.values.address_1}
      />
      <Field
        label="Numéro d'ppartement, précision.."
        className="mt-4"
        autocomplete="address-line2"
        name="address_2"
        formik={controller}
        defaultValue={controller.values.address_2}
      />
      <SplitField>
        <Select
          label="Pays"
          autocomplete="country-code"
          name="country_code"
          formik={controller}
          defaultValue={controller.values.country_code}
          options={countries.map(country => ({
            label: country.display_name,
            value: country.iso_2,
          }))}
        />
        <Field
          label="Ville"
          autocomplete="city-code"
          name="city"
          formik={controller}
          defaultValue={controller.values.city}
        />
      </SplitField>
      <SplitField>
        <Field
          label="Département"
          autocomplete="address-level1"
          name="province"
          formik={controller}
          defaultValue={controller.values.province}
        />
        <Field
          label="Code Postal"
          autocomplete="postal-code"
          name="postal_code"
          formik={controller}
          defaultValue={controller.values.postal_code}
        />
      </SplitField>
      <Field
        label="Téléphone"
        className="mt-4"
        autocomplete="tel"
        name="phone"
        formik={controller}
        defaultValue={controller.values.phone}
      />
    </div>
  )
}

export default CheckoutAddress
