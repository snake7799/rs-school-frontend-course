import { startSearch } from './YouTubeApi';

let pagingConfig = {
	pagesCount: 0,
	currentPage: 0,
	columnCount: 3,
	videosCount: 0,
	sectionWidth: 1320,
};

function translatex(page) {
	const width = pagingConfig.sectionWidth * pagingConfig.columnCount * (1 - page);
	const articles = document.querySelectorAll('#searchResults > article');
	for (let i = 0; i < articles.length; i += 1) {
		articles.item(i).style.transform = `translatex(${width}px)`;
	}
	pagingConfig.currentPage = page;
}

function setPage(pageNumber) {
	if (pageNumber == pagingConfig.pagesCount + 1 && pageNumber > 1) {
		startSearch(pagingConfig.columnCount);
		pagingConfig.videosCount += pagingConfig.columnCount;
	} else translatex(pageNumber);

	const pages = document.querySelectorAll('.paging > a');
	for (let i = 0; i < pages.length; i += 1) {
		if (pages.item(i).id == pageNumber) pages.item(i).classList.add('active-page');
		else pages.item(i).classList.remove('active-page');
	}
}

function addPage(idNumber) {
	const page = document.createElement('a');

	page.addEventListener('mousedown', (e) => {
		e.target.innerHTML = `<div class="page-number">${e.target.id}</div>`;
	});
	page.addEventListener('click', (e) => {
		e.target.innerHTML = '';
		setPage(e.target.id);
	});

	if (idNumber != undefined) page.id = idNumber;
	else page.id = pagingConfig.pagesCount + 1;

	document.querySelector('.paging').appendChild(page);
}

function modifyPaging(list) {
	if (pagingConfig.pagesCount * pagingConfig.columnCount < list.length) {
		pagingConfig.pagesCount += 1;
		addPage();
		setTimeout(() => {
			translatex(pagingConfig.pagesCount);
		}, 100);
	} else {
		setTimeout(() => {
			translatex(pagingConfig.currentPage);
		}, 100);
	}
}

function updatePaging(pgsCnt) {
	document.body.removeChild(document.querySelector('.paging'));
	const paging = document.createElement('div');
	paging.classList.add('paging');
	document.body.appendChild(paging);

	for (let i = 1; i <= pgsCnt + 1; i += 1) {
		addPage(i);
	}
}

function resetPagingConfig() {
	pagingConfig = {
		pagesCount: 0,
		currentPage: 0,
		columnCount: 3,
		videosCount: 0,
		sectionWidth: 1320,
	};
}

export { pagingConfig, addPage, setPage, modifyPaging, updatePaging, resetPagingConfig };
