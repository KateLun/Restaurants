function Button(props) {

    const { title, handleClick } = props
    
    return (
        <button onClick={event => handleClick(event)} className="mx-1 bg-fuchsia-400 rounded-lg text-xl text-white px-4 py-1 shadow-md font-semibold">
            {title}
        </button>
    )
}

export default Button