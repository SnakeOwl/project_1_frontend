import { BlueButton, BlueButtonReversed } from "@/Components/Buttons/ColoredButtons";
import { Input } from "@/Components/Inputs/Inputs";
import axiosClient from "@/axios-client";
import { useState } from "react";

export default function SubscribeForm({
    dictionary,
    offerId,
}: {
    dictionary: any
    offerId: number
}) {


    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        axiosClient.post('/subscribe', {
            offer_id: offerId,
            email: email
        }).then(() => {
            setIsSubscribed(true);
        }).catch(error => {
            setError(true);
        })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    if (isSubscribed)
        return (
            <BlueButtonReversed className="w-full py-2">
                {dictionary["user subscribed"]}
            </BlueButtonReversed>
        )

    if (error)
        return <p className="text-center text-3xl"><i className="bi bi-x-square"></i></p>


    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="w-full mb-1"
            >
                <Input
                    id="email"
                    type="email"
                    onChange={handleChange}
                    value={email}
                    labelText={`${dictionary["email"]}:`}
                    placeholder="WalterWhite@gmail.com"
                    className="mb-1"
                    required
                />
                <BlueButton className="w-full py-2 text-2xl rounded-sm">
                    <i className="bi bi-envelope-check-fill"></i>
                </BlueButton>
            </form>

            <p className="text-center">{dictionary["subscribe text"]}</p>
        </div>
    )
};