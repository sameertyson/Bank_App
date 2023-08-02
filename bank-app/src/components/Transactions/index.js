import { Component } from "react";
import Sidebar from "../Sidebar";
import SidebarContext from "../../context/SidebarContext";
import Navbar from "../Navbar";
import './index.css'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import {RiDeleteBinLine} from 'react-icons/ri'
import {BiUpArrowCircle,BiDownArrowCircle} from 'react-icons/bi'
import Cookies from "js-cookie";
import TeblerForm from "../TeblerForm";
import { BallTriangle } from  'react-loader-spinner'
let changeTab=null;
class Transaction extends Component{
    state = {TRtype:"all",TransactionList:[],ProfileDetailsState:"Inprogress"}

    allTR=(event)=>{
        this.setState({TRtype:event.target.id})
    }

    TRdebit=(event)=>{
        this.setState({TRtype:event.target.id})
    }

    TRcredit=(event)=>{
        this.setState({TRtype:event.target.id})
    }

    getTransactions=async()=>{
        const token = Cookies.get('jwt_token')
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0'
        const options = {
            methode:"GET",
            headers:{
                "content-type":"application/json",
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                "x-hasura-role":'user',
                "x-hasura-user-id":`${token}`
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        console.log(data)
        this.setState({TransactionList:data.transactions,ProfileDetailsState:"Progress"})
    }

    componentDidMount(){
        changeTab('TRANSATIONS')
        this.getTransactions()
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
        const {TRtype,TransactionList} = this.state
            let filterList = []
            switch (TRtype){
                case 'all':
                    filterList = TransactionList
                    break;
                case "debit":
                    filterList = TransactionList.filter(item=>{
                        if(item.type==="debit"){
                            return item
                        }
                    })
                    break;
                case 'credit':
                    filterList = TransactionList.filter(item=>{
                        if(item.type==='credit'){
                            return item
                        }
                    })
                    break
            }
            
        return<table class="table">
    <thead >
        <tr className="table-head">
        <th scope="col">Transaction Name</th>
        <th scope="col">Category</th>
        <th scope="col">Date</th>
        <th scope="col">Amount</th>
        <th scope="col">  </th>
        <th scope="col">  </th>
        </tr>
    </thead>
    <tbody>
        {filterList.map(item=><TeblerForm key={item.id} items={item}/>)}
    </tbody>
    </table>}
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

    GetTableRows=(item)=>{
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        const d = new Date(item.date)
                        const h = d.getHours()>12?d.getHours()-12:d.getHours()
                        const noons = d.getMinutes()+d.getHours()>12?"PM":"AM"
                        const newDate =d.getDate()+" "+months[d.getMonth()]+", "+String(h)+"."+d.getMinutes()+noons
                        return<tr id={item.id}>
                        <td><div className="tr-nam-td">{item.type==="credit"?<BiUpArrowCircle size={30} color="green"/>:<BiDownArrowCircle size={30} color="Red"/>}<p className="tr-name">{item.transaction_name}</p></div></td>
                        <td>{item.category}</td>
                        <td>{newDate}</td>
                        <td className={item.type==="credit"?"credit":'debit'}>{item.type==="credit"?"+$"+item.amount:"-$"+item.amount}</td>
                        <td><button className="tool-btn"><MdOutlineModeEditOutline color="blue" size={30}/></button></td>
                        <td><button className="tool-btn"><RiDeleteBinLine color="red" size={30}/></button></td>
                        </tr>
    }

    render(){
        return<SidebarContext.Consumer>{value=>{
            const {onChangeSidebar} = value
            changeTab=onChangeSidebar
            const {TRtype,TransactionList} = this.state
            let filterList = []
            switch (TRtype){
                case 'all':
                    filterList = TransactionList
                    break;
                case "debit":
                    filterList = TransactionList.filter(item=>{
                        if(item.type==="debit"){
                            return item
                        }
                    })
                    break;
                case 'credit':
                    filterList = TransactionList.filter(item=>{
                        if(item.type==='credit'){
                            return item
                        }
                    })
                    break
            }
            //onChangeSidebar("TRANSATIONS")
        return<div className="dashboard-con">
            <Sidebar/>
            <div className="home-nav-body">
                <div className="Nav-Tr-tab-con">
                    <Navbar/>
                    <nav className="Tr-Nav-Tab-con">
                        <ul className="Tr-nav-ul-con">
                            <li className="Tr-Tab-itrm"><button className={TRtype==="all"?"active-tr-btn":"tr-tb-btn"} onClick={this.allTR} id="all">All Transactions</button></li>
                            <li className="Tr-Tab-itrm"><button className={TRtype==="debit"?"active-tr-btn":"tr-tb-btn"} onClick={this.TRdebit} id="debit">Debit</button></li>
                            <li className="Tr-Tab-itrm"><button className={TRtype==="credit"?"active-tr-btn":"tr-tb-btn"} onClick={this.TRcredit} id="credit">Credit</button></li>
                        </ul>
                    </nav>
                </div >
                <div className="home-body">
                {
                    this.getViews()
                }
                </div>
                
            </div>
        </div>}}</SidebarContext.Consumer>
    }
}
export default Transaction