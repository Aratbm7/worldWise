import Button from "./Button";
import { useNavigate } from "react-router-dom";


function BackButton() {
  const navigator = useNavigate();

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigator(-1);
        }}
        type="back"
      >
        &larr; Back
      </Button>
    </div>
  );
}

export default BackButton;
