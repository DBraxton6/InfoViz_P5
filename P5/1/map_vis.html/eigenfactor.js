const config = { titleHeight: 45, titlePosition: [18, 28] },
  data = {},
  results = {};
var actors = {};

/* mutable */
var width,
  height,
  clicked = -1;

/*
 * Colors & CSS
 */
//we define the colors by popularity ranges
const colorCategory = [
  { name: "purple", hex: "#db2872" },
  { name: "green", hex: "#b5c92d" },
  { name: "blue", hex: "#3e9ad6" },
  { name: "orange", hex: "#e45c1e" }
].map(e => e.hex);

function svgcss() {
  return `
    svg {background: #f0f0f0; }

svg text, button {
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}
svg text::selection {
    background: none;
}

    text { font-family: Karla, sans-serif; font-weight: bold; }

    #maintitle rect, .maintitle rect { fill: none; }
    #maintitle text, .maintitle text { fill: #555; font-size: 1em; font-family: Karla, sans-serif; font-weight: bold;  }

    g.tooltip {}
    g.tooltip rect.background {fill: #000000; stroke: #333333; fill-opacity: 0.8}
    g.tooltip text.text {font-family: Karla, sans-serif; font-weight: bold; font-size: 12px;}
    g.tooltip text.text tspan.title {fill: #ffffff;}
    g.tooltip text.text tspan.detail {fill: #aaaaaa;}

`;
}
function svgshadowfilter() {
  return `
        <filter id="drop-shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#000000" flood-opacity="0.5">
          </feDropShadow>
        </filter>
`;
}

/*
 * Load and parse data
 */

var i = 0;
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
        actors[d.actor_1_name].id = i;
        i++;


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
        actors[d.actor_2_name].id = i;
        i++;



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
         actors[d.actor_3_name].id = i;
        i++;




      });

    });

//YEAR IS NOT IN OUR DATA SET
//const currentYear = `2005`;

// async function loadMapRawData() {
//   return await Promise.all([
//     d3.text(`data/science${currentYear}links.txt`),
    // d3.text(`data/science${currentYear}nodes.txt`),
    // d3.text(`data/science${currentYear}tree.txt`),
    // d3.json("data/mapgml.json")
//   ]);
// }
// async function loadRawData(year = currentYear) {
//   return await Promise.all([
//     d3.text(`data/science${year}links_mo.txt`),
//     d3.text(`data/science${year}nodes_mo.txt`),
//     d3.text(`data/science${year}tree_mo.txt`)
//   ]);
// }
// async function loadRawSankeyData(year = currentYear) {
//   return await Promise.all([
//     d3.text(`data/science${year}nodes_mo.txt`),
//     d3.text(`data/science${year}tree_mo.txt`)
//   ]);
// }



//TODO replace links, nodes, tree, nodemap with your shit
(async function() {
    //let _links, _nodes, _tree, _nodesmap;
    if (vis === "map") {
      //[_links, _nodes, _tree, _nodesmap] = await loadMapRawData();
      //data.nodesmap = _nodesmap;// FIND OUT WHATS IN NODEMAP todo
    }
    //returns e
    data.flowEdges = flowEdges();

    //data.
    data.ids = ids(actors);
    data.IDsByName = IDsByName(data.ids);
    //data.tree = tree( data.IDsByName);

  d3.select(window).on("resize", redraw);
  redraw();
});


var wait = 20;
function redraw() {
  width = window.innerWidth;
  height = Math.min(window.innerHeight, width);

  if (typeof buildchart !== "function") {
    console.log("Waiting for buildchart to load…", wait);
    if (wait-- > 0) setTimeout(redraw, 1000);
  } else {
    buildchart();
  }
}

/*
 * Parsing
 */
function flowEdges() {
  const l =
  actors
   // .dsvFormat("\t")
    //.parseRows(links)
    .forEach(d => ({
      source: d.name,
      target: d.costars,
      weight: +d.costars.length
    })
    );
  const maxEdgeWeight = l.reduce(
    (a, c) => ("weight" in c && c.weight > a ? c.weight : a),
    0
  );
  return l.map(e => {
    if ("weight" in e) {
      e.normalizedWeight =
        Math.log(1 + (e.weight / maxEdgeWeight) * 10) / Math.log(11);
    }
    return e;
  });
}

function ids(actors) {
  return
    actors.forEach(function(a){
      actors.map(e => {
      return {
        id: a.id,
        name: a.name
      };
    });
  });
}

function IDsByName(ids) {
  return ids.reduce((a, c) => {
    a.set(c.name, c.id);
    return a;
  }, new Map());
}

