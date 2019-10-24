var map = L.map('map', {
    zoomControl: true,
    maxZoom: 28,
    minZoom: 1
}).fitBounds([
    [50.899615041735814, -1.5200098603963854],
    [50.93954716446083, -1.3002832978963854]
]);
// var hash = new L.Hash(map);
map.attributionControl.setPrefix(
    '<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot;\
        <a href="http://leafletjs.com" target="_blank" title="A JS library for interactive maps">Leaflet</a> &middot; \
        &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &middot;\
        Sensor data from <a href="https://breathingspaces.org.uk/" target="_blank">Breathing Spaces</a>, \
        <a href="https://uk-air.defra.gov.uk/networks/network-info?view=aurn" target="_blank">Defra AURN</a>, \
        <a href="https://uk-air.defra.gov.uk/data/pcm-data" target="_blank">Defra PCM</a>,\
        <a href="https://www.southampton.gov.uk/environmental-issues/pollution/air-quality/monitoring/nitrogen-dioxide-diffusion-tubes.aspx" target="_blank">SCC</a>, \
        <a href="http://www.erg.kcl.ac.uk" target="_blank">KCL ERG</a>'
);
var bounds_group = new L.featureGroup([]);

function setBounds() {}

var popupWidth;

if (window.innerWidth < 600) {
    popupWidth = window.innerWidth * 0.75;
} else {
    popupWidth = 450;
}

///////////////////////////////////////////////////////////////////////////////////
// Background map
///////////////////////////////////////////////////////////////////////////////////
var layer_OSM = L.tileLayer(' https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
    opacity: 0.4
});
layer_OSM.addTo(map);

///////////////////////////////////////////////////////////////////////////////////
// Active (Breathing Spaces) sensors layer
///////////////////////////////////////////////////////////////////////////////////

function pop_ActiveSensors_1(feature, layer) {
    var popupContent = '<iframe src="' + feature.properties['graph_url'] + '" width="' + popupWidth + '" height="200" frameborder="0"></iframe>' +
        '<br><a href="https://opennms.computenodes.net/grafana/d/G2NTzy6mk/st-denys-detailed-measurements?orgId=1&var-node=mqtt%3A' + feature.properties['sensor_id'] + '" target="_blank">Detailed sensor data</a>';

        if (feature.properties['sensor_id'] == 'nesta-4' || feature.properties['sensor_id'] == 'nesta-1') {
            popupContent += "<br/><b>Note:</b> This sensor is currently offline and due to be fixed in early November";
        }

        popupContent += '<br><b>Disclaimer:</b> The data presented has not been recorded using legally validated reference equipment and should therefore be treated with caution.';
    layer.bindPopup(popupContent, {
        maxWidth: popupWidth
    });
}

function style_ActiveSensors_1_0() {
    return {
        pane: 'pane_ActiveSensors_1',
        rotationAngle: 0.0,
        rotationOrigin: 'center center',
        icon: L.icon({
            iconUrl: 'markers/sensor_icon_darkblue.svg',
            iconSize: [26.599999999999998, 26.599999999999998]
        }),
    }
}
map.createPane('pane_ActiveSensors_1');
map.getPane('pane_ActiveSensors_1').style.zIndex = 500;
map.getPane('pane_ActiveSensors_1').style['mix-blend-mode'] = 'normal';
var layer_ActiveSensors_1 = new L.geoJson(json_ActiveSensors_1, {
    attribution: '',
    pane: 'pane_ActiveSensors_1',
    onEachFeature: pop_ActiveSensors_1,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, style_ActiveSensors_1_0(feature));
    },
});
bounds_group.addLayer(layer_ActiveSensors_1);
map.addLayer(layer_ActiveSensors_1);

///////////////////////////////////////////////////////////////////////////////////
// School sensors layer
///////////////////////////////////////////////////////////////////////////////////

function pop_SchoolSensors(feature, layer) {
    var popupContent = '<iframe src="https://opennms.computenodes.net/grafana/d-solo/FjxbKsHZk/schools-detailed-measurements?orgId=1&var-node=mqtt%3A' + feature.properties['LoRaWAN_ID'] + '&panelId=8" width="' + popupWidth + '" height="200" frameborder="0"></iframe>' +
        '<br><a href="https://opennms.computenodes.net/grafana/d/FjxbKsHZk/schools-detailed-measurements?orgId=1&var-node=mqtt%3A' + feature.properties['LoRaWAN_ID'] + '" target="_blank">Detailed sensor data</a>' +
        '<br><b>Disclaimer:</b> The data presented has not been recorded using legally validated reference equipment and should therefore be treated with caution.'
    layer.bindPopup(popupContent, {
        maxWidth: popupWidth
    });
}

