import Link from "next/link";
// import { withRouter } from "next/router";

const Navigation = ({ signout, name }) => (
  <>
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <Link prefetch href="/admin">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0">Church-Locator</a>
      </Link>

      <ul className="navbar-nav px-3 d-block">
        <li className="nav-item text-nowrap d-inline-block">
          <span className="nav-link">
            <i className="fas fa-user pr-2" />
            {name}
          </span>
        </li>
        <li className="nav-item text-nowrap d-inline-block pl-4">
          <span className="nav-link" onClick={signout}>
            Sign out
          </span>
        </li>
      </ul>
    </nav>
    <style jsx>{`
      .navbar-brand {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        font-size: 1rem;
        background-color: rgba(0, 0, 0, 0.25);
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
      }

      .form-control-dark {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .form-control-dark:focus {
        border-color: transparent;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
      }

      .navbar-nav > li {
        cursor: pointer;
      }
    `}</style>
  </>
);

export default Navigation;

{
  /* <nav className="navbar navbar-light bg-light">
<div>
  <Link prefetch href="/">
    <a
      className={`nav-link d-inline-block ${
        pathname === "/" ? "is-active" : ""
      }`}
    >
      Home
    </a>
  </Link>
  <Link prefetch href="/about">
    <a
      className={`nav-link d-inline-block ${
        pathname === "/" ? "is-active" : ""
      }`}
    >
      About
    </a>
  </Link>
</div>
</nav> */
}
