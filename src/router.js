import user from "./views/user"
import goods from "./views/goods"
const routers = [
    {
        path: '/',
        name: "user",
        component: user
    },
    {
        path: '/user',
        name: "user",
        component: user
    },
    {
        path: '/goods',
        name: "goods",
        component: goods
    }
];
export default routers;