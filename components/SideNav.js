import Link from "next/link";
import { withRouter } from "next/router";

const SideNav = ({ router: { pathname } }) => (
  <>
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link prefetch href="/admin">
              <a
                className={`nav-link ${pathname === "/admin" ? "active" : ""}`}
              >
                <i className="fas fa-tachometer-alt pr-2" />
                Dashboard
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link prefetch href="/admin/add-church">
              <a
                className={`nav-link ${
                  pathname === "/admin/add-church" ? "active" : ""
                }`}
              >
                <i className="fas fa-folder-plus pr-2" />
                Add Church
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <style jsx>{`
      .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        padding: 48px 0 0;
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
      }

      .sidebar-sticky {
        position: relative;
        top: 0;
        height: calc(100vh - 48px);
        padding-top: 0.5rem;
        overflow-x: hidden;
        overflow-y: auto;
      }

      @supports ((position: -webkit-sticky) or (position: sticky)) {
        .sidebar-sticky {
          position: -webkit-sticky;
          position: sticky;
        }
      }

      .sidebar .nav-link {
        font-weight: 500;
        color: #333;
      }

      .sidebar .nav-link .feather {
        margin-right: 4px;
        color: #999;
      }

      .sidebar .nav-link.active {
        color: #df7e00;
      }

      .sidebar .nav-link:hover .feather,
      .sidebar .nav-link.active .feather {
        color: inherit;
      }

      .sidebar-heading {
        font-size: 0.75rem;
        text-transform: uppercase;
      }

      a.nav-link:hover i {
        color: rgba(0, 0, 0, 0.5) !important;
      }
    `}</style>
  </>
);

export default withRouter(SideNav);
