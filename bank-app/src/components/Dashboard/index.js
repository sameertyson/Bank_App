import { Component } from "react";
import Sidebar from "../Sidebar";
import './index.css'
import Cookies from "js-cookie";
import axios from "axios";
import {BarChart, Bar,XAxis,YAxis, Legend,CartesianGrid,Tooltip} from "recharts"
  
import {MdOutlineModeEditOutline} from 'react-icons/md'
import {RiDeleteBinLine} from 'react-icons/ri'
import {BiUpArrowCircle,BiDownArrowCircle} from 'react-icons/bi'
import Navbar from "../Navbar";
import TeblerForm from "../TeblerForm";

class Dashboard extends Component{

    state ={creaditsDebis:[],lastTransitions:[],lastSevenDays:[]}

    getCreadits=async()=>{
            const token = Cookies.get('jwt_token')
            const url = 'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals'
            const options = {
                headers:{
                    "content-type":"application/json",
                    'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                    "x-hasura-role":'user',
                    "x-hasura-user-id":`${token}`
                    
                }
            }
            try{
                const response = await axios.get(url,options) 
                const jsonData = await response.data
                const arrCrds = (jsonData.totals_credit_debit_transactions)
                this.setState({creaditsDebis:arrCrds})
            }catch(e){
                console.log(e)
                console.log('none err')
            }
    }

    getLastTransactions=async()=>{
        const token = Cookies.get('jwt_token')
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/all-transactions'
        const options = {
            params:{
                "limit": 3,
                "offset": 0
            },
            headers:{
                "content-type":"application/json",
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                "x-hasura-role":'user',
                "x-hasura-user-id":`${token}`
                
            }
        }
        try{
            const response = await axios.get(url,options)
            const data = await response.data
            this.setState({lastTransitions:data.transactions})
        }catch(e){console.log(e)}
    }

    getLastSevendaysTransactions=async()=>{
        const token = Cookies.get('jwt_token')
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days'
        const options = {
            headers:{
                "content-type":"application/json",
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                "x-hasura-role":'user',
                "x-hasura-user-id":`${token}`
                
            }
        }
        try{
            const response = await axios.get(url,options)
            const data = await response.data
            this.setState({lastSevenDays:data.last_7_days_transactions_credit_debit_totals})
        }catch(e){console.log(e)}
    }

    componentDidMount(){
        this.getCreadits()
        this.getLastTransactions()
        this.getLastSevendaysTransactions()
    }

    render(){
        const {creaditsDebis,lastTransitions,lastSevenDays} = this.state
        const data = lastSevenDays
        console.log("lastTransitions",lastSevenDays)
        const credit = creaditsDebis.filter((item)=>{
            if (item.type==="credit"){
                return item
            }
        })[0]

        const debit = creaditsDebis.filter((item)=>{
            if(item.type === 'debit'){
                return item
            }
        })[0]
        
        return<div className="dashboard-con">
            <Sidebar/>
            <div className="home-nav-body">
                <Navbar/>
                <div className="home-body">
                    <div className="debit-credit-con">
                        <div className="debit-credit-cards credit">
                            <div>
                                <h1>${credit===undefined?"":credit.sum}</h1>
                                <p>Credit</p>
                            </div>
                            <img src="https://res.cloudinary.com/dvpfmamki/image/upload/v1690790761/Group_oxgyvn.png" alt="credit"/>
                        </div>
                        <div className="debit-credit-cards debit">
                            <div>
                                <h1>${debit===undefined?"":debit.sum}</h1>
                                <p>Debit</p>
                            </div>
                            <img src="https://res.cloudinary.com/dvpfmamki/image/upload/v1690790887/Group_1_t7wzqj.png" alt="debit"/>
                        </div>
                    </div>
                    <p className="lst-trs-p">Last Transaction</p>
                    <table className="lst-tr-table">
                        <tbody>
                        {lastTransitions.map(item=><TeblerForm key={item.id} items={item} />)}
                        </tbody>
                    </table>
                    <p className="lst-trs-p">Debit & Credit Overview</p>
                    <div>
                    <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis dataKey="sum" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="type" fill="#8884d8" />
                        <Bar dataKey="pu" fill="#82ca9d" />
                    </BarChart>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default Dashboard