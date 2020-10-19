import React from "react"
import Header from "./Header";
import Footer from './Footer';
import Aside from "./Aside";
class TodoContainer extends React.Component {
  state = {
    openSideBar:true
  }
  handleChange = () => {
    this.setState({
      openSideBar : !this.state.openSideBar
    })
  }

    render() {
        return (         
          <div>
            <Header handleChangeProps={this.handleChange}/>
            <Aside handleChangeProps={this.handleChange} openSideBar={this.state.openSideBar}></Aside>
            <Footer></Footer>
        </div>
        );
  }
}
export default TodoContainer