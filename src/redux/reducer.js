import { SHOW_EVENT } from "./action";

const initialState={
    show_event:false
}
function reducer(state=initialState,action)
{
    switch(action.type)
    {
        case SHOW_EVENT:
            return{
                show_event:!state.show_event
            };
            default:
                return state;
    }


}
export default reducer;