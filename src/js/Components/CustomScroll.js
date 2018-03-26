import React from 'react'
import ReactDOM from 'react-dom'

export default class CustomScroll extends React.Component
{
	constructor()
	{
		super();
		this.state = 
		{
			showScroll: true
		}
		this.scrollbarStyle = this.scrollbarStyle.bind(this);
		this.getScrollHeight = this.getScrollHeight.bind(this);
		this.moveScroll = this.moveScroll.bind(this);
		this.onWheel =  this.onWheel.bind(this);
		this.getChildNode = this.getChildNode.bind(this);
	}
	componentDidMount()
	{
		if (this.getChildNode().clientHeight < this.getChildNode().scrollHeight)
		{
			this.scrollbarStyle("height", this.getScrollHeight());
			this.getChildNode().addEventListener("scroll", this.moveScroll)
			this.refs.scroll.addEventListener("wheel", this.onWheel);
			this.refs.handle.addEventListener("drag", this.onDrag)
		}
		else
		{
			this.setState({showScroll: false})
		}
	}
	getChildNode()
	{
		return this.refs.content.childNodes[0]
	}
	scrollbarStyle(property, value)
	{
		let handle = ReactDOM.findDOMNode(this.refs.handle);
		handle.style[property] = value;
	}
	moveScroll(event)
	{
		//передвижение полоски скрола
		let value = event.target.scrollTop;
		let childHeight = this.getChildNode().scrollHeight;
		let moveTo = value / childHeight * 100 + "%";
		this.scrollbarStyle("top", moveTo);
	}
	getScrollHeight()
	{
		//вычисление высоты полоски скрола
		let childHeight = this.getChildNode().scrollHeight;
		return (this.refs.content.clientHeight / childHeight) * 100 + "%"
	}
	onWheel(event)
	{
		let node = this.getChildNode();
		node.scrollTop += event.deltaY;
		let procent = node.scrollTop / node.scrollHeight * 100 + "%"
		this.scrollbarStyle("top", procent)
	}
	render()
	{
		return(
			<div className="scroll-custom">
				{this.state.showScroll ? 
				(<div ref="scroll" className="scroll-custom__bar">
					<div ref="handle" draggable className="scroll-custom__bar__handle">
					</div>
				</div>) : ""}
				<div ref="content" className="scroll-custom__content">
					{this.props.children}
				</div>
			</div>
		)
	}
}