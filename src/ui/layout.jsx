import logo from "/icon128.png";

function getBgForStatus(status) {
  switch (status) {
    case "success":
      return "bg-green-500";
    case "fail":
      return "bg-red-400";
    default:
      return "bg-indigo-400";
  }
}

function getTitleForStatus(status) {
  switch (status) {
    case "welcome":
      return "Bienvenue !";
    case "check":
      return "Bienvenue !";
    case "success":
      return "Oui";
    case "fail":
      return "Non :(";
    case "finalWithMistakes":
      return "Fin de la partie !";
    case "finalWithoutMistakes":
      return "Félicitations";
    default:
      return "Qui suis-je ?";
  }
}

export default function Layout({ children, status = "guess", image = logo }) {
  return (
    <div className="flex justify-center content">
      <div className={`${getBgForStatus(status)} p-8 w-80 h-[600px] relative`}>
        <div className="flex justify-center w-full">
          <img src={image} alt="Mystery student" />
        </div>
        <p className="mt-6 text-4xl text-center text-white uppercase font-extralight">
          {getTitleForStatus(status)}
        </p>
        <div>{children}</div>
      </div>
    </div>
  );
}
