import { Component } from "react"
import { withRouter} from "react-router-dom/cjs/react-router-dom"
import {AiFillHome} from 'react-icons/ai'
import {RxExit} from 'react-icons/rx'
import {MdCurrencyExchange,MdAccountCircle} from 'react-icons/md'

import './index.css'
import SidebarContext from "../../context/SidebarContext"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Cookies from "js-cookie"

let tabChange;

class  Sidebar extends Component {
    getusertetails= async ()=>{
        return null
    }
    componentDidMount(){
        this.getusertetails()
        tabChange("DASHBOARD")
    }

    logoOut=()=>{
        const {history} = this.props
        console.log(history)
        Cookies.remove("user_details")
        Cookies.remove("jwt_token")
        history.replace("/login/")
    }

    render(){
        const userDetails = JSON.parse(Cookies.get("user_details"))
        return<SidebarContext.Consumer>
            {value=>{
                const {activeTab,onChangeSidebar} = value
                console.log(activeTab)
                tabChange = onChangeSidebar
                const ChangeActiveTab=(event)=>{
                    // console.log(event.target)
                }
            
            return<div className="side-bar">
            <div className="tabs-img-con">
            <img src="https://res.cloudinary.com/dvpfmamki/image/upload/v1690568793/Logo_g0b8vh.png" className="sidebar-logo"/>
                <ul className="tabs-list">
                    <li  onClick={ChangeActiveTab} id="DASHBOARD" ><Link to="/" className={activeTab==="DASHBOARD"?'active-tab':' tabs'} ><AiFillHome size={30} className="tab-icon"/> <p>Dashboard</p></Link></li>
                    <li  onClick={ChangeActiveTab}  id="TRANSATIONS" ><Link to="/transactions/" className={activeTab==="TRANSATIONS"?'active-tab':'tabs'}><MdCurrencyExchange size={30} className="tab-icon" /> <p>Transations</p></Link></li>
                    <li   onClick={ChangeActiveTab} id="PROFILE" ><Link to="/profile/" className={activeTab==="PROFILE"?'active-tab':'tabs'}><MdAccountCircle size={30} className="tab-icon"/><p> Profile</p></Link></li>
                </ul>
            </div>
            
            <button type="button" onClick={this.logoOut} className="logout-btn">
                    <p>{userDetails['email']}</p>
                    <RxExit/>
            </button>
            
        </div>}}</SidebarContext.Consumer>
    }
}
export default withRouter(Sidebar)