const svgcssmap = `
g.journal text { opacity: 0; font-size: 10px; transition: opacity 0.3s; pointer-events: none; }
g.journal.labeled text { opacity: 1; }
g.journal.gray circle { fill: #cccccc; r: 2; }
#lens {
  fill: white;
  stroke: #666;
  stroke-width: 1px;
}
g.journal:not(.gray) circle:hover { fill: #444444; }
g.journal.gray text { display: none; }
g.journal.clicked circle { fill: #222222; }
#inout path { mix-blend-mode: multiply; }
`;

const lens = {
  radius: 50,
  scale: 5
};

config.titleHeight = 35;

/*
 * Build the chart
 */
function buildchart() {
  //new list == all names of actors TODO
  results.journalsLookup = {};
  //add id to list above
    //data.ids.forEach(d => (results.journalsLookup[d.id] = d));
  actors.forEach(d => (results.journalsLookup[d.id] = d));

  const svg = d3
    .select("svg")
    .attr("width", width)
    .attr("height", height + config.titleHeight)
    .html(
      `
      <defs>
        <style type="text/css">${svgcss()}${svgcssmap}</style>
        ${svgshadowfilter()}
      </defs>
      `
    );

  //map outline
  svg
    .append("rect")
    .attr("id", "main")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#f0f0f0");

  //map
  const vis = svg
    .append("g")
    .attr("id", "vis")
    .attr("transform", `translate(0, ${config.titleHeight})`);
  //magifying glass
  vis.append("circle").attr("id", "lens");

  //lines between the circles
  vis.append("g").attr("id", "inout");

  //circles - classes: journal labelled, journal
  vis.append("g").attr("id", "leaves");

  //This is the actor's name as it'll appear on the corner when clicked
  svg.append("g").attr("id", "maintitle");

  //what the curose will do
  svg.append("g").attr("id", "tooltip");

  //hover and click?
  function handleMouseOver(d, i) {
    //if hovering
    if (clicked === -1 || d.id === clicked)
      tooltip(
        "t-" + i,
        width,
        height,
        //actor name TODO
        d.name,
        //FB likes TODO
        "Number of Movies: " + d.movies,
        "Number of FB Likes: " + d.likes
      );
    else { //if clicked TODO
      // the IN: and OUT: parts.... ***change to "movies shared" and "movies total"
      const inArray = data.flowEdges.filter(
        e => e.source === d.id && e.target === clicked
      );
      const outArray = data.flowEdges.filter(
        e => e.source === clicked && e.target === d.id
      );

      //currently math...
      let weightIn = inArray.length === 1 ? inArray[0].normalizedWeight : 0,
        weightOut = outArray.length === 1 ? outArray[0].normalizedWeight : 0;

      if (!weightIn && !weightOut)
        tooltip("t-" + i, width, height, d.longLabel);

      //TODO movies shared
      tooltip(
        "t-" + i,
        width,
        height,
        //this means name no more short v. long labels
        d.longLabel,
        "Movies Shared:",
        //maybe NOT show movies total b/c hw will we go into that actor's info??
        "Movies Total:",
        cutAfter(weightIn, 6),
        cutAfter(weightOut, 6)
      );
    }
  }

  function handleMouseOut(d, i) {
    d3.select("g#tooltip #t-" + i).remove();
  }

  /*
    n.x = n.props.x = 1.5 * (bounds.width) * (n.props.origx) - .5 * bounds.width
    n.y = n.props.y = 1.5 * (bounds.height) * (n.props.origy) - .5 * bounds.height ;
  */
  // let posx =
  //   randomChoose(-width/2, width )
  //  d3
  //   .scaleLinear()
    

  //   .range([-width / 2, width]);
  //   .domain(d3.extent(data.nodesmap, d => d.x))

  // let posy = d3
  //   .scaleLinear()
  //   .domain(d3.extent(data.nodesmap, d => d.y))
  //   .range([-height / 2, height]);

  //TODO
  results.nodesmap = {};
  //every actor's placement - just change val names here
  data.nodesmap.forEach(d => (results.nodesmap[d.id] = [posx(d.x), posy(d.y)]));
  //only grab eigenfactor (which will be num of movies in)
  results.leaves = actors; //.forEach(function(d){ return d.movies;}); //data.tree.filter(d => "eigenfactor" in d);

  results.sectorById = new Map();
  results.leaves.forEach(d => {
    results.sectorById[d.id] = d.costars.length;
  });

  const leaf = d3
    .select("g#vis g#leaves")
    .selectAll("g")
    .data(results.leaves)
    .enter()
    .append("g")
    .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
    //addded journal clss
    .classed("journal", true)
    .attr("transform", d => `translate(${results.nodesmap[d.id]})`)
    .on("mousemove", handleMouseOver)
    .on("mouseout", handleMouseOut);

  const r = 6;

  //actual leaf circle
  leaf
    .append("circle")
    //size of circle TODO - change weight to numofmovies
    .attr("r", d => r * (d.movies ? 0.33 + 3 * d.movies : 0.2)) //if weight exists, mult ELSE make it 0.2
    .attr("fill", d => {
      const v = d.movies;
      //TODO find out wtf .depth is
      //while (d.depth > 1) d = d.parent;
      return getColorByIndexAndWeight({
        index: results.sectorById[d.id],
        weight: v
      });
    });

  leaf
    .append("text")
    //.attr("clip-path", d => d.clipUid)
    .attr("x", d => 4 + r * (d.movies ? 0.33 + 3 * d.movies : 0.2))
    .attr("y", 2)
    .style(
      "fill-opacity",
      d => (d.movies ? Math.sqrt(d.movies) * 0.7 + 0.2 : 0)
    )
    //TODO change to "name"
    .text(d => d.name);

  lens.x = width * 0.5;
  lens.y = height * 0.33;

  updatePositions();

  return add_interaction(svg.node());
}

