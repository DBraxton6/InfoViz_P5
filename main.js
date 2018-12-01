var actors = {};
var i = 0;

// Create a svg canvas
var svg = d3.select("#drawArea")
  .append("svg")
  .attr("width", 700)
  .attr("height", 500);


  d3.csv("movies.csv", function(data) {
    //check csv 3 times to get all actors
    data.forEach(function(d) {

      if(actors[d.actor_1_name]) {
        actors[d.actor_1_name].movies++;
        // if (actors[d.actor_1_name].costars[d.actor_3_name]){

        // }
        actors[d.actor_1_name].costars[d.actor_3_name] = (actors[d.actor_1_name].costars[d.actor_3_name]) ? actors[d.actor_1_name].costars[d.actor_3_name]+1 : 1;
        actors[d.actor_1_name].costars[d.actor_2_name] = (actors[d.actor_1_name].costars[d.actor_2_name]) ? actors[d.actor_1_name].costars[d.actor_2_name]+1 : 1;
      } else {
        actors[d.actor_1_name] = {
        name: d.actor_1_name,
        likes: d.actor_1_facebook_likes,
        movies: 1,
        costars: {}
      };

      actors[d.actor_1_name].costars[d.actor_3_name] = (actors[d.actor_1_name].costars[d.actor_3_name]) = 1;
      actors[d.actor_1_name].costars[d.actor_2_name] = (actors[d.actor_1_name].costars[d.actor_2_name]) = 1;
      
      }
      


      if(actors[d.actor_2_name]) {
        actors[d.actor_2_name].movies++;
        actors[d.actor_2_name].costars[d.actor_3_name] = (actors[d.actor_2_name].costars[d.actor_3_name]) ? actors[d.actor_2_name].costars[d.actor_3_name]+1 : 1;
        actors[d.actor_2_name].costars[d.actor_1_name] = (actors[d.actor_2_name].costars[d.actor_1_name]) ? actors[d.actor_2_name].costars[d.actor_1_name]+1 : 1;
      } else {
        actors[d.actor_2_name] = {
        name: d.actor_2_name,
        likes: d.actor_2_facebook_likes,
        movies: 1,
        costars: {}
      };

        actors[d.actor_2_name].costars[d.actor_3_name] = (actors[d.actor_2_name].costars[d.actor_3_name]) = 1;
        actors[d.actor_2_name].costars[d.actor_1_name] = (actors[d.actor_2_name].costars[d.actor_1_name]) = 1;
      
      
    }



      if(actors[d.actor_3_name]){
        actors[d.actor_3_name].costars[d.actor_2_name] = (actors[d.actor_3_name].costars[d.actor_2_name]) ? actors[d.actor_3_name].costars[d.actor_2_name]+1 : 1;
        actors[d.actor_3_name].costars[d.actor_1_name] = (actors[d.actor_3_name].costars[d.actor_1_name]) ? actors[d.actor_3_name].costars[d.actor_1_name]+1 : 1;
       } else { //make a new var
        actors[d.actor_3_name] = {
        name: d.actor_3_name,
        likes: d.actor_3_facebook_likes,
        movies: 1,
        costars: {}
        };

        actors[d.actor_3_name].costars[d.actor_2_name] = (actors[d.actor_3_name].costars[d.actor_2_name]) = 1;
        actors[d.actor_3_name].costars[d.actor_1_name] = (actors[d.actor_3_name].costars[d.actor_1_name]) = 1;
       
       
    }

   
    });

  }); 
var me = 0;
  var pos = d3.json('nodesmap.json');
  var keys = {};

 for (var key in actors) {
    if (actors.hasOwnProperty(key)) {
        keys[me] = actors[keys];
    me++;
    }
}


Object.keys(actors).forEach(function(key) {
    
});

console.log(keys);



//Drag nodes
var drag = d3.behavior.drag()
  .on("dragstart", function() {
    d3.event.sourceEvent.stopPropagation()
  })
  .on("drag", dragmove);

var line = svg.append("line")
  .style("stroke", "black")
  .attr("x1", 150)
  .attr("y1", 100)
  .attr("x2", 250)
  .attr("y2", 300);

//First node
var g1 = svg.append("g")
.attr("transform", "translate(" + 150 + "," + 100 + ")")
  .attr("class", "first")
  .call(drag)
  .append("circle").attr({
    r: 20,
  })
  .style("fill", "#F00")

//Second node
var g2 = svg.append("g")
  .attr("transform", "translate(" + 250 + "," + 300 + ")")
  .attr("class", "second")
  .call(drag)
  .append("circle").attr({
    r: 20,
  })
  .style("fill", "#00F")

//Drag handler
function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
  if(d3.select(this).attr("class") == "first") {
    line.attr("x1", x);
    line.attr("y1", y);
  } else {
    line.attr("x2", x);
    line.attr("y2", y);
  }
}