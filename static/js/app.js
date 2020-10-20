
//horizontal bar graph
function bargraph(id_iput) {
  //read the data
  d3.json("samples.json").then((data_json) => {
    //get the data of ids, sample values hover text ->labels
    var samplesdata = data_json.samples;
    // filter the data to only get the information associated with the input id
    var id_data = samplesdata.filter(x => x.id == id_iput);
    //since it is an array get the first array of otu_ids
    var otu_ids = id_data[0].otu_ids;
    var otu_labels = id_data[0].otu_labels;
    var otu_values = id_data[0].sample_values;
    //format your id to add OTU in the beginning
    var yValues = otu_ids.slice(0, 10).map(x => "OTU" + x).reverse()
    //this where you select your x axis value, y axis value and type of graph
    var readData = {
      x: otu_values.slice(0, 10).reverse(),     //top 10 values
      y: yValues,     // formatted ids
      text: otu_labels.slice(0, 10).reverse(),     //labels
      type: "bar", //bar graphs
      orientation: "h" //horizontal graphs
    };
    var setLayout = {
      title: "Bacteria found"
    };
    var data = [readData];
    Plotly.newPlot("bar", data, setLayout);

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
