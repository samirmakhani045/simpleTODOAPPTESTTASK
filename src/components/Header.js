import React from "react";

class Header extends React.Component {
   render() {
  return (
<header>
   <div className="Header">
      <div className="Header__inner"> 
         <div className="Header__logo" style={{display:'flex'}} >
         <button className="w3-button w3-teal w3-xlarge" style={{color: '#272E71',margin:'auto',height:48}}  onClick={() => this.props.handleChangeProps()}>☰</button>
            <div className="LogoLink"><a href="https://innoloft.com/public" className="LogoLink__link"><img className="LogoDesktop LogoDesktop--header" src="https://anvkgjjben.cloudimg.io/width/400/x/https://img.innoloft.de/innoloft-no-white-space.svg" alt="logo" /></a></div>
         </div>
      </div>
   </div>
</header>
  )
   }
}

export default Header