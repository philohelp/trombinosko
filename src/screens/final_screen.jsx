import Layout from "../ui/layout";
import Button from "../ui/button";

import logo from "/icon128.png";

export default function FinalScreen({
  numberOfMistakes,
  reset,
  replayMistakes,
}) {
  return (
    <Layout
      status={
        numberOfMistakes === 0 ? "finalWithoutMistakes" : "finalWithMistakes"
      }
      image={logo}
    >
      <div className="mt-6 text-center">
        {numberOfMistakes === 0 ? (
          <div>
            <p>Vous avez reconnu</p>
            <p>tous les élèves !</p>
          </div>
        ) : (
          <div>
            <p>
              Vous avez fait{" "}
              <span className="font-bold">{numberOfMistakes} </span>
              erreurs
            </p>
            <p>
              Vous pouvez améliorer votre score en rejouant uniquement les
              erreurs.
            </p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full px-8 pb-8">
        {numberOfMistakes !== 0 && (
          <Button
            text="Reprendre les erreurs"
            callBack={() => replayMistakes()}
          />
        )}
        <Button
          text="Relancer le jeu"
          callBack={() => reset()}
          className="mt-4"
        />
      </div>
    </Layout>
  );
}
