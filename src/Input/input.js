import React from 'react';
import './input.css';
const input = (props) => {
    let inputElement = null;
    const inputClasses =[];
    if(props.touched){
        inputClasses.push('active')
    }
    if(props.invalid && props.touched) {
        inputClasses.push('invalid')
    }
    switch (props.elementType) {
        case 'Input':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case 'Select':
            inputElement = <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            break;
        default:
            inputElement = <input
                className={inputClasses}
                onChange={props.changed}
            />
    }

    return (
        <div>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;