function style_SchoolSensors() {
    return {
        pane: 'pane_SchoolSensors',
        rotationAngle: 0.0,
        rotationOrigin: 'center center',
        icon: L.icon({
            iconUrl: 'markers/sensor_icon_green.svg',
            iconSize: [26.599999999999998, 26.599999999999998]
        }),
    }
}
map.createPane('pane_SchoolSensors');
map.getPane('pane_SchoolSensors').style.zIndex = 401;
map.getPane('pane_SchoolSensors').style['mix-blend-mode'] = 'normal';
var layer_SchoolSensors = new L.geoJson(json_SchoolSensors, {
    attribution: '',
    pane: 'pane_SchoolSensors',
    onEachFeature: pop_SchoolSensors,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, style_SchoolSensors(feature));
    },
});
bounds_group.addLayer(layer_SchoolSensors);
map.addLayer(layer_SchoolSensors);

///////////////////////////////////////////////////////////////////////////////////
// AURN layer
///////////////////////////////////////////////////////////////////////////////////
function pop_AURN_Soton_Feb19Stats_2(feature, layer) {
    var popupContent = '<iframe src="graphs/AURN.html?site=' + feature.properties['site_id'] + '&width=' + (popupWidth - 20) + '" width="' + popupWidth + '" height="200" frameborder="0"></iframe>' + 
    '<a href="http://southampton.my-air.uk/site/?SiteCode=' + feature.properties['site_id'] + '" target="_blank">Detailed sensor data</a><br>' +
    'NO<sub>2</sub> annual mean limit shown in red<br/><br/>' + 
    '<i>Data provided from <a href="http://www.erg.kcl.ac.uk">KCL ERG</a> under the Open Government License</i>'
    layer.bindPopup(popupContent, {
        // maxHeight: 400
        maxWidth: popupWidth
    });
}

function style_AURN_Soton_Feb19Stats_2_0(feature) {
    return {
        pane: 'pane_AURN_Soton_Feb19Stats_2',
        radius: 10.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(150,1,84,1.0)',
    }
}
map.createPane('pane_AURN_Soton_Feb19Stats_2');
map.getPane('pane_AURN_Soton_Feb19Stats_2').style.zIndex = 402;
map.getPane('pane_AURN_Soton_Feb19Stats_2').style['mix-blend-mode'] = 'normal';
var layer_AURN_Soton_Feb19Stats_2 = new L.geoJson(json_AURN_Soton_Feb19Stats_2, {
    attribution: '',
    pane: 'pane_AURN_Soton_Feb19Stats_2',
    onEachFeature: pop_AURN_Soton_Feb19Stats_2,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_AURN_Soton_Feb19Stats_2_0(feature));
    },
});
bounds_group.addLayer(layer_AURN_Soton_Feb19Stats_2);
map.addLayer(layer_AURN_Soton_Feb19Stats_2);



///////////////////////////////////////////////////////////////////////////////////
// Diffusion Tubes layer
///////////////////////////////////////////////////////////////////////////////////
function pop_DiffusionTubeMeasurements_MergedAndFixed_2(feature, layer) {
    var popupContent = '<h3>Diffusion tube at ' + feature.properties["Name"] + '</h3>' +
        '<b>2017 average:</b> ' + parseFloat(feature.properties['local adjusted']).toFixed(0) + '&micro;g/m<sup>3</sup>'
    layer.bindPopup(popupContent, {
        maxWidth: popupWidth
    });
}

function style_DiffusionTubeMeasurements_MergedAndFixed_2_0(feature) {
    if (feature.properties['local adjusted'] >= 0.000000 && feature.properties['local adjusted'] <= 40.000000) {
        return {
            pane: 'pane_DiffusionTubeMeasurements_MergedAndFixed_2',
            shape: 'square',
            radius: 6.0,
            opacity: 1,
            color: 'rgba(126,126,126,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(27,169,239,1.0)',
        }
    }
    if (feature.properties['local adjusted'] >= 40.000000 && feature.properties['local adjusted'] <=
        55.422097) {
        return {
            pane: 'pane_DiffusionTubeMeasurements_MergedAndFixed_2',
            shape: 'square',
            radius: 6.0,
            opacity: 1,
            color: 'rgba(126,126,126,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(255,0,0,1.0)',
        }
    }
}
map.createPane('pane_DiffusionTubeMeasurements_MergedAndFixed_2');
map.getPane('pane_DiffusionTubeMeasurements_MergedAndFixed_2').style.zIndex = 402;
map.getPane('pane_DiffusionTubeMeasurements_MergedAndFixed_2').style['mix-blend-mode'] = 'normal';
var layer_DiffusionTubeMeasurements_MergedAndFixed_2 = new L.geoJson(
    json_DiffusionTubeMeasurements_MergedAndFixed_2, {
        attribution: '',
        pane: 'pane_DiffusionTubeMeasurements_MergedAndFixed_2',
        onEachFeature: pop_DiffusionTubeMeasurements_MergedAndFixed_2,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.shapeMarker(latlng, style_DiffusionTubeMeasurements_MergedAndFixed_2_0(feature));
        },
    });
