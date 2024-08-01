import { Link } from "react-router-dom";
import { Loader } from "../components/Loader/Loader";
import { StrokeToFillOnce } from "../components/Loader/StrokeToFillOnce";

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
