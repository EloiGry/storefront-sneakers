import React, { useEffect, useState } from "react"
import OrderCompletedItem from "../components/orders/order-completed-item"
import OrderTotal from "../components/orders/order-total"
import SearchEngineOptimization from "../components/utility/seo"

const OrderConfirmed = ({ location }) => {
  const [order, setOrder] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(
    "Patientez, pendant que nous traitons votre commande."
  )

  useEffect(() => {
    const getOrder = async () => {
      const state = location.state
      const stateOrder = state?.order

      if (stateOrder) {
        setOrder(stateOrder)
      }
      setLoading(false)
    }

    getOrder()
  }, [location.state])

  useEffect(() => {
    const onNoOrder = () => {
      if (!order && !loading) {
        setMessage(
          "Nous n'avons pas pu trouver votre commande, elle a peut-être été expédiée, mais nous n'arrivons pas à la trouver pour le moment. Veuillez vérifier votre e-mail pour une confirmation de commande."
        )
      }
    }

    const checkForOrder = setTimeout(onNoOrder, 5000)

    return () => clearTimeout(checkForOrder)
  }, [order, loading])

  return !loading && order ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Order Confirmed" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">MERCI</span>
        <h1>Commande validée</h1>
        <p className="text-md font-light mt-3">
          Votre commande #{order.display_id} a été traité avec succès. vous serez
          recevez un e-mail avec le numéro de suivi de votre colis une fois celui-ci
          disponible.
        </p>
        <div className="my-8">
          {order.items.map((item, index) => {
            return (
              <OrderCompletedItem
                key={index}
                item={item}
                currencyCode={order.currency_code}
              />
            )
          })}
        </div>
        <OrderTotal order={order} />
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center px-6">
      <p>{message}</p>
    </div>
  )
}

export default OrderConfirmed