bounds_group.addLayer(layer_DiffusionTubeMeasurements_MergedAndFixed_2);

layer_DiffusionTubeMeasurements_MergedAndFixed_2.on('add', function () {
    gtag('event', 'select_content', { content_type : 'Diffusion Tubes' });
    $('#legend_DiffusionTubeMeasurements').show();
});

layer_DiffusionTubeMeasurements_MergedAndFixed_2.on('remove', function () {
    $('#legend_DiffusionTubeMeasurements').hide();
});

layer_DiffusionTubeMeasurements_MergedAndFixed_2.addTo(map);

///////////////////////////////////////////////////////////////////////////////////
// Perceptions layer
///////////////////////////////////////////////////////////////////////////////////

var json_Perceptions_AirQuality = json_AllPerceptions.features.filter(function (entry) {
    return entry.properties.data.Type === 'Air quality concerns';
});

var json_Perceptions_Health = json_AllPerceptions.features.filter(function (entry) {
    return entry.properties.data.Type === 'Health concerns';
});

var json_Perceptions_Assets = json_AllPerceptions.features.filter(function (entry) {
    return entry.properties.data.Type === 'Neighbourhood assets';
});

var json_Perceptions_Change = json_AllPerceptions.features.filter(function (entry) {
    return entry.properties.data.Type === 'Ideas for change';
});

function pop_Perceptions(feature, layer) {
    var popupContent = '<h3>' + feature.properties["name"] + '</h3>' +
                        feature.properties['data']['Comment'].split('\n').join('<br/>');
    layer.bindPopup(popupContent, {
        maxWidth: popupWidth
    });
}

const PERCEPTIONS_AQ_COLOR = '#1f78b4';
const PERCEPTIONS_HEALTH_COLOR = '#735290';
const PERCEPTIONS_ASSETS_COLOR = '#b2df8a';
const PERCEPTIONS_CHANGE_COLOR = '#CDDDDD';

function style_Perceptions(feature, color) {
    return {
        rotationAngle: 0.0,
        rotationOrigin: 'center center',
        icon: L.divIcon({
            className: 'speechbubble_icon',
            html: speech_bubble_with_color(color),
            iconSize: [26.599999999999998, 26.599999999999998],
            iconAnchor: [26, 20]
        }),
    }
}
var layer_Perceptions_AQ = new L.geoJson(
    json_Perceptions_AirQuality, {
        attribution: '',
        onEachFeature: pop_Perceptions,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.marker(latlng,
                style_Perceptions(feature, PERCEPTIONS_AQ_COLOR));
        },
    });
layer_Perceptions_AQ.on('add', function () {
    gtag('event', 'select_content', { content_type : 'Perceptions AQ' });
});
bounds_group.addLayer(layer_Perceptions_AQ);

var layer_Perceptions_Health = new L.geoJson(
    json_Perceptions_Health, {
        attribution: '',
        onEachFeature: pop_Perceptions,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.marker(latlng,
                style_Perceptions(feature, PERCEPTIONS_HEALTH_COLOR));
        },
    });
layer_Perceptions_Health.on('add', function () {
    gtag('event', 'select_content', { content_type : 'Perceptions Health' });
});
bounds_group.addLayer(layer_Perceptions_Health);

var layer_Perceptions_Assets = new L.geoJson(
    json_Perceptions_Assets, {
        attribution: '',
        onEachFeature: pop_Perceptions,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.marker(latlng,
                style_Perceptions(feature, PERCEPTIONS_ASSETS_COLOR));
        },
    });
layer_Perceptions_Assets.on('add', function () {
    gtag('event', 'select_content', { content_type : 'Perceptions Assets' });
});
bounds_group.addLayer(layer_Perceptions_Assets);

