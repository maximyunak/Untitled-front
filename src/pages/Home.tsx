import { Link } from "react-router-dom";
import { Loader } from "../features/Loader/Loader";
import { StrokeToFillOnce } from "../features/Loader/StrokeToFillOnce";

export const Home = () => {
  return (
    <div className="">
      {/* <Registration /> */}
      <Link to="/registration">
        <Loader />
      </Link>
    </div>
  );
};
