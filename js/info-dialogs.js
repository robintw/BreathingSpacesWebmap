        const INFO_BREATHING_SPACES = "<h2>Breathing Spaces sensors</h2>\
        <p>The Breathing Spaces sensors are a set of low-cost air quality sensors, deployed as part of the\
        <a href='https://breathingspaces.org.uk/'>Breathing Spaces</a> project in Southampton. The sensors\
        have been developed by a team at the University of Southampton, and measure particulate matter\
        pollution, which consists of tiny particles that can get deep inside your lungs and cause health\
        effects such as cardiovascular disease.</p>\
        <p>Particulate matter is split into two components: PM<sub>10</sub> and PM<sub>2.5</sub>, which consist\
        of particles smaller than 2.5&micro;m and 10&micro;m respectively (for\
        comparison, the width of a human hair is around 75&micro;m). The measurements are provided in\
        &micro;g/m<sup>3</sup>, the weight of particles per cubic metre of air.</p>\</p>\
        <p>An academic paper describing and evaluating the PM sensors used is available <a\
        href='https://www.nature.com/articles/s41598-019-43716-3'>here</a>.";

        const INFO_AURN = "<h2>AURN PM<sub>2.5</sub></h2>\
        <p>The <a href='https://uk-air.defra.gov.uk/networks/network-info?view=aurn'>Automatic Urban-Rural Network (AURN)</a>\
        is a network of air pollution monitoring stations\
        run by the Department for Environment, Food and Rural Affairs (Defra). Each automated site\
        monitors a range of pollutants; here we are focusing on PM<sub>2.5</sub>, the smallest type\
        of particulate matter (which consists of tiny particles floating in the air).</p>\
        <p>The measurements are provided in &micro;g/m<sup>3</sup>, the weight of particles per cubic\
        metre of air.</p>\
        <p>The AURN network is used for government air quality assessments, and is therefore calibrated\
        to reference standards, and produces highly accurate and reliable measurements.\
        <p>Detailed graphs are available <a href='http://southampton.my-air.uk/graphs/'>here</a>.";

        const INFO_DIFFUSION_TUBES = "<h2>SCC Diffusion Tubes (NO<sub>2</sub>) (2017)</h2>\
        <p>Southampton City Council (SCC) operate a set of diffusion tubes to measure NO<sub>2</sub> \
        (Nitrogen Dioxide) pollution across Southampton. These are passive air quality measurement devices\
        which are left in-situ for around a month to absorb NO<sub>2</sub> from the air, and then analysed in\
        a laboratory to assess how much NO<sub>2</sub> was absorbed over that period</p>\
        <p>Southampton City Council provides one measurement per month for each site, along with an annual\
        average. We are displaying this annual average on the map, coloured according to whether it is over the\
        40&micro;g/m<sup>3</sup> limit.</p>\
        <p>The measurements displayed are from 2017 as more recent data has not yet been released by Southampton\
        City Council.</p>\
        <p>Raw data and summary reports are available on the <a\
                href='https://www.southampton.gov.uk/environmental-issues/pollution/air-quality/monitoring/nitrogen-dioxide-diffusion-tubes.aspx'>Southampton City Council website</a>.</p>";

        const INFO_PCM_GENERIC = "<p>The Department for Environment, Food and Rural Affairs (Defra) uses models to predict\
        background air pollution levels for each 1km x 1km square of land across the UK. The predicted levels of\
        Nitrous Oxides (NOx) are shown here in &micro;g/m<sup>3</sup>, by clicking on a grid square you can also see\
        the predicted levels of other pollutants.</p>\
        <p>The models take into account a range of potential sources of air pollution including large and small sources\
        from the UK National Atmospheric Emissions Inventory, distant sources (such as pollution from the continent),\
        industrial sources, road traffic and other miscellaneous sources.</p>\
        Further details are available on the <a href='https://uk-air.defra.gov.uk/data/pcm-data'>Defra website</a>.";
        
        const INFO_PCM_2016 = "<h2>Defra PCM (NOx) (2016)</h2>" + INFO_PCM_GENERIC;

        const INFO_PCM_2017 = "<h2>Defra PCM (NOx) (2017)</h2>" + INFO_PCM_GENERIC + "<p>\
        <b>Note:</b> The predicted NOx levels for 2017 are significantly lower than those predicted for 2016.\
        This has not yet been fully explained by Defra, so data from both years are provided for comparison.</p>";

        const INFO_COMMUNITY_PERCEPTIONS = "<h2>Your concerns & ideas</h2>\
        <p>At various Breathing Spaces community meetings, participants were invited to make notes on a map of\
        the area, expressing their concerns about air quality and health, as well as their ideas for change, and\
        community assets. These have been transcribed and are available here; click on a marker to read the comment.</p>";

        function showInfoDialog(content) {
            map.openModal({content: content});
        }

        const WELCOME_DIALOG_TEXT = '<p>Welcome to the Air Quality Map for the <a href="https://breathingspaces.org.uk/">\
        Breathing Spaces</a> project.</p>\
        <p>Our aim is to present a range of air pollution data for Southampton, not only from monitoring \
        stations and mathematical models, but also from the community. How do you feel about air quality in \
        the city?</p>\
        <p>You can select which type of data you’d like to see by clicking the boxes in the legend. For more \
        details on a particular site, click on the markers on the map (such as <img src="legend/sensor_icon_darkblue.png" height=20px /> or <img class="legendicon" src="images/circle.svg"/>).\
        This will bring up graphs and links to further information.\
        If you’d like to find out more about different pollutants, sensors or community ideas, please click on the <img class="infobutton" src="images/questionbutton.svg"> icon.</p>\
        <p>This map is part of a community clean air project and we’re keen to hear how we can make it more useful \
        and informative. Please do send any comments or questions to <a href="mailto:breathe@socollective.org.uk">breathe@socollective.org.uk</a>.\
        We’d love to hear from you!'