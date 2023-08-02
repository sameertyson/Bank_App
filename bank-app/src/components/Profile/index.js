import { Component } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import SidebarContext from "../../context/SidebarContext";
import Cookies from "js-cookie";
import './index.css'
import { BallTriangle } from  'react-loader-spinner'

let changeTab=null;
class Profile extends Component{

    state = {user:{},ProfileDetailsState:"Inprogress"}

    getProfileDetails=async()=>{
        const token = Cookies.get("jwt_token")
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/profile'
        const option = {
            method:"GET",
            headers:{
                "content-type":"application/json",
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                "x-hasura-role":'user',
                "x-hasura-user-id":`${token}`
            }
        }
        const response = await fetch(url,option)
        const data = await response.json()
        console.log(data)
        this.setState({user:data.users[0],ProfileDetailsState:"Progress"})
    }

    componentDidMount(){
        changeTab("PROFILE")
        this.getProfileDetails()
    }

    LoaderView = ()=><div className="loder-con"><BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      /></div>
    


    ProgressView=()=>{
        const {user} = this.state
        console.log(user)
        console.log("Yes")
        const pic = user.name
        return(
            <div className="dp-details">
                    <h1 className="p-pic"> {pic}</h1>
                    <div className="details-dtls-con">
                        <div className="details-car">
                            <label>Name</label>
                            <input type="text" value={user.name} className="bars"/>
                            <label>Email</label>
                            <input type="email" value={user.email} className="bars"/>
                            <label>Date Of Birth</label>
                            <input type="text" value={user.date_of_birth} className="bars"/>
                            <label>Permanent Address</label>
                            <input type="text" value={user.permanent_address} className="bars"/>
                            <label>Postal Code</label>
                            <input type="number" value={user.postal_code} className="bars"/>
                        </div>
                        <div className="details-car">
                            <label>User Name</label>
                            <input type="text" value={user.user_name} className="bars"/>
                            <label>Password</label>
                            <input type="password" value={JSON.parse(Cookies.get("user_details")).password} className="bars"/>
                            <label>Present Address</label>
                            <input type="text" value={user.permanent_address} className="bars"/>
                            <label>City</label>
                            <input type="text" value={user.city} className="bars"/>
                            <label>Country</label>
                            <input type="number" value={user.country} className="bars"/>
                        </div>
                </div>
            </div>)
    }

    getViews=()=>{
        const {ProfileDetailsState} = this.state
        console.log(ProfileDetailsState)
        switch(ProfileDetailsState){
            case "Inprogress":
                return this.LoaderView()
                
            case "Progress":
                return this.ProgressView()

        }
    }


    render(){
        const {user,ProfileDetailsState} = this.state
        console.log(user)
        const pic = user.name
        return<SidebarContext.Consumer>{
            value=>{
                const {onChangeSidebar} = value
                changeTab = onChangeSidebar
                return<div className="dashboard-con">
                    <Sidebar/>
                    <div className="home-nav-body">
                        <Navbar/>
                        <div className="home-body">
                         {
                            this.getViews()
                         }   
                        </div>
                    </div>
                </div>
            }
            }</SidebarContext.Consumer>
    }
}
export default Profile