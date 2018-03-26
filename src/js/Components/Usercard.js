import React from 'react'

import LocalStorage from "Core/LocalStorage"

import Modal from "Components/Modal"
import Scroll from "Components/CustomScroll"

import Avatar from "Images/main.jpg"

export default class UserCard extends React.Component
{
	constructor()
	{
		super();
		this.Storage = new LocalStorage();
		this.state = 
		{
			name: this.Storage.get("name") || "Виталя Гора",
			phone: this.Storage.get("phone") || "+7 (440) 554-32-12",
			email: this.Storage.get("email") || "vitalya@gora.ru",
			interests: this.Storage.get("interests") ? this.Storage.get("interests").split(",") : ["музыка", "компьютеры", "радио"],
			isFriend: false
		}
		this.addToFriends = this.addToFriends.bind(this);
		this.callNameModal = this.callModal.bind(this, "nameModal");
		this.handleNameChange = this.handleChange.bind(this, "name");
		this.callPhoneModal = this.callModal.bind(this, "phoneModal");
		this.handlePhoneChange = this.handleChange.bind(this, "phone");
		this.callEmailModal = this.callModal.bind(this, "emailModal");
		this.handleEmailChange = this.handleChange.bind(this, "email");
		this.callInterestsModal = this.callModal.bind(this, "interestModal");
		this.createInterest = this.createInterest.bind(this);
		this.deleteInterest = this.deleteInterest.bind(this);
	}
	addToFriends()
	{
		alert(this.state.isFriend ? "Вы удалилили пользователя из друзей" : "Вы добавили этого пользователя в друзья");
		this.setState({isFriend: !this.state.isFriend})
	}
	callModal(name)
	{
		this[name].showModal();
	}
	handleChange(name, value)
	{
		this.Storage.set(name, value);
		this.setState({[name]: value})
	}
	createInterest(value)
	{
		let array = [value, ...this.state.interests]
		this.setState({interests: array})
		this.Storage.set("interests", array)
	}
	deleteInterest(index)
	{
		let array = this.state.interests;
		array.splice(index, 1);
		this.setState({interests: array})
		this.Storage.set("interests", array)
	}

	render()
	{
		return(
		<div className="usercard">
			<div className="usercard__avatar">
				<img src={Avatar}/>
			</div>
			<div className="usercard__username">
				<h3 onClick={this.callNameModal}>{this.state.name}</h3>
				<small>г. Ижевск</small>
			</div>
			<table className="usercard__userdata" cellSpacing="8"> 
				<tbody>				
					<tr>
						<td><strong>Семейное положение</strong></td>
						<td>Холост</td>
					</tr>
					<tr>
						<td><strong>Телефон</strong></td>
						<td style={{cursor: "pointer"}} onClick={this.callPhoneModal}>{this.state.phone}</td>
					</tr>
					<tr>
						<td><strong>E-mail</strong></td>
						<td style={{cursor: "pointer"}} onClick={this.callEmailModal}>{this.state.email}</td>
					</tr>
				</tbody>
			</table>
			<div className="usercard__addToFriends">
				<a 
					className="usercard__addToFriends__button"
					onClick = {this.addToFriends}
				>
					{this.state.isFriend ? "Удалить из друзей" : "Добавить в друзья"}
				</a>
			</div>
			<div className="usercard__interests">
				<div className="usercard__interests__title">
					<strong>Интересы</strong>
					{this.state.interests.length < 5 ? (<a className="usercard__interests__js-add" title="Добавить новый интерес" onClick={this.callInterestsModal}>+</a>) : ''}
				</div>
				<div className="usercard__interests__list">
					{this.state.interests.map(
						(item, key)=>
							<div 
								className="usercard__interests__list__item"
								title="Удалить из списка интересов"
								key={key}
								onClick={(e)=>this.deleteInterest(key)}
							>
							 	{item}
							</div>
					)}
				</div>
			</div>
			<Modal 
				ref={(modal)=>{this.nameModal = modal}}
				title="Введите новое имя"
				type="text"
				value={this.state.name}
				onSuccess={this.handleNameChange}
			/>
			<Modal 
				ref={(modal)=>{this.phoneModal = modal}}
				title="Введите номер телефона" 
				type="tel"
				value={this.state.phone}
				onSuccess={this.handlePhoneChange}
			/>
			<Modal 
				ref={(modal)=>{this.emailModal = modal}}
				title="Введите e-mail"
				type="email"
				value={this.state.email}
				onSuccess={this.handleEmailChange}
			/>
			<Modal 
				ref={(modal)=>{this.interestModal = modal}}
				type="text"
				title="Введите название интереса"
				onSuccess={this.createInterest}
			/>
		</div>
		)
	}
}