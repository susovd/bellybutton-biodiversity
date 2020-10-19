//horizontal bar graph
function bargraph(userInput) {
  //read the data
  d3.json("samples.json").then((data_json) => {
    //get the data of ids, sample values hover text ->labels
    var sampleinfo = data_json.samples;
    // filter the data to only get the information associated with the input id
    var DataId = sampleinfo.filter(x => x.id == userInput);
    // get the first array of otu_ids
    var otu_ids = DataId[0].otu_ids;
    var otu_labels = DataId[0].otu_labels;
    var otu_values = DataId[0].sample_values;
    //format id to add OTU in the beginning
    var yValues = otu_ids.slice(0, 10).map(x => "OTU" + x).reverse()
    //create traces and layout for graph
    var barData = {
      //top 10 values
      x: otu_values.slice(0, 10).reverse(),     
      // formatted ids
      y: yValues,
      //labels     
      text: otu_labels.slice(0, 10).reverse(),     
      //bar graphs
      type: "bar",
      //horizontal graphs 
      orientation: "h" 
    };
    var Layout = {
      title: "Bacteria found"
    };
    var data = [barData];
    Plotly.newPlot("bar", data, Layout);

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


