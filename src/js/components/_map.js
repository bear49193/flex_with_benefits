/* global jQuery google */

const $ = jQuery

function newMap ($el) {
  const $markers = $el.find('.marker')
  const args = {
    zoom: 16,
    center: new google.maps.LatLng(0, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    draggable: false,
    disableDefaultUI: true,
    scrollwheel: false
  }
  const map = new google.maps.Map($el[0], args)
  map.markers = []
  $markers.each(function () {
    addMarker($(this), map)
  })
  centerMap(map)
  return map
}

function addMarker ($marker, map) {
  const latlng = new google.maps.LatLng(
    $marker.attr('data-lat'),
    $marker.attr('data-lng')
  )
  const marker = new google.maps.Marker({
    position: latlng,
    map: map
  })
  map.markers.push(marker)
  if ($marker.html()) {
    const infowindow = new google.maps.InfoWindow({
      content: $marker.html()
    })
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker)
    })
  }
}

function centerMap (map) {
  const bounds = new google.maps.LatLngBounds()
  $.each(map.markers, function (i, marker) {
    const latlng = new google.maps.LatLng(
      marker.position.lat(),
      marker.position.lng()
    )
    bounds.extend(latlng)
  })
  if (map.markers.length === 1) {
    map.setCenter(bounds.getCenter())
    map.setZoom(16)
  } else {
    map.fitBounds(bounds)
  }
}

export default () => {
  $('.acf-map').each(function () {
    newMap($(this))
  })
}
