import {MdOutlineModeEditOutline} from 'react-icons/md'
import {RiDeleteBinLine} from 'react-icons/ri'
import {BiUpArrowCircle,BiDownArrowCircle} from 'react-icons/bi'
import Popup from 'reactjs-popup';
import { Component } from 'react';
import Cookies from 'js-cookie';
import './index.css'

let closePopup;
let dltPopup

class TeblerForm extends Component{
    constructor(props){
        super(props)
        const {items} = this.props
        this.state = {category:items.category,name:items.transaction_name,transactionType:items.type,amount:items.amount,date:items.date}

    }

    getName=(event)=>{
        this.setState({name:event.target.value})
    }
    getCloseDltpop=()=>{
        dltPopup()
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
        const {items} = this.props
        event.preventDefault()
        const {category,name,transactionType,amount,date} = this.state
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/update-transaction'
        const options = {
            method:"POST",
            body:JSON.stringify({
                "name": `${name}`,
                "type": `${transactionType}`,
                "category": `${category}`,
                "amount": amount,
                "date": `${date}`,
                "id": `${items.id}`
            }),
            headers:{
                "content-type":"application/json",
                "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                "x-hasura-role":"user",
                "x-hasura-user-id":`${Cookies.get("jwt_token")}`
            }
        }
        try{const response = await fetch(url,options)
        const data = await response.json()
        console.log(data)
        closePopup()}
        catch(e){
            console.log(e)
        }
        
    }


    deleteTransaction=async()=>{
        const {items} = this.props
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/delete-transaction'
        const options = {
            method:"DELETE",
            body:JSON.stringify({id:items.id}),
            headers:{
                "content-type":"application/json",
                "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                "x-hasura-role":"user",
                "x-hasura-user-id":`${Cookies.get("jwt_token")}`
            }

        }
        const response = await fetch(url,options)
        const data = await response.json()
        console.log(data)
        dltPopup()

    }


    render(){
    const {items} = this.props
    const item = items

    const {category,name,transactionType,amount,date} = this.state
    const editTransaction =()=>{

    }

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
            <td>
            <Popup
                trigger={<button className="tool-btn" onClick={editTransaction}><MdOutlineModeEditOutline color="blue" size={30}/></button>}
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
                    <h1 className="header">Update Transaction </h1>
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
            </td>
            <td>
            

            <Popup
                trigger={<button className="tool-btn"><RiDeleteBinLine color="red" size={30}/></button>}
                modal
                nested
            >
                {close => {
                    dltPopup = close
                    return(
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className='dlt-popup-btn'>
                        <img src='https://res.cloudinary.com/dvpfmamki/image/upload/v1690910259/Group_848_hloodh.png' alt='danger'/>
                        <div className='dlt-popup-body-text'>
                            <h1>Are you sure you want to Delete?</h1>
                            <p>This transaction will be deleted immediately. You can’t undo this action.</p>
                            <div>
                                <button onClick={this.deleteTransaction}  className='Yess-dlt'>Yes, Delete</button>
                                <button onClick={this.getCloseDltpop} className='no-dlt'>No, Leave it</button>
                            </div>
                        </div>
                    </div>
                    </div>
                
                )}}
            </Popup> 
            </td>



        </tr>}
}
export default TeblerForm