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
      return "Oui !";
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

export default function Layout({ children, status = "wait", image = logo }) {
  return (
    <div className="content flex justify-center">
      <div className={`${getBgForStatus(status)} p-8 w-80 h-[600px] relative`}>
        <div className="w-full flex justify-center">
          <img src={image} alt="Mystery student" />
        </div>
        <p className="mt-6 text-white font-extralight text-4xl uppercase text-center">
          {getTitleForStatus(status)}
        </p>
        <div>{children}</div>
      </div>
    </div>
  );
}
