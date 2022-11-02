import React, { useEffect, useState } from "react"
import ReturnCompletedItem from "../components/returns/return-completed.item"
import SearchEngineOptimization from "../components/utility/seo"
import { useRetrieveOrder } from "../hooks/use-order"
import { formatPrice } from "../utils/format-price"

const ReturnConfirmed = ({ location }) => {
  const [confirmedReturn, setConfirmedReturn] = useState(undefined)
  const [items, setItems] = useState([])
  const [currencyCode, setCurrencyCode] = useState("eur")
  const [refundAmount, setRefundAmount] = useState(0)
  const [loading, setLoading] = useState(true)

  const retrieve = useRetrieveOrder(location.state?.confirmedReturn?.order_id)

  useEffect(() => {
    const getReturn = async () => {
      const state = location.state
      const stateReturn = state?.confirmedReturn

      if (stateReturn) {
        setConfirmedReturn(stateReturn)

        setRefundAmount(stateReturn.refund_amount)

        const order = await retrieve()

        if (order) {
          setCurrencyCode(order.currency_code)

          const itemIds = stateReturn.items.map(({ item_id }) => item_id)

          const returnedItems = []

          order.items.forEach(item => {
            if (itemIds.includes(item.id)) {
              const quantity = stateReturn.items.find(
                ({ item_id }) => item_id === item.id
              ).quantity
              returnedItems.push({ ...item, quantity })
            }
          })

          setItems(returnedItems)
        }
      }
      setLoading(false)
    }

    getReturn()
  }, [location.state, retrieve])

  return !loading && confirmedReturn ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Retour confirmé" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">MERCI</span>
        <h1>Retour confirmé</h1>
        <p className="text-md font-light mt-3">
        Votre retour a été un succès. Si vous avez acheté l'expédition de retour, vous
          recevoir un e-mail avec des instructions supplémentaires sous peu. Une fois le retour effectué
          traité, votre remboursement de{" "}
          <span className="font-semibold">
            {formatPrice(refundAmount, currencyCode)}
          </span>{" "}
          sera versé sur votre compte.
        </p>
        <div className="my-8">
          {items.map((item, index) => {
            return <ReturnCompletedItem key={index} item={item} />
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>Un instant...</p>
    </div>
  )
}

export default ReturnConfirmed
