import { pagingConfig, setPage, updatePaging } from './pagination';
import { startSearch } from './YouTubeApi';

let defaultBlockWidth;
let articleMargin = 20;

(function () {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) defaultBlockWidth = 800;
	else defaultBlockWidth = 400;
})();

function addMarginsToArticles() {
	const articles = document.querySelectorAll('#searchResults > article');
	for (let i = 0; i < articles.length; i += 1) {
		articles.item(i).style.margin = `20px ${articleMargin}px`;
	}
}

function sectionMargin() {
	return parseInt((document.querySelector('#searchResults').clientWidth - (pagingConfig.columnCount * defaultBlockWidth)) / 2 / pagingConfig.columnCount, 10);
}

function calculateColumnCount() {
	return parseInt(document.querySelector('#searchResults').clientWidth / (defaultBlockWidth + 40), 10);
}

function resize() {
	const firstVideoOnPage = ((pagingConfig.currentPage - 1) * pagingConfig.columnCount) + 1;
	pagingConfig.columnCount = calculateColumnCount();

	const newPageNumber = parseInt((firstVideoOnPage - 1) / pagingConfig.columnCount, 10) + 1;

	articleMargin = sectionMargin();
	addMarginsToArticles();

	pagingConfig.sectionWidth = defaultBlockWidth + (2 * articleMargin);

	const additionallyDownload = (pagingConfig.columnCount - (pagingConfig.videosCount % pagingConfig.columnCount)) % pagingConfig.columnCount;

	startSearch(additionallyDownload);
	pagingConfig.videosCount += additionallyDownload;

	if (pagingConfig.pagesCount != 0) updatePaging(pagingConfig.pagesCount);

	setPage(newPageNumber);
}
window.onresize = resize;

export { addMarginsToArticles, resize };