/*
 * Interactions
 */
function updatePositions(transition) {
  lens.radius = 50; //Math.sqrt(2.5 * width); // responsive, =50 in the original

  const scaledRadius = lens.radius * lens.scale;
  d3.select("svg #lens")
    .attr("r", scaledRadius)
    .attr("transform", `translate(${[lens.x, lens.y]})`);

  //TODO change .journal
  let change = d3.select("#leaves").selectAll(".journal");
  if (transition) change = change.transition().duration(200);

  change.attr("transform", (d, i, e) => { //lol
    let pos = results.nodesmap[d.id].slice();

    let diffX = pos[0] - lens.x,
      diffY = pos[1] - lens.y,
      dist = Math.sqrt(diffX ** 2 + diffY ** 2),
      diffUniX = diffX / dist,
      diffUniY = diffY / dist,
      targetX,
      targetY;
    if (dist < lens.radius) {
      targetX = lens.x + lens.scale * diffX;
      targetY = lens.y + lens.scale * diffY;
    } else {
      targetX = lens.x + diffUniX * (scaledRadius + dist - lens.radius);
      targetY = lens.y + diffUniY * (scaledRadius + dist - lens.radius);
    }
    pos[0] += (targetX - pos[0]) * 0.8;
    pos[1] += (targetY - pos[1]) * 0.8;
    //TODO JUST CHECK THIS
    results.nodesmap[d.name].x0 = d.x0 = pos[0] =
      lens.x + zoom * (pos[0] - lens.x);
    results.nodesmap[d.name].y0 = d.y0 = pos[1] =
      lens.y + zoom * (pos[1] - lens.y);
    //if in the lens or out
    if (dist < lens.radius) {
      d3.select(e[i]).classed("labeled", true);
    } else {
      d3.select(e[i]).classed("labeled", false);
    }
    return `translate(${pos})`;
  });

  //Making the connections/lines!!!
  d3.select("#inout")
    .selectAll("path")
    .attr(
      "d",
      d =>
        //cirle clicked
        "M" +
        [results.nodesmap[d.target].x0, results.nodesmap[d.target].y0] +
        //circle directly affected
        "L" +
        [results.nodesmap[d.source].x0, results.nodesmap[d.source].y0]
    );
}

