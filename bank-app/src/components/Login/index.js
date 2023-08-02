import { Component } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'

import './index.css'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


class Login extends Component{

    state ={mail:'',pass:''}

    getMail=(event)=>{
        this.setState({mail:event.target.value})
    }

    getPass = (event)=>{
        this.setState({pass:event.target.value})
    
    }
    
    submitLoginForm=async(event)=>{
        event.preventDefault()
        const {history} =this.props
        const {mail,pass}= this.state;
        console.log(mail)
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/get-user-id';

        try{

            const response = await fetch(url,{method:"POST",
        body:JSON.stringify({
            email:mail,
            password:pass
        }),
        headers:{
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF', 
        }})
        const data = await response.json()
        Cookies.set("jwt_token", data.get_user_id[0].id,{expires:30})
        Cookies.set('user_details',JSON.stringify({email:mail,
            password:pass}),{expires:30} )
        history.replace("/")
        //console.log(data)
        }catch(e){
            console.log(e)
        }
        // const options = {
        //     params:{
        //         email:mail,
        //         password:pass
        //     },
        //     headers: {
        //         'content-type': 'application/json',
        //         'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        //     },
        //     }
        // try {
        //     const {history} = this.props
        //     const response = await axios.get(url, options);
        //     const data = (response.data)
        //     Cookies.set("jwt_token", data.get_user_id[0].id,{expires:30})
        //     history.replace("/")
            
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }


    }

    render(){
        const {mail,pass} = this.state
        if (Cookies.get("jwt_token")!==undefined){
            return <Redirect to="/"/>
        }
        return<div className="login-container">
            <form onSubmit={this.submitLoginForm} className="login-form">
                <img src="https://res.cloudinary.com/dvpfmamki/image/upload/v1690568793/Logo_g0b8vh.png" alt="logo" className="login-logo"/>
                <label htmlFor="mail">Mail</label>
                <input onChange={this.getMail} id="mail" type="email" value={mail} className="input-bar" placeholder="Enter email id" />
                <label htmlFor="pass">Password</label>
                <input onChange={this.getPass} id="pass" type="password" value={pass} className="input-bar" placeholder="Enter your password" />
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    }
}
export default Login