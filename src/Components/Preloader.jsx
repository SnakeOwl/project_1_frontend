export default function Preloader({
    className=""
}) {
    return (
        <div className={className + " animate-spin text-3xl w-15 h-15 mx-auto"} >
            <i className="bi bi-arrow-repeat"></i>
        </div>
    )
}