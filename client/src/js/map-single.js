let map;

window.initializeMap = function (lat, lon) {
  // 确保只初始化一次
  if (!map && $("#map-contact").length) {
    map = L.map("map-contact", {
      zoom: 12,
      maxZoom: 20,
      minZoom: 5,
      tap: false,
      gestureHandling: true,
      center: [lat, lon], // 使用传递的经纬度
    });

    map.scrollWheelZoom.disable();

    L.tileLayer(
      "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
      {
        scrollWheelZoom: false,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    var icon = L.divIcon({
      html: '<i class="fa fa-building"></i>',
      iconSize: [50, 50],
      iconAnchor: [50, 50],
      popupAnchor: [-20, -42],
    });

    L.marker([lat, lon], {
      icon: icon,
    }).addTo(map);
  } else if (map) {
    // 如果地图已存在，更新中心位置
    map.setView([lat, lon]);
  }
};

window.loadMapWithAddress = async function (address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      window.initializeMap(lat, lon);
    } else {
      console.error("No coordinates found for address:", address);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
};
