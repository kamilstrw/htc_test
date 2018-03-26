import React from "react"


export default class UsercardMini extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = props.user
	}
	render()
	{
		return(
			<div className="usercardMini">
				<div className="usercardMini__avatar">
					<img src={this.state.avatar}/>
				</div>
				<div className="usercardMini__username">
					<strong title={this.state.name}>{this.state.name}</strong>
					<small>г. {this.state.city}</small>
				</div>
				<div className="usercardMini__status">
					{this.state.online ? (<small>Online</small>) : ''}
				</div>
			</div>
		)
	}
}