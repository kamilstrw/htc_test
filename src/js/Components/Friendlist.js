import React from 'react'

import UsercardMini from "Components/UsercardMini"
import Scroll from "Components/CustomScroll"


export default class Friendlist extends React.Component
{
	constructor()
	{
		super()		
	}
	render()
	{
		return(
		<Scroll>
			<div className="friendlist">
				{
					this.props.friends.map((user, key)=><UsercardMini user={user} key={key}/>)
				}
			</div>
		</Scroll>)
	}
}