function zoomSlightly() {
  if (zoom <= 1) {
    zoom = 1.2;
    updatePositions(/*transition*/ true);
  }
}
var zoom = 1;
function add_interaction(chart) {
  const svg = d3.select(chart);

  /* drag the lens */
  const drag = d3.drag();
  drag
    .on("start", function() {
      lens.x0 = lens.x - d3.event.x;
      lens.y0 = lens.y - d3.event.y;
    })
    .on("drag", function() {
      lens.x = lens.x0 + d3.event.x;
      lens.y = lens.y0 + d3.event.y;
      updatePositions();
    });

  zoom = 1;
  svg.on("touch mousedown", zoomSlightly).call(drag);

  /* click on a journal */
  //TODO checkthis
  svg.selectAll(".journal circle").on("click", click);
  svg.on("click", click);

  const title = d3.select("g#maintitle");
  title.append("rect").attr("height", config.titleHeight);
  title
    .append("text")
    .attr("letter-spacing", ".05em")
    .attr("transform", `translate(${config.titlePosition})`);

  return chart;
}

function click(d) {
  d3.event.stopPropagation();
  if (d === undefined || d.id === clicked) {
    clicked = -1;
  } else {
    clicked = d.id;
  }
  inout();
}

function setTitle(title) {
  const text = d3.select("svg g#maintitle text");
  text.text(title);
  const w = text.node().getBBox().width;
  d3.select("svg g#maintitle rect").attr("width", !w ? 0 : w + 2 * 9);
}

//set of paths (or lines) to make
function inout() {
  //find the actor that's clicked (journal == actor)
  d3.selectAll(".journal").classed("clicked", d => d.id === clicked);

  //if you're not the clicked actor, don't have a line
  if (clicked === -1) {
    d3.select("#inout")
      .transition()
      .style("opacity", 0);
    setTitle("");
    return;
  }
  //the clicked actor get the title in the corner
  const main = results.journalsLookup[clicked];
  setTitle(main.longName);

  //TODO wtf is this
  const links_out = data.flowEdges.filter(d => d.target === clicked);

  d3.select("#inout")
    .transition()
    .style("opacity", 1);

  //be gray if you are not clicked AND your "links_out" of you knowing the clicked actor is 0
  d3.selectAll(".journal").classed(
    "gray",
    d =>
    //TODO e is saying find out if one of your costars is the clicked actor and check the movies shared
    //if its 0 AND you're in the lens, be gray
    //SO make e == (e.costar == d.id).length
      d.id !== clicked && links_out.filter(e => e.source === d.id).length === 0
  );

  let links = d3
    .select("#inout")
    .selectAll("path")
    .data(links_out, d => d.source + "-" + d.target);
  links
    .enter()
    .append("path")
    .style("stroke", d => {
      //TODO this determines line color and width - we need line wid to be 
      return getColorByIndexAndWeight({
        index: results.sectorById[d.source],
        weight: d.normalizedWeight
      });
    })
    .style("stroke-width", 0)
    .style("stroke-opacity", d => d.normalizedWeight + 0.05)
    .transition()
    .style("stroke-width", d => d.normalizedWeight * 10 + "px");

  links
    .exit()
    .transition()
    .style("stroke-width", 0)
    .remove();

  updatePositions();
}

/*
 * Build the treemap
 */
function hierarchy(tree) {
  return d3
    .stratify()
    .id(function(d) {
      return d.path;
    })
    .parentId(function(d) {
      return d.parentPath;
    })(tree);
}

function treemap(data) {
  return d3
    .treemap()
    .tile(d3.treemapSquarify.ratio(1))
    .size([width, height])
    .padding(0)
    .round(false)(
    hierarchy(data)
      .sum(d => d.eigenfactor)
      .sort((a, b) => b.value - a.value)
  );
}
