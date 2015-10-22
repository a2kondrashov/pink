var map, myIcon;

DG.then(function () {
	map = DG.map('map', {
		"center": [59.936531, 30.320998],
		"zoom": 16,
		"zoomControl": false,
		"fullscreenControl": false
	});
	map.scrollWheelZoom.disable();

	myIcon = DG.icon({
		iconUrl: 'img/map-marker.svg',
		iconSize: [36, 36]
	});
	DG.marker([59.936351, 30.320998], {
		icon: myIcon
	}).addTo(map);
});