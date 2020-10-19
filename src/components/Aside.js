import React, { Component } from "react";
import UserDetails from './UserDetials';
import UserSetting from './UserSetting';
class Aside extends Component {
    state = {
        activateTab: 2,
        openSideBar:true
      };
      handleClick(i){
          this.setState({
              activateTab :i
          })
      }
      close(){
        this.setState({
          openSideBar :0
      })
      }
      open(){
        this.setState({
          openSideBar :1
      })
      }


render() {
  return (
    <header style={{minHeight:600 , marginTop:83 ,backgroundColor:'#cccccc'}}>
      <div style={{
        display:'flex',
        flexDirection:'row',
        minHeight:600
      }} > 
          <div
          style={{
            display:'flex',
            width :'100%',
            flexDirection:'row',
            minHeight:600
          }}
          >
            <div style={{     
        display:'flex',
        flexDirection:'column',
      }}>
        <div className="w3-sidebar w3-bar-block w3-border-right" 
        style={{
          height:'100%',
          display:this.props.openSideBar ? 'block':'none'
        }}
        id="mySidebar">
           <button onClick={() => this.props.handleChangeProps()}    className="w3-bar-item w3-large ">Close &times;</button>
           <a  onClick={() => this.handleClick(1)} className="w3-bar-item w3-button">User Details</a>
           <a  onClick={() => this.handleClick(2)} className="w3-bar-item w3-button">Setting  {this.props.openSideBar}</a>
          
          </div>
            </div>
            <div 
            style={{
              width:'100%',
              display:'flex',
              flexDirection:'column',
            }}
            >
          {
          this.state.activateTab === 1?
          <UserDetails></UserDetails>:<UserSetting></UserSetting>
           }
            </div>
          </div>

      </div>
    </header>
  )
}
}

export default Aside