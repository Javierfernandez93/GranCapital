/* constants */
const CLIENT = 1;
const REFERENCE = 2;

const MALE = 'male';
const FEMALE = 'female';

class DataAdmin 
{
	constructor()
	{
		this.user_support_id = null;
		this.names = null;
		this.last_name = null;
		this.sur_name = null;
		this.gender = null;
		this.email = null;
		this.password = null;
		this.cellular = null;
		
		this.address = null;
		this.city = null;
		this.zip_code = null;
		this.colony = null;
		this.state = null;
		this.country_id = 159; // default MX

		this.setGender(MALE);
	}
	getNames()
	{
		return this.names;
	}
	getUserSupportId()
	{
		return this.user_support_id;
	}
	getLastName()
	{
		return this.last_name;
	}
	getSurName()
	{
		return this.sur_name;
	}
	getAddress()
	{
		return this.address;
	}
	getCity()
	{
		return this.city;
	}
	getGender()
	{
		return this.gender;
	}
	getPhone()
	{
		return this.phone;
	}
	getCellular()
	{
		return this.cellular;
	}
	getEmail()
	{
		return this.email;
	}
	getZipCode()
	{
		return this.zip_code;
	}
	getColony()
	{
		return this.colony;
	}
	getState()
	{
		return this.state;
	}
	getCountryId()
	{
		return this.country_id;
	}
	getPassword()
	{
		return this.password;
	}
	setNames(names)
	{
		this.names = names;
	}
	setLastName(last_name)
	{
		this.last_name = last_name;
	}
	setSurName(sur_name)
	{
		this.sur_name = sur_name;
	}
	setAddress(address)
	{
		this.address = address;
	}
	setCity(city)
	{
		this.city = city;
	}
	setZipCode(zip_code)
	{
		this.zip_code = zip_code;
	}
	setColony(colony)
	{
		this.colony = colony;
	}
	setState(state)
	{
		this.state = state;
	}
	setCountryId(country_id)
	{
		this.country_id = country_id;
	}
	setGender(gender)
	{
		this.gender = gender;
	}
	setEmail(email)
	{
		this.email = email;
	}
	setPhone(phone)
	{
		this.phone = phone;
	}
	setCellular(cellular)
	{
		this.cellular = cellular;
	}
	setPassword(password)
	{
		this.password = password;
	}
	setUserSupportId(user_support_id)
	{
		this.user_support_id = user_support_id;
	}
}