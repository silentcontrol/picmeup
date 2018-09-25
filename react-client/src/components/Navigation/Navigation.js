import React from "react";

const Fragment = React.Fragment;

const Navigation = ({ activeButton }) => {
  //let activeButton = getActiveButton();

  /*  function getActiveButton() {
    let buttonThatIsTrue,
      keysOfButtonStates = Object.keys(buttonStates);

    buttonThatIsTrue = keysOfButtonStates
      .map(currentButton => {
        if (buttonStates[currentButton]) {
          return currentButton;
        }
      })
      .filter(word => word !== undefined);

    return buttonThatIsTrue[0];
  } */

  const currentNavLayout = () => {
    console.log("activeButton is,", activeButton);
    switch (activeButton) {
      case "camera":
        return (
          <Fragment>
            <div className="camera active">
              <div className="header__secondary">Cam</div>
            </div>
            <div className="catalogue">
              <div className="header__secondary">Cata</div>
            </div>
            <div className="shopping-cart">
              <div className="header__secondary">Cart</div>
            </div>
          </Fragment>
        );
        break;
      case "catalogue":
        return (
          <Fragment>
            <div className="camera">
              <div className="header__secondary">Cam</div>
            </div>
            <div className="catalogue active">
              <div className="header__secondary">Cata</div>
            </div>
            <div className="shopping-cart">
              <div className="header__secondary">Cart</div>
            </div>
          </Fragment>
        );
        break;
      case "shopping-cart":
        return (
          <Fragment>
            <div className="camera">
              <div className="header__secondary">Cam</div>
            </div>
            <div className="catalogue">
              <div className="header__secondary">Cata</div>
            </div>
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
