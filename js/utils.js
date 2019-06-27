function legend_for_choropleth_layer(layer, name, units, id, info_content) {
    var limits = layer.options.limits;
    var colors = layer.options.colors;
    var labels = [];

    var HTML = name + ' <a class="infolink" href="#" onclick="showInfoDialog(' +
                        info_content +
                        ')"><img class="infobutton" src="images/questionbutton.svg"></a>'

    limits.forEach(function (limit, index) {
        if (index === 0) {
            var to = parseFloat(limits[index]).toFixed(1);
            var range_str = "< " + to;
        }
        else {
            var from = parseFloat(limits[index - 1]).toFixed(1);
            var to = parseFloat(limits[index]).toFixed(1);
            var range_str = from + "-" + to;
        }
        
        labels.push('<li class="sublegend-item"><div class="sublegend-color" style="background-color: ' +
                    colors[index] + '">&nbsp;</div>&nbsp;' + range_str + units + '</li>');
    })

    HTML += '<ul id="' + id + '" class="sublegend" style="display: none">' + labels.join('') + '</ul>';

    return HTML;
}

function speech_bubble_with_color(color) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 842.777 690.811" height="26.59"\
                    width="26.59" version="1"><path d="M384.252.911c-194.4 11.1-351.2 106-380 230-10.9\
                    46.7-.6 98.9 28.1 142.4 14.2 21.6 36.9 46.2 59 64 70.9 56.9 175.4 93.4 288.5 100.5\
                    21 1.4 63.2 1.4 81.7.1l14.3-1.1 153.6 77.2c84.4 42.4 153.6 76.9 153.8 \
                    76.8.1-.2-28.2-44.5-63-98.4-34.9-53.9-63.4-98.2-63.4-98.5 0-.3 7.9-4.3 \
                    17.4-8.9 61.9-29.7 112.3-72.1 139.9-117.6 29.1-48 36.1-99.5 \
                    20.6-150-31.8-103.2-155.3-185.5-314.8-210-42.9-6.5-92.6-8.9-135.7-6.5z" fill="' +
        color + '" stroke="black" stroke-width="10"/></svg>';
}