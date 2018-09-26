import React from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';

import { navicon } from 'react-icons-kit/fa/navicon';
import { ic_history } from 'react-icons-kit/md/ic_history';
import { ic_payment } from 'react-icons-kit/md/ic_payment';

import './LeftNavBar.css'

const Title = () => {
  return(
    <div className="left-navbar-title">
      <div className="left-navbar-title-icon">
        <SvgIcon size={20} icon={navicon}/>
      </div>
      {"Pic Me Up"}
    </div>
  )
}

const LeftNavBar = () => (
  <div className="left-navbar">
    <SideNav highlightColor='#FFF' highlightBgColor='#E8386D' defaultSelected='orders'>
      <Title/>
      <Nav id='orders'>
        <NavIcon><SvgIcon size={20} icon={ic_payment} /></NavIcon>
        <NavText> Orders </NavText>
      </Nav>
      <Nav id='history'>
        <NavIcon><SvgIcon size={20} icon={ic_history} /></NavIcon>
        <NavText> History </NavText>
      </Nav>
    </SideNav>
  </div>
);

export default LeftNavBar;

// export default class LeftNavBar extends Component {
//   constructor(){
//     super()
//     this.state = {
//       isOrdersClicked: true,
//       isHistoryClicked: false,
//       isSearchClicked: false
//     }
//   }

//   render(){
//     return(<div className="left-navbar">Hello</div>)
//   }
// }