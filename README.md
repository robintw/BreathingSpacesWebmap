# Breathing Spaces Web Map
This repository contains the code used to create the web map of air quality data for the [Breathing Spaces](https://breathingspaces.org.uk/) project.

The web map is hosted using Github Pages, from the `master` branch, and is available at https://robintw.github.io/BreathingSpacesWebmap/index.html

## Code development and dependencies
No dependencies need to be installed before developing this code - all dependencies are in the `js` folder. The code was originally developed by exporting a QGIS project as a webmap using the [qgis2web](https://github.com/tomchadwin/qgis2web) plugin - and so some of the styling and organisation of the project comes from the default organisation provided by that export.

The folder organisation is generally straightforward, but is explained below:

 - `css` - all CSS files for the map, including those needed as part of Leaflet or the various plugins used
 - `data` - all geographic data in GeoJSON format. These are provided as pure javascript files, with the GeoJSON contents assigned to a variable in the top line of the file - eg `var json_PCM_2016 = {`
 - `graphs` - contains HTML files for displaying interactive graphs for the AURN in the webmap. This file takes URL parameters to control which site is used for the data, and then grabs the data using the KCL API and displays it on a plotly graph
 - `images` - contains images used, principally for the 'more info' buttons etc
 - `js` - contains the javascript files for the map, including those needed as part of Leaflet or the various plugins used. The main custom javascript code is in `map.js`
 - `legend` - images used as parts of the legends (although many of the legends are automatically generated now)
  - `markers` - SVG markers used for some points on the map (eg. the pollution sensor labels)
  - `webfonts` - fonts used as part of the map