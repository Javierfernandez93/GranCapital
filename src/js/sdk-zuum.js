class Zuum extends Http
{
	constructor()
	{
		super();
		this.version = 1.0;
		this.page = null;
	}
	getVersion() 
	{
		return this.version;
	}
	loadPage({ssid,load_css}) 
	{
		const options = { ssid,load_css };


		console.log(1)
		this.page = new Page(
			options.load_css
		);

		this.page.load(ssid);
	}
}

class Page extends Http
{
	constructor(load_css)
	{
		super();

		if(load_css) this.loadCss();
	}
	load(ssid)
	{
		console.log(ssid)
		this._load(()=>{
			console.log(ssid)
		},{ssid:ssid});
	}
	loadCss()
	{
		css.load(document,'link','zuum-loader','http://localhost:8888/z/src/css/loader.css');
		css.load(document,'link','zuum-market','http://localhost:8888/z/src/css/market-client.css');
	}
	_load(callback,data)
	{
		return this.call("../../app/application/get_stats_earns.php",data,callback);
	}
}