var layer_Perceptions_Change = new L.geoJson(
    json_Perceptions_Change, {
        attribution: '',
        onEachFeature: pop_Perceptions,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.marker(latlng,
                style_Perceptions(feature, PERCEPTIONS_CHANGE_COLOR));
        },
    });
layer_Perceptions_Change.on('add', function () {
    gtag('event', 'select_content', { content_type : 'Perceptions Change' });
});
bounds_group.addLayer(layer_Perceptions_Change);

///////////////////////////////////////////////////////////////////////////////////
// PCM layers
///////////////////////////////////////////////////////////////////////////////////
function pop_PCM_2017(feature, layer) {
    var popupContent = '<table>\
<tr>\
    <td><b>NOx</b></td>\
    <td><b>' + parseFloat(feature.properties['nox2017']).toFixed(1) + '&micro;g/m<sup>3</sup></b></td>\
</tr>\
<tr>\
    <td><b>NO2</b></td>\
    <td>' + parseFloat(feature.properties['no22017']).toFixed(1) + '&micro;g/m<sup>3</sup></td>\
</tr>\
<tr>\
    <td><b>PM2.5</b></td>\
    <td>' + parseFloat(feature.properties['pm252017g']).toFixed(1) + '&micro;g/m<sup>3</sup></td>\
</tr>\
<tr>\
    <td><b>PM10</b></td>\
    <td>' + parseFloat(feature.properties['pm102017g']).toFixed(1) + '&micro;g/m<sup>3</sup></td>\
</tr>\
</table>';
    layer.bindPopup(popupContent, { maxHeight: 400 });
}

function pop_PCM_2016(feature, layer) {
    var popupContent = '<table>\
<tr>\
    <td><b>NOx</b></td>\
    <td><b>' + parseFloat(feature.properties['nox2016']).toFixed(1) + '&micro;g/m<sup>3</sup></b></td>\
</tr>\
<tr>\
    <td><b>NO2</b></td>\
    <td>' + parseFloat(feature.properties['no22016']).toFixed(1) + '&micro;g/m<sup>3</sup></td>\
</tr>\
<tr>\
    <td><b>PM2.5</b></td>\
    <td>' + parseFloat(feature.properties['pm252016g']).toFixed(1) + '&micro;g/m<sup>3</sup></td>\
</tr>\
<tr>\
    <td><b>PM10</b></td>\
    <td>' + parseFloat(feature.properties['pm102016g']).toFixed(1) + '&micro;g/m<sup>3</sup></td>\
</tr>\
</table>';
    layer.bindPopup(popupContent, { maxHeight: 400 });
}
const PCM_CHOROPLETH_LIMITS = [30, 40, 50, 60, 80, 100];

var layer_PCM_2017 = L.choropleth(json_PCM_2017, {
        valueProperty: 'nox2017',
        scale: 'YlOrRd',
        limits: PCM_CHOROPLETH_LIMITS,
        style: {
            color: '#111111', // border color
            weight: 1,
            fillOpacity: 0.5,
            fillColor: '#ffffff'
        },
        onEachFeature: pop_PCM_2017
    });

layer_PCM_2017.on('add', function () {
    // Need setTimeout so that we don't get multiple
    // onadd/onremove events raised
    setTimeout(function() {
        map.removeLayer(layer_PCM_2016);
        gtag('event', 'select_content', { content_type : 'PCM 2017' });
        $('#legend_PCM_2017').show();
    });
});

layer_PCM_2017.on('remove', function () {
    $('#legend_PCM_2017').hide();
});

var layer_PCM_2016 = L.choropleth(json_PCM_2016, {
        valueProperty: 'nox2016',
        scale: 'YlOrRd',
        limits: PCM_CHOROPLETH_LIMITS,
        style: {
            color: '#111111', // border color
            weight: 1,
            fillOpacity: 0.5,
            fillColor: '#ffffff'
        },
        onEachFeature: pop_PCM_2016
    })

layer_PCM_2016.on('add', function() {
    // Need setTimeout so that we don't get multiple
    // onadd/onremove events raised
    setTimeout(function() {
        map.removeLayer(layer_PCM_2017);
        gtag('event', 'select_content', { content_type : 'PCM 2016' });
        $('#legend_PCM_2016').show();
    });
});

layer_PCM_2016.on('remove', function () {
    $('#legend_PCM_2016').hide();
});

