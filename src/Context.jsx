import React, { createContext } from 'react';
import { Component } from 'react';
const BatteryContext = createContext();
const OnlineContext = createContext();

// const Leaf = () => {
//     return (<div>
//         <BatteryContext.Consumer>
//             {
//                 n => <OnlineContext.Consumer>
//                     {
//                         o => <h1>aaaa{n} bbbb{o}</h1>
//                     }
//                 </OnlineContext.Consumer>
//             }
//         </BatteryContext.Consumer>
//     </div>)
// }


// const Middle = () => {
//     return (<div>
//         <Leaf></Leaf>
//     </div>)
// }


// export default () => {
//     return (
//         <BatteryContext.Provider value={60}>
//             <OnlineContext.Provider value={20}>
//                 <Middle></Middle>
//             </OnlineContext.Provider>
//         </BatteryContext.Provider>
//     )
// };

// 静态属性context 使用一个context的时候
class Leaf extends Component {
    static contextType = BatteryContext;
    render() {
        console.log(this.context);
        return (<div>
            <h1>bbbb{this.context}</h1>
        </div>)
    }
}


const Middle = () => {
    return (<div>
        <Leaf></Leaf>
    </div>)
}


export default () => {
    return (
        <BatteryContext.Provider value={60}>
            <Middle></Middle>
        </BatteryContext.Provider>
    )
};
