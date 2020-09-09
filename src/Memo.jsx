import React, { Component, PureComponent, memo } from 'react';

//shouldComponentUpdate & PureComponent(只有传入的props的第一级发生变化才更新，第二个坑props传入内联函数，或者band(this)（不提出来）这样每次传入的函数都是最新的，所以每次都会更新父组件)

// class Foo extends PureComponent {
//     // shouldComponentUpdate(nextProps, nextState) {
//     //     if (nextProps.name === this.props.name) {
//     //         return false;
//     //     }
//     //     return true;
//     // }
//     render() {
//         console.log('Foo render');
//         return <div>Foo</div>
//     }
// }
// class MemoMod extends Component {
//     state = {
//         count: 0
//     }
//     render() {
//         return (<div>
//             <button onClick={() => this.setState({ count: this.state.count + 1 })} >add</button>
//             {this.state.count}
//             <Foo name="mike" />
//         </div>)
//     }
// }
const Foo = memo((props) => {
    console.log(props);
    return <div>{props.person.age}</div>
})

class MemoMod extends Component {
    state = {
        preson: {
            age: 1
        }
    }
    render() {
        return (<div>
            <Foo person={this.state.preson}></Foo>
        </div>)
    }
}
export default MemoMod
