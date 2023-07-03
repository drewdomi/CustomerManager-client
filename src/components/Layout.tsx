import SideBar from "./Drawer";

type PropsTypes = {
  children: JSX.Element
}

function Layout({children}: PropsTypes){
  return(
    <SideBar>
    {children}
    </SideBar>
  )
}

export default Layout