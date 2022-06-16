class Searchable
{
	constructor()
	{
		this.data = null;
	}
	resetData()
	{
		this.getData().map((key,card)=>{
			$(card).addClass("d-none");
		});
	}
	setData(data)
	{
		this.data = data;
	}
	getData()
	{
		return this.data;
	}
	filterData(query)
	{
		this.resetData();

		this.getData().filter((key,element)=>{
			let searchable = $(element).find("[data-searchable='true']").text().toLowerCase();
			
			return searchable.search(query) !== -1;
		}).removeClass("d-none");
	}
}