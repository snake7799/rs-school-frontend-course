import * as dom from './DOMmanipulation';
import { pagingConfig, addPage, resetPagingConfig } from './pagination';
import { resize } from './resize';
import { startSearch, resetVideoList } from './YouTubeApi';
import { handleTouchStart, handleTouchMove, handleTouchEnd } from './touch';

(function () {
	dom.createSearchInput();
	dom.createSearchResultsSection();
	dom.createPaging();
})();

function search() {
	dom.changePositionOfSearch();
	dom.resetSearchResults();
	resetPagingConfig();
	resetVideoList();
	resize();
	addPage();
	startSearch(pagingConfig.columnCount);
	pagingConfig.videosCount += pagingConfig.columnCount;
}

document.querySelector('input').addEventListener('keypress', (e) => {
	const event = e || window.event;
	if (event.keyCode === 13) search();
});
document.querySelector('button').addEventListener('click', search);

document.body.addEventListener('mousedown', handleTouchStart);
document.body.addEventListener('mousemove', handleTouchMove);
document.body.addEventListener('mouseup', handleTouchEnd);
document.body.addEventListener('touchstart', handleTouchStart);
document.body.addEventListener('touchmove', handleTouchMove);
document.body.addEventListener('touchend', handleTouchEnd);
