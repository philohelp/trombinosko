export default function IAm({ status, name, className = "mt-2" }) {
  return (
    <div className={`${className}`}>
      <p>
        {status === "success" ? "Je suis" : "Je suis"}{" "}
        <span className="font-bold">{name}</span>
      </p>
    </div>
  );
}
