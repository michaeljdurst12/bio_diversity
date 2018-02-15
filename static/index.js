// Plotly.d3.csv("meta_data.csv", function (err, rows) {

//     var unpack = (rows, key) => rows.map((row) => row[key]);

//     var collectionEvent = unpack(rows, "Collection Event");
//     var ethnicity = unpack(rows, "Ethnicity");
//     var gender = unpack(rows, "Gender (male/female");
//     var age = unpack(rows, "Age (in years");
//     var washingFrequency = unpack(rows, "Washing Frequency (belly button scrubs per week)");
//     var type = unpack(rows, "Innie or Outie?")
//     var location = unpack(rows, "City and State in which participant lived at time of sampling")

//     function init() {
//         var data = [{
//             values: ['gender'],
//             labels: ["gender"],
//             type: "pie"
//         }];

//         var layout = {
//             height: 600,
//             width: 800
//         };

//         Plotly.plot("pie", data, layout);
        
// init();

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
}
