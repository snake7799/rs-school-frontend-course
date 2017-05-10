import { addMarginsToArticles } from './resize';
import { modifyPaging } from './pagination';

let videoList = {};
let video = {};
let nextPageToken = '';

function convertSearchResponseToVideoList(responseData) {
	video = {};
	const items = responseData.items;
	if (items != undefined) {
		for (let i = 0; i < items.length; i += 1) {
			const item = items[i];
			const shortId = item.id.videoId;
			const date = new Date(Date.parse(item.snippet.publishedAt));
			Array.prototype.push.call(video, {
				id: shortId,
				youtubeLink: `http://www.youtube.com/watch?v=${shortId}`,
				title: item.snippet.title,
				thumbnail: item.snippet.thumbnails.high.url,
				description: item.snippet.description,
				author: item.snippet.channelTitle,
				publishedDate: `${(date.getMonth() + 1)}.${date.getDate()}.${date.getFullYear()}`,
			});
		}
	}
	nextPageToken = responseData.nextPageToken;
}

function addVideoToDocument() {
	for (let i = 0; i < video.length; i += 1) {
		const article = document.createElement('article');

		const imgDiv = document.createElement('div');
		const img = document.createElement('img');
		img.src = video[i].thumbnail;
		imgDiv.appendChild(img);

		const a = document.createElement('a');
		a.innerHTML = `<h2>${video[i].title}</h2>`;
		a.href = video[i].youtubeLink;
		imgDiv.appendChild(a);

		article.appendChild(imgDiv);

		const description = document.createElement('p');
		description.innerHTML = video[i].description;
		article.appendChild(description);

		const infoDiv = document.createElement('div');
		infoDiv.classList.add('info');
		infoDiv.innerHTML = `<div><i class="fa fa-user fa-lg" aria-hidden="true"></i>${video[i].author}</div>
							<div><i class="fa fa-calendar fa-lg" aria-hidden="true"></i>${video[i].publishedDate}</div>
							<div><i class="fa fa-eye fa-lg" aria-hidden="true"></i>${video[i].viewCount}</div>`;
		article.appendChild(infoDiv);

		article.onmousedown = function (e) {
			e.preventDefault();
		};
		article.onselectstart = function (e) {
			e.preventDefault();
		};

		document.querySelector('#searchResults').appendChild(article);
	}
	addMarginsToArticles();
	modifyPaging(videoList);
}

function loadYouTubeAPI() {
	return new Promise((resolve) => {
		gapi.client.setApiKey('AIzaSyBHAZPcismbGY6qtyWaZ1LOrLf3Wp9prh0');	// eslint-disable-line
		gapi.client.load('youtube', 'v3', resolve);							// eslint-disable-line
	});
}

function startSearch(resCnt) {
	if (resCnt == 0 || isNaN(resCnt)) return;
	loadYouTubeAPI().then(() => {
		const query = document.querySelector('input').value;
		return gapi.client.youtube.search.list({							// eslint-disable-line
			q: query,
			part: 'snippet',
			type: 'video',
			maxResults: resCnt,
			pageToken: nextPageToken,
		})
			.then((response) => {
				const str = JSON.stringify(response.result);
				convertSearchResponseToVideoList(JSON.parse(str));
			})
			.then(() => {
				const ids = [];
				for (let i = 0; i < video.length; i += 1) {
					ids.push(video[i].id);
				}
				return gapi.client.youtube.videos.list({					// eslint-disable-line
					id: ids.join(','),
					part: 'statistics',
				});
			})
			.then((response) => {
				const str = JSON.stringify(response.result);
				const items = JSON.parse(str).items;
				if (items != undefined) {
					for (let i = 0; i < items.length; i += 1) {
						video[i].viewCount = items[i].statistics.viewCount;
					}
					Array.prototype.push.apply(videoList, video);
				}
			})
			.then(() => {
				addVideoToDocument();
			}, error => console.log(error));
	});
}

function resetVideoList() {
	videoList = {};
}

export { nextPageToken, startSearch, resetVideoList };
