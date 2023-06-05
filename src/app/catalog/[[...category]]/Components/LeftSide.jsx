import Categories from "./LeftSide/Categories";
import Searcher from "./LeftSide/Searcher";

export default function LeftSide({ className }) {
    return (
        <div className={className}>
            <Searcher className="mb-4" />
            <Categories />
        </div>
    )
}