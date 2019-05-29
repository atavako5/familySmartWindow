import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main"

class App extends React.Component {

    renderContent() {
        return <Main />
    }



    render() {
        return <div>{this.renderContent()}</div>;
      }
}

ReactDOM.render(<App />, document.querySelector("#root"));