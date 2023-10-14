import {Component} from "react";
import "./Calculator.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faTimes, faPlus, faMinus, faBackspace } from '@fortawesome/free-solid-svg-icons';

class Calculator extends Component
{
    constructor()
    {
        super();
        this.state = {
            displayValue: '',
            previousValue: '',
            operator: '',
        };
    }

    appendToDisplay = (value) => {
        const { displayValue } = this.state;
        const displayString = displayValue.toString(); // Convert displayValue to a string

        // Handle negative numbers
        if (
            value === '-' &&
            (displayString === '' || '/*+'.includes(displayString.slice(-1)))
        ) {
            this.setState({
            displayValue: displayString + value,
            });
        }

        // Check for consecutive operators or if the displayValue is empty
        if (
            ('/*-+'.includes(value) && ('/*-+'.includes(displayString.slice(-1)))) ||
            (displayString === '' && '/*+'.includes(value))
        ) {
            return; // Do nothing if it's an invalid input
        }

        else {
            this.setState((prevState) => ({
            displayValue: displayString + value,
            }));
        }
    };

    backspace = () => {
        const { displayValue } = this.state;

        // Check if the displayValue is a number (result of a calculation)
        if (typeof displayValue === 'number') {
            this.setState({
            displayValue: displayValue.toString().slice(0, -1),
            });
        } 
        else if (displayValue.length > 0) {
            this.setState((prevState) => ({
            displayValue: prevState.displayValue.slice(0, -1),
            }));
        }
    };

    calculate = () => {
        this.setState((prevState) => ({
            previousValue: prevState.displayValue,
            displayValue: eval(prevState.displayValue),
        }));
    };

    render()
    {
        return (
            <div className="calculator">
                <input 
                    type="text"
                    id="display"
                    value={this.state.displayValue}
                    readOnly
                />
                <div className="buttons">
                    
                    <div className="Numbers">
                        <button onClick={() => this.appendToDisplay('7')}>7</button>
                        <button onClick={() => this.appendToDisplay('8')}>8</button>
                        <button onClick={() => this.appendToDisplay('9')}>9</button>
                        <button onClick={() => this.appendToDisplay('4')}>4</button>
                        <button onClick={() => this.appendToDisplay('5')}>5</button>
                        <button onClick={() => this.appendToDisplay('6')}>6</button>
                        <button onClick={() => this.appendToDisplay('1')}>1</button>
                        <button onClick={() => this.appendToDisplay('2')}>2</button>
                        <button onClick={() => this.appendToDisplay('3')}>3</button>
                        <button onClick={() => this.appendToDisplay('0')} id="button-bottom-left">0</button>
                        <button onClick={() => this.appendToDisplay('.')}>.</button>
                        <button onClick={() => this.calculate()}>=</button>
                    </div>

                    <div className="Operators">
    <button onClick={() => this.backspace()}>
        <FontAwesomeIcon icon={faBackspace} className="blue-icon" />
    </button>
    <button onClick={() => this.appendToDisplay('/')}>
        <FontAwesomeIcon icon={faDivide} className="blue-icon" />
    </button>
    <button onClick={() => this.appendToDisplay('*')}>
        <FontAwesomeIcon icon={faTimes} className="blue-icon" />
    </button>
    <button onClick={() => this.appendToDisplay('-')}>
        <FontAwesomeIcon icon={faMinus} className="blue-icon" />
    </button>
    <button onClick={() => this.appendToDisplay('+')} id="button-bottom-right">
        <FontAwesomeIcon icon={faPlus} className="blue-icon" />
    </button>
</div>
                    
                </div>
            </div>
        )
    }
}

export default Calculator;