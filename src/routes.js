
import Landing from './components/pages/Landing'
import App from './App'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import About from './components/pages/About'
import Logout from './components/auth/Logout'



const routes = [
    {path:'/', name:'home', component:Landing,},
    {path:'/todos', name:'todos', component:App, meta:{requiresAuth:true}},
    {path: '/login', name:'login',component:Login, meta:{requiresVisitor:true} },
    {path: '/register', name:'register', component:Register,meta:{requiresVisitor:true} },
    {path: '/about', name:'about', component:About},
    {path: '/logout', name:'logout', component:Logout}
      ]

    

export default routes