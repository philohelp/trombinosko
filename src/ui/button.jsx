export default function Button({
  text,
  callBack = () => console.log("clicked !"),
  argument = null,
  className = "",
  textStyle = "text-white font-bold",
  buttonClassName = "bg-sky-400 hover:bg-blue-500 py-2 px-4 rounded transition duration-300 ease-in-out shadow hover:shadow-lg",
}) {
  return (
    <button
      className={`w-full ${buttonClassName} ${className}`}
      onClick={argument ? () => callBack(argument) : () => callBack()}
    >
      <p className={`${textStyle}`}>{text}</p>
    </button>
  );
}
