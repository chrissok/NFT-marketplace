import Button from "@/components/Buttons/Button";
import { animations } from "@/constants/PlaygroundViewer/animations";

function AnimationList({
  handleAnimationChange,
}: {
  handleAnimationChange: (url: string) => void;
}) {
  return (
    <div className="bg-black-lighter-1 p-5 z-20 rounded-xl flex flex-col gap-y-3">
      {animations.map((animation) => (
        <Button
          onClick={() => handleAnimationChange(animation)}
          key={animation}
          text={animation}
        />
      ))}
    </div>
  );
}

export default AnimationList;
