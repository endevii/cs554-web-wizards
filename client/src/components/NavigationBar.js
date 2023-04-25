import { Link } from "react-router-dom";
function NavigationBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" id="navbar-custom">
        <a className="navbar-brand" href="/">
          NYC Histrocial Sites
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/" id="link-txt">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sites" id="link-txt">
                Sites
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/map" id="link-txt">
                Map
              </Link>
            </li>
          </ul>
          <Link to="/signin">
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
export default NavigationBar;