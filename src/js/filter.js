class Filter {
	constructor(items)
	{
		this.fields = false;
		if(items != undefined)
		{
			this.items = items;
		}
	}
	filter(callback,word,items,fields)
	{
		if(items != undefined)
		{
			this.items = items;
		}

		if(fields)
		{
			this.fields = fields;
		} else  {
			this.fields = (Object.keys(items[0]));
		}

		let data = items.filter((item)=>{
			let found = false;
			this.fields.forEach((field)=>{
				if(typeof item[field] == 'string')
				{
					if(item[field].toLowerCase().indexOf(word.toLowerCase()) >= 0)
					{
						found = true;
					}
				} else if(typeof item[field] == 'number') {
					if(item[field] == word)
					{
						found = true;
					}
				}
			});

			return found;
		});

		this.showMessage(data,word);
		
		callback(data);
	}
	clearFilterMessage()
	{
		$('.message').html('');
	}
	showMessage(data,word)
	{
		if(word)
		{
			if(data.length)
			{
				$('.message').html('Resultados para <b>'+word+'</b>.');
			} else {
				$('.message').html('No hubo resultados para <b>'+word+'</b>.');
			}
		} else {
			this.clearFilterMessage();
		}
	}
}