function tree( _idsByName) {
  const root = [{ path: "_", label: "root", value: 1 }];
  const tree =
    actors.forEach( function(d) {
      const cell = {
        path: d.costars.
        label:
      };
    })


  d3
    .dsvFormat("\t")
    .parseRows(_tree)
    .map(e => {
      const cell = {
        path: e[0],
        label: e[2]
      };
      if (e.length == 4) { //if more vars
        cell.longLabel = e[3];
        cell.eigenfactor = parseFloat(e[1]);
      } else {
        cell.parentEigenfactor = parseFloat(e[1]);
      }
      cell.id = _idsByName.get(cell.label)
        ? _idsByName.get(cell.label)
        : "p_" + cell.path.split(":").join(",");
      cell.parentPath = cell.path
        .split(":")
        .slice(0, -1)
        .join(":");
      if (cell.parentPath === "") cell.parentPath = "_";
      return cell;
    })
    .concat(root);
  const maxEigenfactor = tree.reduce(
    (a, c) => ("eigenfactor" in c && c.eigenfactor > a ? c.eigenfactor : a),
    0
  );
  return tree.map(e => {
    if ("eigenfactor" in e) {
      e.weight = e.eigenfactor / maxEigenfactor;
      e.logWeight = Math.log(1 + e.weight * 10) / Math.log(11);
    }
    return e;
  });
}

/*
 * Utilities
 */

function randomChoose (s, k) { // returns a random k element subset of s
  var a = [], i = -1, j;
  while (++i < k) {
    j = Math.floor(Math.random() * s.length);
    a.push(s.splice(j, 1)[0]);
  };
  return a;
}
// https://github.com/observablehq/notebook-stdlib/blob/master/src/dom/uid.js
DOM = (function() {
  var count = 0;
  function uid(name) {
    return new Id("O-" + (name == null ? "" : name + "-") + ++count);
  }
  function Id(id) {
    this.id = id;
    this.href = window.location.href + "#" + id;
  }
  Id.prototype.toString = function() {
    return "url(" + this.href + ")";
  };
  return { uid };
})();

/* Inspired by https://github.com/d3/d3-interpolate/blob/master/src/rgb.js */
function interpolateRgbFloor(a, b, t) {
  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }
  function constant(x) {
    return function() {
      return x;
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
  }
  function rgb(start, end) {
    var r = nogamma((start = d3.rgb(start)).r, (end = d3.rgb(end)).r),
      g = nogamma(start.g, end.g),
      b = nogamma(start.b, end.b),
      opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = Math.floor(r(t));
      start.g = Math.floor(g(t));
      start.b = Math.floor(b(t));
      start.opacity = opacity(t);
      return start + "";
    };
  }
  return rgb(a, b, t);
}

function getColorByIndexAndWeight({
  index,
  weight = 0,
  MIN_SAT = 0.3,
  MAX_SAT = 0.9,
  MIN_BRIGHTNESS = 0.85,
  MAX_BRIGHTNESS = 0.5
}) {
  const baseColor = colorCategory[index - 1];
  const hue = d3.hsl(baseColor).h;
  const w = Math.max(0, Math.min(1, weight));
  minColor = hue => d3.hsv(hue, MIN_SAT, MIN_BRIGHTNESS);
  maxColor = hue => d3.hsv(hue, MAX_SAT, MAX_BRIGHTNESS);
  /* We have to use a custom interpolation function to reproduce
   * the Flare RGB color interpolation, since they approximate the
   * RGB channels with the "floor" function, and d3 with the "round"
   * function. */
  const palette = interpolateRgbFloor(minColor(hue), maxColor(hue));
  return palette(w);
}

function tooltip(
  id,
  w,
  h,
  title,
  text1 = "",
  text2 = "",
  value1 = "",
  value2 = ""
) {
  const cursor = d3.mouse(d3.select("svg").node());
  d3.selectAll(".tooltip").remove();
  const tooltip = d3
    .select("g#tooltip")
    .append("g")
    .classed("tooltip", true)
    .attr("id", id);

  const rect = tooltip
    .append("rect")
    .classed("background", true)
    .attr("x", 0)
    .attr("y", 0)
    .style("filter", "url(#drop-shadow)");

// two key/values max rn
  const text = tooltip
    .append("text")
    .classed("text", true)
    .attr("x", 0)
    .attr("y", 0);

  function appendTspan(t, c, x, dy, text) {
    if (text !== "")
      t.append("tspan")
        .classed(c, true) //if labeled then open box
        .attr("x", x)
        .attr("dy", dy)
        .text(text);
  }

  appendTspan(text, "title", 5, "1em", title);
  appendTspan(text, "detail", 5, "1.2em", text1);
  appendTspan(text, "detail", "4.5em", 0, value1);
  appendTspan(text, "detail", 5, "1em", text2);
  appendTspan(text, "detail", "4.5em", 0, value2);

  /* Position */
  const bbox = text.node().getBBox();
  rect
    .attr("width", bbox.width + 10)
    .attr("height", bbox.height + 11)
    .attr("y", -4);

  /* Manage the bottom and right edges */
  let x = cursor[0];
  let y = cursor[1] + 26;
  if (x + bbox.width + 8 + 2 > w) x = x - bbox.width - 10;
  if (y + bbox.height + 26 + 2 > h) y = y - bbox.height - 10 - 26;
  tooltip.attr("transform", `translate(${x},${y})`);
}
