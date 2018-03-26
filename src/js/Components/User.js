import React from 'react'

import Usercard from "Components/Usercard"
import Friendlist from "Components/Friendlist"

import avatar1 from "Images/1.jpg"
import avatar2 from "Images/2.jpg"
import avatar3 from "Images/3.jpg"
import avatar4 from "Images/4.jpg"
import avatar5 from "Images/5.jpg"
import avatar6 from "Images/6.jpg"
import avatar7 from "Images/7.jpg"
import avatar8 from "Images/8.jpg"
import avatar9 from "Images/9.jpg"



export default class User extends React.Component
{
	constructor()
	{
	 	super()
	 	this.state = 
	 	{
	 		currentTab: "user",
	 		friends: this.generateUsers(20)
	 	}
	 	this.switchTab = this.switchTab.bind(this);
	 	this.getTabContent = this.getTabContent.bind(this);
	 	this.getRandomNumber = this.getRandomNumber.bind(this);
		this.generateUsers = this.generateUsers.bind(this);
		this.generateName = this.generateName.bind(this);
		this.getRandomCity = this.getRandomCity.bind(this);
		this.getRandomAvatar = this.getRandomAvatar.bind(this);
	}
	switchTab(tabName)
	{	
		this.setState({currentTab: tabName})
	}
	getTabContent()
	{
		switch (this.state.currentTab)
		{
			case "user":
				return <Usercard/>
				break;
			case "friendlist":
				return (<Friendlist friends={this.state.friends}/>)
				break;
			default:
				return <Usercard/>
		}
	}

	generateUsers(count)
	{
		
		let users = []
		for (let i=0; i<count; i++)
		{
			let user = 	{
				name: this.generateName(),
				city: this.getRandomCity(),
				avatar: this.getRandomAvatar(),
				online: !!this.getRandomNumber(0, 2)
			}
			users.push(user)
		}		
		return users;
	}

	getRandomNumber(min, max)
	{
		return Math.floor(Math.random() * (max - min)) + min;
	}

	generateName()
	{
		let names = ["Иван", "Владимир", "Олег", "Антон", "Игорь", "Василий", "Станислав", "Михаил", "Богдан", "Алексей", "Юрий"];
		let lastnames = ["Ленин", "Троцкий", "Сталин", "Хрущев", "Брежнев", "Горбачев", "Ельцин", "Путин", "Медведев", "Гагарин", "Леонов", "Комаров", "Титов", "Попович", "Беляев"];
		return names[this.getRandomNumber(0, names.length)] + ' ' + lastnames[this.getRandomNumber(0, lastnames.length)]
	}

	getRandomCity()
	{
		let cities = ["Москва", "Санкт-Петербург", "Владимир", "Екатеринбург", "Краснодар", "Сочи", "Владивосток", "Ижевск", "Ростов-на-Дону"];
		return cities[this.getRandomNumber(0, cities.length)];
	}

	getRandomAvatar()
	{
		let userAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];
		return userAvatars[this.getRandomNumber(0, userAvatars.length)];
	}
	
	render()
	{

		return(
			<div className="User">
				<div className="User__tabscontrol">
					<a 
						className={`tabbutton ${this.state.currentTab == "user" ? "tab-active" : ""}`}
					   	onClick={(e)=>this.switchTab('user')}
					>
					   Профиль
					</a>
					<a 
						className={`tabbutton ${this.state.currentTab == "friendlist" ? "tab-active" : ""}`}
						onClick={(e)=>this.switchTab('friendlist')}
					>
						Друзья пользователя
					</a>
				</div>
				<div className="User__tab">
					{this.getTabContent()}
				</div> 
			</div>
		)
	}
}