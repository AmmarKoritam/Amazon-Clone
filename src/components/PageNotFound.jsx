import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="page">
      <h2 className="center">Page Not Found</h2>
      <Link className="link" to="/">
        Click here to go Home Page
      </Link>
    </div>
  );
}

export default PageNotFound;
