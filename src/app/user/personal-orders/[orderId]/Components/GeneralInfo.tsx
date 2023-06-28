import IOrder from "@/interfaces/IOrder";

export default function GeneralInfo({
    order,
    lang
}: {
    order: IOrder
    lang: any
}) {
    return (
        <div className="flex justify-between">
            <div className="border border-gray-600 w-full xl:w-1/4 p-4 rounded-lg mx-2">
                <div className="border-b border-gray-600 py-4">
                    {`${lang["status"]}: ${order.status}`}
                </div>

                <div className="border-b border-gray-600 py-4">
                    {`${lang["payment method"]}: ${order.payment_method}`}
                </div>                

                <div className="py-4">
                    {`${lang["delivery method"]}: ${order.delivery_method}`}
                </div>
            </div>

            <div className="border border-gray-600 w-full xl:w-1/4 p-4 rounded-lg mx-2">
                <div className="border-b border-gray-600 py-4">
                    {`${lang["full price"]}: ${order.price}`}
                </div>

                <div className="py-4">
                    {`${lang["payment status"]}: ` + (order.payment_status === false ? lang["is not paid"] : lang["is paid"])}
                </div>
            </div>

            <div className="border border-gray-600 w-full xl:w-1/4 p-4 rounded-lg mx-2">
                <div className="border-b border-gray-600 py-4">
                    {`${lang["phone"]}: ${order.phone}`}
                </div>
                <div className="border-b border-gray-600 py-4">
                    {`${lang["date delivered"]}: ` + (order.date_delivered === null? lang["in process"]: order.date_delivered) }
                </div>
                <div className="py-4">
                    {`${lang["address"]}: ${order.address}`}
                </div>
            </div>
        </div>
    )
}