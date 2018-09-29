import React from "react";
import { Link } from "react-router-dom";
import {
  shoppingcartPage__URL,
  cameraPage__URL,
  cataloguePage__URL
} from "../../config/keys";

const Fragment = React.Fragment;

const Navigation = ({ activeButton }) => {
  const currentNavLayout = () => {
    console.log("activeButton is,", activeButton);
    switch (activeButton) {
      case "camera":
        return (
          <Fragment>
            <div className="camera active">
              <div className="header__secondary">Cam</div>
            </div>
            <Link to={cataloguePage__URL} className="catalogue">
              <div className="header__secondary">Cata</div>
            </Link>
            <Link to={shoppingcartPage__URL} className="shopping-cart">
              <div className="header__secondary">Cart</div>
            </Link>
          </Fragment>
        );
        break;
      case "catalogue":
        return (
          <Fragment>
            <Link to={cameraPage__URL} className="camera">
              <div className="header__secondary">Cam</div>
            </Link>
            <div className="catalogue active">
              <div className="header__secondary">Cata</div>
            </div>
            <Link to={shoppingcartPage__URL} className="shopping-cart">
              <div className="header__secondary">Cart</div>
            </Link>
          </Fragment>
        );
        break;
      case "shopping-cart":
        return (
          <Fragment>
            <Link to={cameraPage__URL} className="camera">
              <div className="header__secondary">Cam</div>
            </Link>
            <Link to={cataloguePage__URL} className="catalogue">
              <div className="header__secondary">Cata</div>
            </Link>
            <div className="shopping-cart active">
              <div className="header__secondary">Cart</div>
            </div>
          </Fragment>
        );
        break;
      default:
        break;
    }
  };

  return <section className="navigation">{currentNavLayout()}</section>;
};

export default Navigation;