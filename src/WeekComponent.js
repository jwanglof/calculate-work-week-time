import React, {Component} from 'react';
const nanoid = require('nanoid');

class WeekComponent extends Component {
    inputName = nanoid();

    constructor() {
        super();
        this.state = {
            [this.inputName]: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = this.inputName;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleButtonClick() {
        this.props.actionOnChange(this.inputName, this.state[this.inputName]);

        this.setState({
            [this.inputName]: 0
        })
    }

    render() {
        return (
            <div>
                <input type="text" name={this.inputName} value={this.state[this.inputName]} onChange={this.handleInputChange}/>
                <button type="button" onClick={this.handleButtonClick}>Add</button>
            </div>
        )
    }
}

export default WeekComponent;