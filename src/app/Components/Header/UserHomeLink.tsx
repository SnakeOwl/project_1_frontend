import { BlueLinkReversed } from "@/Components/Links/ColoredLinks";

export default function UserHomeLink(){
    return (
        <BlueLinkReversed
            className="px-2 py-1 rounded mr-4"
            href={"/user/personal-page"}
        >
            <i className="bi bi-person-fill"></i>
        </BlueLinkReversed>
    )
}