///////////////////////////////////////////////////////////////////////////////////
// Legend
///////////////////////////////////////////////////////////////////////////////////
var baseMaps = {};
var groupedOverlays = {
    'Current data': {
        '<img src="markers/sensor_icon_darkblue.svg" height=20px /> Breathing Spaces sensors\
        <a class="infolink" href="#" onclick="showInfoDialog(INFO_BREATHING_SPACES)"><img class="infobutton" src="images/questionbutton.svg"></a>': layer_ActiveSensors_1,
        '<img src="markers/sensor_icon_green.svg" height=20px /> School sensors\
        <a class="infolink" href="#" onclick="showInfoDialog(INFO_SCHOOL)"><img class="infobutton" src="images/questionbutton.svg"></a>': layer_SchoolSensors,
        '<img class="legendicon" src="images/circle.svg"/> AURN NO<sub>2</sub>\
        <a class="infolink" href="#" onclick="showInfoDialog(INFO_AURN)"><img class="infobutton" src="images/questionbutton.svg"></a>': layer_AURN_Soton_Feb19Stats_2
    },
    'Historical data': {
    'SCC Diffusion Tubes (NO<sub>2</sub>) (2017) <a class="infolink" href="#" onclick="showInfoDialog(INFO_DIFFUSION_TUBES)"><img class="infobutton" src="images/questionbutton.svg"></a><br />\
    <table id="legend_DiffusionTubeMeasurements" style="display: none">\
        <tr>\
            <td class="legend-subitem" style="text-align: center; vertical-align: bottom;">\
                <img\
                    src="legend/DiffusionTubeMeasurements_MergedAndFixed_2_1953740.png" /></td>\
            <td> Below legal limit (&lt; 40&micro;g/m<sup>3</sup>) </td>\
        </tr>\
        <tr>\
            <td class="legend-subitem" style="text-align: center;"><img\
                    src="legend/DiffusionTubeMeasurements_MergedAndFixed_2_3745541.png" /></td>\
            <td> Above legal limit (&gt; 40&micro;g/m<sup>3</sup>) </td>\
        </tr>\
    </table>': layer_DiffusionTubeMeasurements_MergedAndFixed_2,
    [legend_for_choropleth_layer(layer_PCM_2016, 'Defra PCM (NOx) (2016)', '&micro;g/m<sup>3</sup>', 'legend_PCM_2016', 'INFO_PCM_2016')]: layer_PCM_2016,
    [legend_for_choropleth_layer(layer_PCM_2017, 'Defra PCM (NOx) (2017)', '&micro;g/m<sup>3</sup>', 'legend_PCM_2017', 'INFO_PCM_2017')]: layer_PCM_2017

    },
    'Your concerns & ideas <a class="infolink" href="#" onclick="showInfoDialog(INFO_COMMUNITY_PERCEPTIONS)"><img class="infobutton" src="images/questionbutton.svg"></a>': {
    [speech_bubble_with_color(PERCEPTIONS_AQ_COLOR) + '&nbsp; Air Quality concerns']: layer_Perceptions_AQ,
    [speech_bubble_with_color(PERCEPTIONS_HEALTH_COLOR) + '&nbsp; Health concerns']: layer_Perceptions_Health,
    [speech_bubble_with_color(PERCEPTIONS_ASSETS_COLOR) + '&nbsp; Community assets']: layer_Perceptions_Assets,
    [speech_bubble_with_color(PERCEPTIONS_CHANGE_COLOR) + '&nbsp; Ideas for change']: layer_Perceptions_Change,
    }
};

if (L.Browser.mobile) {
    var layersControlCollapsed = true;
} else {
    var layersControlCollapsed = false;
}

var layersControl = L.control.groupedLayers(baseMaps, groupedOverlays, {
    collapsed: layersControlCollapsed
});
layersControl.addTo(map);

var scaleOpts = {position: 'bottomright',
                    fill: 'fill'
                };

if (L.Browser.mobile) {
    scaleOpts['maxUnitsWidth'] = 100;
}

L.control.graphicScale(scaleOpts).addTo(map);

var credctrl = L.controlCredits({
        image: "./images/logo.jpeg",
        link: "https://breathingspaces.org.uk/",
        text: "Map created by the Breathing Spaces project, click here for more information",
        width: (L.Browser.mobile ? 75 : 150),
        height: (L.Browser.mobile ? 75 : 150),
    }).addTo(map);

setBounds();

// map.whenReady(function () {
//     // map.openModal({content: WELCOME_DIALOG_TEXT})
// });

$(document).ready(function () {
    // Have to run the Diffusion Tube layer's add event manually here
    // as otherwise it fires before the page is properly loaded and therefore
    // doesn't load the legend properly
    layer_DiffusionTubeMeasurements_MergedAndFixed_2.fireEvent('add');
    map.openModal({
        content: WELCOME_DIALOG_TEXT
    })
});