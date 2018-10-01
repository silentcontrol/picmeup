import React from 'react';
import { withRR4, Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';

import { ic_history } from 'react-icons-kit/md/ic_history';
import { ic_payment } from 'react-icons-kit/md/ic_payment';
import { ic_search } from 'react-icons-kit/md/ic_search'

import './LeftNavBar.css'

const SideNav = withRR4();

const Title = () => {
  return(
    <div className="left-navbar-title">
      {"Pic Me Up"}
    </div>
  )
}

const LeftNavBar = ({ getView }) => {

  const _onClick = (e) => {
    getView(e.target.id);
  }

  return(<div className="left-navbar">
    <SideNav highlightColor='#FFF' highlightBgColor='#E8386D'>
      <Title/>
      <Nav id='orders' onClick={_onClick}>
        <NavIcon><SvgIcon size={20} icon={ic_payment} /></NavIcon>
        <NavText> Orders </NavText>
      </Nav>
      <Nav id='history' onClick={_onClick}>
        <NavIcon><SvgIcon size={20} icon={ic_history} /></NavIcon>
        <NavText> History </NavText>
      </Nav>
      <Nav id='search' onClick={_onClick}>
        <NavIcon><SvgIcon size={20} icon={ic_search} /></NavIcon>
        <NavText> Search </NavText>
      </Nav>
    </SideNav>
  </div>)
}

export default LeftNavBar;
