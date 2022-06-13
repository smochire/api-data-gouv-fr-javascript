const input = document.querySelector('#adress');
const suggestions = document.querySelector('.suggestions ul');

var adress = [];

function search(str) {
	let results = [];
	const val = str.toLowerCase();

	for (i = 0; i < adress.length; i++) {
		if (adress[i].toLowerCase().indexOf(val) > -1) {
			results.push(adress[i]);
		}
	}

	return results;
}

function searchHandler(e) {
	const inputVal = e.currentTarget.value;
	let results = [];
	if (inputVal.length > 0) {
		results = search(inputVal);
	}
	showSuggestions(results, inputVal);
}

function showSuggestions(results, inputVal) {

	suggestions.innerHTML = '';

	if (results.length > 0) {
		for (i = 0; i < results.length; i++) {
			let item = results[i];
			// Highlights only the first match
			// TODO: highlight all matches
			const match = item.match(new RegExp(inputVal, 'i'));
			item = item.replace(match[0], `<strong>${match[0]}</strong>`);
			suggestions.innerHTML += `<li>${item}</li>`;
		}
		suggestions.classList.add('has-suggestions');
	} else {
		results = [];
		suggestions.innerHTML = '';
		suggestions.classList.remove('has-suggestions');
	}
}

function useSuggestion(e) {
	input.value = e.target.innerText;
	input.focus();
	suggestions.innerHTML = '';
	suggestions.classList.remove('has-suggestions');
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
			suggestions.innerHTML += `<li>${feature.properties.label}</li>`;
			suggestions.classList.add('has-suggestions');
			console.log(feature.properties);
		})
	}).catch((error) => {
		console.log(error);
	});
}

});