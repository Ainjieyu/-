export default{
    state:{
        isCollapse: false
    },
    mutations:{
        collaspeMenu(state){
            state.isCollapse = !state.isCollapse
        }
    }
}