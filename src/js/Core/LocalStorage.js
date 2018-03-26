export default class LocalStorage{
	constructor()
	{
		if ( !this.isSupport() )
		{
			alert("Local storage не поддерживается в этом браузере")
		}
		else
		{
			this.db = window['localStorage'];
		}	
	}
	get(name){
		try
		{
			let data = this.db.getItem(name);
			return ( data != null ) ? data : false;
		}
		catch(err)
		{
			console.log(err)
			return false;
		}
	}
	set(name, value)
	{
		this.db.setItem(name, value);
		return this.get(name);
	}
	isSupport()
	{
		try
		{
			return 'localStorage' in window && window['localStorage'] !== null;
		}
		catch(err)
		{
			return false;
		}
	}
}
