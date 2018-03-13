d3.json("/names", function(error, response){

    if (error) return console.warn(error);

   var $dropDown = document.getElementById("selDataset")

   for (i=0; i< response.length; i++){
       var $optionChoice = document.createElement("option")
       $optionChoice.innerHTML = response[i]
       $optionChoice.setAttribute("value", response[i])
       $dropDown.appendChild($optionChoice)
   }
});

function getData(chosenSample){
    console.log(chosenSample)
    d3.json("/sample/" + chosenSample, function (error, response) {
        if (error) return console.warn(error);

        d3.json("/otu", function (error, names) {

            var bacteria = []
            for (var i = 0; i < response.otu_id.length; i++) {
                var namesIndex = response.otu_id[i] - 1
                bacteria.push(names[namesIndex])

            }

        var ids = response.otu_id.slice(0, 10)
        var values = response.sample_values.slice(0, 10)
        console.log(ids)
        console.log(values)

        Plotly.restyle('pie', "values", [values]);
        Plotly.restyle('pie', "labels", [ids]);
        Plotly.restyle('scatter', "x", [response.otu_id]);
        Plotly.restyle('scatter', "y", [response.sample_values]);
        Plotly.restyle('scatter', "marker.size", [response.sample_values]);
        Plotly.restyle('pie', 'hovertext', [bacteria.slice(0,10)]);
        Plotly.restyle('scatter', 'text', [bacteria]);



        })


    }) 


    
}
var orginalSample = "BB_940"
function init(chosenSample){

    d3.json("/sample/" + chosenSample, function(error, response){
        if (error) return console.warn(error);

        d3.json("/otu", function (error, names){

            var bacteria = []
            for (var i = 0; i<response.otu_id.length; i++){
                var namesIndex = response.otu_id[i] - 1
                bacteria.push(names[namesIndex])

            }
    
                var ids = response.otu_id.slice(0, 10)
                var values = response.sample_values.slice(0, 10)

                var data = [{
                    values: values,
                    labels: ids,
                    type: 'pie',
                    hovertext: bacteria.slice(0,10)
                }];

                var layout = {
                    height: 400,
                    width: 500
                };

                Plotly.newPlot('pie', data, layout);


                var trace = [{
                    x: response.otu_id,
                    y: response.sample_values,
                    mode: 'markers',
                    type: 'scatter',
                    marker: {size: response.sample_values, colorscale:'Earth', color:response.otu_id},
                    text: bacteria

                }];

                Plotly.newPlot('scatter', trace);

            })

    
    }) 

    
}

init(orginalSample)


