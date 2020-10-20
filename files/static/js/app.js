//horizontal bar graph
function bargraph(id_input) {
  //read the data
  d3.json("samples.json").then((data_json) => {
    //get the data of ids, sample values hover text ->labels
    var dataSamples = data_json.samples;
    // filter the data to only get the information associated with the input id
    var dataId = dataSamples.filter(x => x.id == id_input);
    //since it is an array get the first array of otu_ids
    var otu_ids = dataId[0].otu_ids;
    var otu_labels = dataId[0].otu_labels;
    var otu_values = dataId[0].sample_values;
    //format id to add OTU 
    var yValues = otu_ids.slice(0, 10).map(x => "OTU" + x).reverse()
    //create traces and layout
    var dataTrace = {
      
      //top 10 values
      x: otu_values.slice(0, 10).reverse(),     
      y: yValues,    
      text: otu_labels.slice(0, 10).reverse(),     
      type: "bar", 
      orientation: "h" //horizontal graphs
    };
    var layout = {
      title: "Bacteria found"
    };
    var data = [dataTrace];
    Plotly.newPlot("bar", data, layout);

    var bubbleData = {
      x: otu_ids,
      y: otu_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: otu_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }

    var bubbleLayout = {
      title: "Bacteria cultures per sample",
      margin: {
        t: 30
      },
      hovermode: "closest",
      xaxis: {
        title: "OTU Id"
      }
    }
    Plotly.newPlot("bubble", [bubbleData], bubbleLayout)


  });
};

//drop down menu
function defaultfunction() {
  //this populates the dropdown for users to choose
  d3.json("samples.json").then((data) => {
    var names = data.names;
    names.forEach((name) => {
      d3.select("#selDataset").append("option").text(name).property("value", name);
    });
    //select one by default
    bargraph(data.names[0]);
  });
};

// function to change the visualisations based on the selected id
function optionChanged(userInput) {
  bargraph(userInput);
  // select div with panel body
  var panelBody = d3.select(".panel-body");
  //clear panel body after change of input
  panelBody.html("");
  demoInfo(userInput);
};
//this is the default function one initialises that chooses a default option of the dropdown menu so graphs will always be shown
defaultfunction();



function demoInfo(idInput) {  
  //read the data  
  d3.json("samples.json").then((data_json) => {    
  //get the data of ids, sample values hover text ->labels
      var metadata = data_json.metadata;
      // filter the data to only get the information associated with the input id
      var dataId = metadata.filter(x => x.id == idInput);
      var ResultId = dataId[0];
      htmlEntry = d3.select("#sample-metadata");
      Object.entries(ResultId).forEach(([key, value]) => {
        htmlEntry.append("p").text(`${key}:${value}`)    });
    });
  };



  //drop down menu
function defaultfunction() {
  //this populates the dropdown for users to choose
  d3.json("samples.json").then((data) => {
    var names = data.names;
    names.forEach((name) => {
      d3.select("#selDataset").append("option").text(name).property("value", name);    });
    //select one by default
    bargraph(data.names[0]);
    demoInfo(data.names[0]);
    
  });
};
 


