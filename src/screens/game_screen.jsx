import Layout from "../ui/layout";
import IAm from "../ui/iam";
import Button from "../ui/button";

export default function GameScreen({
  status,
  currentList,
  count,
  checkAnswer,
  goOn,
  threeChoices,
}) {
  return (
    <Layout status={status} image={currentList[count].url}>
      <div className="mt-4 text-center">
        {(status === "success" || status === "fail") && (
          <IAm
            status={status}
            name={`${currentList[count].firstname} ${currentList[count].lastname}`}
          />
        )}
        {status === "guess" && (
          <>
            {" "}
            {threeChoices.map((student) => (
              <div className="mt-4" key={student?.url}>
                <Button
                  argument={student}
                  callBack={checkAnswer}
                  text={`${student?.firstname} ${student?.lastname}`}
                  textStyle="text-white text-sm font-semibold"
                />
              </div>
            ))}
            <div className="mt-4">
              <Button
                argument={{ notAPic: true }}
                callBack={checkAnswer}
                text="Ce n'est pas une vraie photo"
                textStyle="text-white text-xs font-light"
                buttonClassName="px-4 py-2 bg-transparent"
              />
            </div>
          </>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full px-8 pb-8">
        {status !== "guess" && (
          <div className="mt-8">
            <Button text="Continuer" callBack={goOn} />
            <p className="mt-8 text-sm font-light text-center">
              {currentList.length - count - 1} élèves restants sur{" "}
              {currentList.length}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
