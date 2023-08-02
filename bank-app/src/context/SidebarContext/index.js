import React from "react";
const SidebarContext = React.createContext({
    activeTab:'',
    onChangeSidebar:()=>{}
})

export default SidebarContext