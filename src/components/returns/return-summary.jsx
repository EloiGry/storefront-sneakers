import { Link } from "gatsby"
import React, { useState } from "react"
import { formatPrice } from "../../utils/format-price"
import ErrorMessage from "../utility/error-message"

const ReturnSummary = ({
  selectedItems = [],
  additionalItems = [],
  selectedShipping = null,
  currencyCode,
  completeReturn,
  error,
}) => {
  const [accepted, setAccepted] = useState(false)

  const calculateReturnItemsTotal = (items = []) => {
    return items && items.length > 0
      ? items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0)
      : 0
  }

  const calculateReturnShippingTotal = shipping => {
    return shipping ? shipping.amount : 0
  }

  const calculateAdditionalItemTotal = (additionalItems = []) => {
    return additionalItems && additionalItems.length > 0
      ? additionalItems.reduce((sum, i) => sum + i.amount * i.quantity, 0)
      : 0
  }

  const calculateReturnTotal = (items, shipping, additionalItems) => {
    return (
      calculateReturnItemsTotal(items) -
      calculateReturnShippingTotal(shipping) -
      calculateAdditionalItemTotal(additionalItems)
    )
  }

  return (
    <div className="bg-white shadow p-8 rounded-lg sticky top-28">
      <div className="flex flex-col">
        <h2 className="mb-3">Récapitulatif</h2>
        <div className="flex items-center justify-between mb-2">
          <p>Montant du remboursement</p>
          <p>
            {formatPrice(
              calculateReturnItemsTotal(selectedItems),
              currencyCode
            )}
          </p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p>Livraison</p>
          <p>
            -{" "}
            {formatPrice(
              calculateReturnShippingTotal(selectedShipping),
              currencyCode
            )}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Eléments supplémentaires</p>
          <p>
            -{" "}
            {formatPrice(
              calculateAdditionalItemTotal(additionalItems),
              currencyCode
            )}
          </p>
        </div>
        <div className="h-px w-full bg-ui-medium my-2" />
        <div className="flex items-center justify-between">
          <p>Total</p>
          <p>
            {formatPrice(
              calculateReturnTotal(
                selectedItems,
                selectedShipping,
                additionalItems
              ),
              currencyCode
            )}
          </p>
        </div>
        <label className="mt-3">
          <input
            type="checkbox"
            className="checkbox-ui"
            onChange={() => setAccepted(!accepted)}
          />
          <span>
            Vous êtes d'accord avec{" "}
            <Link to="terms-and-conditions">Termes &amp; Conditions</Link> and
            our <Link to="/return-policy">politique de retour</Link>
          </span>
        </label>
        <button
          className="btn-ui mt-4 disabled:bg-ui disabled:cursor-default"
          disabled={!accepted}
          onClick={async () => await completeReturn()}
        >
          Confirmer le renvoie
        </button>
        {error && (
          <div className="mt-2">
            <ErrorMessage error={error} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReturnSummary
