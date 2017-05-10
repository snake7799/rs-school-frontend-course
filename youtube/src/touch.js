import { pagingConfig, setPage } from './pagination';

let isDrag = false;
let drag = 0;

function isTouchOnSearchResults(path) {
	const target = document.querySelector('#searchResults');
	for (let i = 0; i < path.length; i += 1) {
		if (path[i] == target) return true;
	}
	return false;
}

function draggable(x) {
	const width = (pagingConfig.sectionWidth * pagingConfig.columnCount) * (1 - pagingConfig.currentPage);
	const articles = document.querySelectorAll('#searchResults > article');
	for (let i = 0; i < articles.length; i += 1) {
		articles[i].style.transform = `translatex(${(width + x)}px`;
	}
}

function getEventCordinateX(e) {
	if (e.type === 'mousedown' || e.type === 'mousemove' || e.type === 'mouseup') return e.x;
	else if (e.type === 'touchstart' || e.type === 'touchmove') return e.touches[0].clientX;
	else if (e.type === 'touchend') return e.changedTouches[0].clientX;
	return null;
}

function handleTouchStart(evt) {
	if (isTouchOnSearchResults(evt.path)) {
		isDrag = true;
		drag = getEventCordinateX(evt);
	}
}

function handleTouchMove(evt) {
	if (isDrag) draggable(getEventCordinateX(evt) - drag);
}

function handleTouchEnd(evt) {
	const cordX = getEventCordinateX(evt);
	if (isDrag) {
		if (cordX - drag >= 150 && pagingConfig.currentPage != 1) setPage(pagingConfig.currentPage - 1);
		else if (cordX - drag <= -150) setPage(parseInt(pagingConfig.currentPage, 10) + 1);
		else setPage(pagingConfig.currentPage);

		draggable(0);
	}
	isDrag = false;
}

export { handleTouchStart, handleTouchMove, handleTouchEnd };
