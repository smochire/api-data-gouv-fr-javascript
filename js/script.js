const input = document.querySelector('#adress');
const suggestions = document.querySelector('.suggestions ul');


function useSuggestion(e) {
	let a = e.target.querySelector('.hidden').innerHTML;
	
	listes = a.split("%%");
	input.value = listes[0];
	document.getElementById('zipcode').value = listes[1];
	document.getElementById('ville').value = listes[2];
	document.getElementById('Pays').value = 'France';
	document.getElementById('Lat').value = listes[3];
	document.getElementById('long').value = listes[4];
	input.focus();
	suggestions.innerHTML = '';
	suggestions.classList.remove('has-suggestions');
	console.log(input);
}




suggestions.addEventListener('click', useSuggestion);
input.addEventListener('input', (e) => {
	
if(input.value!="")
{
	let url1 = fetch('https://api-adresse.data.gouv.fr/search/?q=' +input.value+'&type=street');
	url1.then((res) => {
		return res.json();
	}).then((data) => {
		suggestions.innerHTML ='';
		suggestions.classList.remove('has-suggestions');
		data.features.forEach((feature) => {
			suggestions.innerHTML += `<li>${feature.properties.label} <span class='hidden'>${feature.properties.name}%%${feature.properties.postcode}%%${feature.properties.city}%%${feature.geometry.coordinates[1]}%%${feature.geometry.coordinates[0]}</span></li>`;
			suggestions.classList.add('has-suggestions');
			console.log(feature);
		})
	}).catch((error) => {
		console.log(error);
	});
}

});