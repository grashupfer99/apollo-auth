import Navigation from "./Navigation";
import SideNav from "./SideNav";

export default ({ children, signout, title, name }) => (
  <>
    <div className="admin-layout">
      <Navigation signout={signout} name={name} />
      <div className="container-fluid">
        <div className="row">
          <SideNav />
          <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">{title}</h1>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
    <style jsx>{`
      .admin-layout {
        font-size: 0.875rem;
      }
      main {
        padding-top: 133px;
      }

      @media (min-width: 768px) {
        main {
          padding-top: 48px;
        }
      }
    `}</style>
  </>
);
