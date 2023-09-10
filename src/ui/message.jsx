export default function Message({ text, className }) {
  return (
    <p
      className={`text-white text-center text-sm opacity-70 mt-8 ${className}`}
    >
      {text}
    </p>
  );
}
