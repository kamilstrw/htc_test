import React from 'react'
import ReactDOM from "react-dom";

const RegEx = 
{
	text: /^([а-яА-Я]{1,}\s?){1,}$/i,
	tel: /^((\+7|7|8)+([0-9]){10})$/,
	email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
}

export default class Modal extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = 
		{
			active: false,
			input: props.value || '',
			disabled: false
		}
		this.dismissModal = this.dismissModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.confirmChanges = this.confirmChanges.bind(this);
		this.validateInput = this.validateInput.bind(this);
	}
	componentWillMount()
	{
		if (!this.props.type)
		{
			console.error("Modal missing 'type' prop")
		}
		if (!this.props.onSuccess)
		{
			console.error("Modal missing 'onSuccess' prop")
		}
	}
	showModal()
	{
		this.setState({active: true, input: this.props.value || ''})
	}
	dismissModal()
	{
		this.setState({active: false})
	}
	handleChange(event)
	{
		this.setState({input: event.target.value})
		if (!this.validateInput(event.target.value))
		{
			ReactDOM.findDOMNode(this.refs.input).style.outlineColor = "red";
			this.setState({disabled: true})
		}
		else
		{
			ReactDOM.findDOMNode(this.refs.input).style.outlineColor = "#196fae";
			this.setState({disabled: false})
		}
	}
	validateInput(value)
	{
		return RegEx[this.props.type].test(value)			
	}
	confirmChanges()
	{
		try{
			this.props.onSuccess(this.state.input);
			this.dismissModal();
		}
		catch(err)
		{
			console.error("Missing Modal onSuccess prop or not a function")
		}
	}
	render()
	{
		return(
			<div className={`modal ${this.state.active ? "active" : ''}`}>
				<div className="modal__content">
				 	<h4>{this.props.title}</h4>
					<input type={this.props.type} value={this.state.input} onChange={this.handleChange} ref="input"/>
					<div className="modal__content__controls">
						<a className={`button ${this.state.disabled ? "disabled" : ''}`} onClick={this.confirmChanges}>Потвердить</a>
						<a className="button" onClick={this.dismissModal}>Отменить</a>
					</div>
				</div>
			</div>
		)
	}
}
