import { Link } from "react-router-dom";
function NavigationBar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light" id="navbar-custom">
        <a class="navbar-brand" href="/">
          NYC Histrocial Sites
        </a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link class="nav-link" to="#" id="link-txt">
                Sites
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#" id="link-txt">
                Map
              </Link>
            </li>
          </ul>
          <Link to="/signin">
            <button class="btn btn-outline-light my-2 my-sm-0" type="submit">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
export default NavigationBar;
