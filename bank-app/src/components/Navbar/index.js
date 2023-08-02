import { Component } from "react";
import {BsPlus} from 'react-icons/bs'
import React from 'react';
import Popup from 'reactjs-popup';
import './index.css'
import Cookies from "js-cookie";
import SidebarContext from "../../context/SidebarContext";

let closePopup = null

class Navbar extends Component{

    state = {category:'',name:'',transactionType:'credit',amount:'',date:''}

    getName=(event)=>{
        this.setState({name:event.target.value})
    }

    getTranType=(event)=>{
        console.log(event.target.value)
        this.setState({transactionType:event.target.value})
    }

    getCategory=(event)=>{
        this.setState({category:event.target.value})
    }

    getAmount=(event)=>{
        this.setState({amount:event.target.value})
    }

    getDate=event=>{
        this.setState({date:event.target.value})
    }

    onsubminAddTransaction=async(event)=>{
        event.preventDefault()
        const {category,name,transactionType,amount,date} = this.state
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/add-transaction'
        const options = {
            method:"POST",
            body:JSON.stringify({
                "name": `${name}`,
                "type": `${transactionType}`,
                "category": `${category}`,
                "amount": amount,
                "date": `${date}`,
                "user_id": `${Cookies.get("jwt_token")}`
            }),
            headers:{
                "content-type":"application/json",
                "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                "x-hasura-role":"user",
                "x-hasura-user-id":`${Cookies.get("jwt_token")}`
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        closePopup()
        
    }

    render(){
        const {category,name,transactionType,amount,date} = this.state
        return<SidebarContext.Consumer>
            {value=>{
                const {activeTab} = value
                let navHeading = null;
                switch (activeTab){
                    case "DASHBOARD":
                        navHeading="Accounts"
                        break;
                    case 'PROFILE':
                        navHeading="Profile"
                        break;
                    default:
                        navHeading="Transactions"
                }
            return<nav className="home-nav">
            <h1>{navHeading}</h1>
            <Popup
                trigger={<button type="button" className="add-btn"><BsPlus size={20} /> Add Transaction</button>}
                modal
                nested
            >
                {close => {
                    closePopup = close
                    return(
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <h1 className="header">Add Transaction  </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur </p>
                        <form className="Add-tra-form" onSubmit={this.onsubminAddTransaction}>
                            <label htmlFor="Transaction Name">Transaction Name</label>
                            <input className="input-bar" type="text" id="Transaction Name" placeholder="Enter Name" value={name} onChange={this.getName} />
                            <label htmlFor="Transaction Type">Transaction Type</label>
                            <select className="input-bar" id="Transaction" placeholder="Select Transaction Type" value={transactionType} onChange={this.getTranType}>
                                <option id="CREDIT">credit</option>
                                <option id="DEBIT">debit</option>
                            </select>
                            <label htmlFor="category">Category</label>
                            <input className="input-bar" type="text" placeholder="Enter Category" id="category" value={category} onChange={this.getCategory}/>
                            <label htmlFor="amount">Amount</label>
                            <input className="input-bar"  id="amount" type="number" placeholder="Enter your amount" value={amount} onChange={this.getAmount}/>
                            <label htmlFor="date">Date</label>
                            <input className="input-bar" type="date" id="date" placeholder="Enter your date" value={date} onChange={this.getDate}/>
                            <button type="submit" className="add-btn pop-btn">Add Transaction</button>
                        </form>
                    </div>
                
                )}}
            </Popup>    
        </nav>}}</SidebarContext.Consumer>
    }
}
export default Navbar