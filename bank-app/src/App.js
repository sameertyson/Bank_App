import {BrowserRouter} from 'react-router-dom'
import { Switch,Route } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import ProctedRout from './ProtectedRout';
import Dashboard from './components/Dashboard';
import { Component } from 'react';
import SidebarContext from './context/SidebarContext';
import Transaction from './components/Transactions';
import Profile from './components/Profile';
class App extends Component {
  state = {activeTab:""}
  onChangeSidebar=(id)=>{
    this.setState({activeTab:id})
  }
  render(){
    const {activeTab} = this.state
    return<SidebarContext.Provider value={{activeTab,onChangeSidebar:this.onChangeSidebar}} ><BrowserRouter>
    <Switch>
      <Route exact path="/Bank_App/login" component={Login}/>
      <ProctedRout exact path="/Bank_App" component={Dashboard}/>
      <ProctedRout exact path="/Bank_App/transactions/" component={Transaction}/>
      <ProctedRout exact path="/Bank_App/profile/" component={Profile}/>
    </Switch> 
  </BrowserRouter></SidebarContext.Provider> }
}

export default App;
