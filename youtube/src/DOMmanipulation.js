function createSearchInput() {
	const wrap = document.createElement('div');
	wrap.classList.add('searchWrap');

	const h1 = document.createElement('h1');
	h1.innerHTML = 'Your<span>Search</span>';
	wrap.appendChild(h1);

	const div = document.createElement('div');
	div.classList.add('searchInput');
	wrap.appendChild(div);

	const input = document.createElement('input');
	input.type = 'search';
	input.placeholder = 'Enter the query';
	input.autofocus = true;
	div.appendChild(input);

	const button = document.createElement('button');
	button.innerHTML = '<i class="fa fa-search fa-lg" aria-hidden="true"></i>';
	div.appendChild(button);

	document.body.appendChild(wrap);
}

function createSearchResultsSection() {
	const section = document.createElement('section');
	section.id = 'searchResults';
	document.body.appendChild(section);

	section.onmousedown = function (e) { e.preventDefault(); };
	section.onselectstart = function (e) { e.preventDefault(); };
}

function createPaging() {
	const paging = document.createElement('div');
	paging.classList.add('paging');
	document.body.appendChild(paging);
}

function changePositionOfSearch() {
	if (screen.width <= 500) {
		document.querySelector('h1').style.display = 'none';
		document.querySelector('.searchWrap').style.top = '2%';
		document.querySelector('.searchWrap').style.transform = 'translate(-50%, -2%)';
	} else {
		document.querySelector('.searchWrap').style.top = '3%';
		document.querySelector('.searchWrap').style.transform = 'translate(-50%, -3%)';
	}
	document.querySelector('.searchWrap > h1').style.fontSize = '48px';
	document.querySelector('.searchWrap > h1').style.marginBottom = '20px';
}

function resetSearchResults() {
	document.body.removeChild(document.querySelector('#searchResults'));
	document.body.removeChild(document.querySelector('.paging'));

	createSearchResultsSection();
	createPaging();
}

export { createSearchInput, createSearchResultsSection, createPaging, changePositionOfSearch, resetSearchResults };
