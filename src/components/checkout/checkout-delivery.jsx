import React from "react"
import ShippingOptions from "../shipping/shipping-options"

const CheckoutDelivery = ({ controller, options, currencyCode = "eur" }) => {
  const { setSelectedShippingMethod, selectedShippingMethod } = controller
  return (
    <div className="my-8">
      <div className="text-gray-700 text-xs flex items-center">
        <div className="bg-gray-400 text-white w-4 h-4 rounded-lg text-center mr-2">
        !
      </div>
      <p>Des taxes peuvent s'appliquer et seront ajoutées lors du passage à l'étape suivante.</p>
      </div>
      <ShippingOptions
        defaultValue={selectedShippingMethod}
        onSelect={setSelectedShippingMethod}
        options={options}
        currencyCode={currencyCode}
      />
    </div>
  )
}

export default CheckoutDelivery
