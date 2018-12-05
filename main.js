  // SPACE
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  // TITLE
    svg.append("text")
    .attr("x", 1100)
    .attr("y", 0 )
    .attr("dy", "3.5em" )
    .attr("text-anchor", "start")
    .style("font-size", "28px")
    .style("font-weight", "bold")
    .style("font-family","Montserrat")
    .text("Actors and Their Co-Stars")

    ///LENS///////////////
    const lens = {
    radius: 150,
    scale: 5
    };

    svg.append("circle").attr("id", "lens");
    lens.x = 1000 * 0.5;
    lens.y = 1000 * 0.33;
    updatePositions();

  // PLACEMENT OF ALL ACTORS//////////////////////////
var data = {};
var posX = [903, 972, 681, 216, 1000, 740, 248, 288, 226, 787, 491, 394, 698, 508, 109, 277, 469, 246, 664, 582, 666, 498, 275, 113, 328, 694, 112, 750, 512, 588, 415, 500, 674, 4, 151, 19, 912, 734, 804, 453, 613, 892, 870, 833, 893, 65, 978, 285, 9, 627, 361, 11, 263, 457, 642, 144, 244, 254, 376, 761, 518, 686, 961, 352, 489, 737, 631, 129, 31, 529, 237, 377, 355, 266, 211, 986, 723, 586, 966, 617, 259, 621, 478, 758, 999, 820, 221, 423, 540, 902, 490, 429, 405, 741, 210, 400, 185, 913, 603, 386, 247, 906, 958, 769, 399, 639, 513, 524, 305, 291, 294, 571, 53, 486, 555, 86, 110, 430, 894, 868, 432, 638, 676, 650, 584, 214, 780, 281, 383, 897, 331, 350, 827, 822, 625, 269, 657, 22, 323, 690, 477, 969, 479, 634, 338, 241, 783, 59, 527, 101, 954, 696, 616, 287, 842, 985, 658, 807, 412, 995, 933, 70, 577, 752, 8, 89, 128, 667, 881, 227, 470, 742, 18, 495, 79, 511, 10, 25, 93, 69, 57, 299, 869, 496, 598, 724, 295, 888, 64, 166, 528, 876, 35, 80, 396, 134, 167, 955, 146, 569, 751, 7, 593, 393, 442, 851, 713, 71, 485, 859, 279, 879, 895, 201, 547, 853, 233, 78, 861, 997, 837, 844, 143, 521, 695, 449, 141, 549, 250, 127, 190, 106, 809, 648, 204, 125, 813, 987, 580, 272, 980, 668, 157, 917, 553, 225, 420, 840, 160, 898, 164, 949, 332, 444, 745, 348, 261, 935, 904, 928, 170, 836, 482, 746, 702, 652, 419, 919, 834, 156, 531, 990, 731, 551, 946, 414, 739, 260, 262, 519, 951, 772, 716, 708, 116, 503, 402, 105, 245, 356, 219, 391, 797, 703, 390, 863, 880, 626, 493, 427, 973, 271, 556, 620, 590, 307, 812, 691, 871, 90, 534, 213, 224, 948, 384, 315, 131, 468, 526, 452, 416, 298, 552, 212, 117, 587, 334, 756, 661, 575, 303, 398, 875, 984, 88, 149, 828, 773, 533, 497, 389, 725, 532, 964, 545, 354, 515, 480, 81, 27, 202, 5, 727, 458, 641, 439, 73, 47, 535, 340, 611, 721, 182, 180, 856, 605, 83, 49, 407, 153, 456, 177, 835, 215, 637, 947, 810, 460, 417, 336, 801, 965, 568, 865, 218, 32, 609, 749, 404, 91, 448, 700, 46, 550, 854, 915, 800, 825, 914, 95, 925, 563, 492, 766, 370, 345, 916, 558, 372, 775, 506, 20, 467, 217, 671, 186, 960, 581, 324, 52, 45, 152, 360, 203, 410, 61, 135, 570, 907, 38, 344, 192, 890, 768, 197, 623, 209, 604, 67, 507, 276, 438, 108, 461, 785, 771, 51, 48, 133, 600, 267, 722, 502, 922, 677, 930, 896, 606, 56, 382, 316, 501, 68, 54, 706, 378, 463, 651, 649, 66, 278, 630, 459, 806, 770, 943, 437, 44, 754, 619, 561, 991, 282, 653, 537, 37, 369, 719, 327, 753, 675, 747, 87, 98, 901, 433, 956, 597, 940, 939, 84, 280, 184, 341, 199, 159, 589, 242, 325, 362, 147, 832, 445, 788, 937, 855, 313, 130, 306, 824, 860, 717, 921, 794, 886, 312, 258, 231, 884, 908, 335, 200, 235, 730, 607, 680, 692, 821, 900, 28, 333, 911, 139, 781, 576, 29, 975, 565, 220, 688, 720, 988, 434, 566, 318, 647, 945, 174, 173, 624, 94, 148, 992, 136, 738, 487, 40, 290, 310, 75, 682, 622, 595, 230, 874, 41, 931, 26, 191, 484, 169, 292, 927, 171, 654, 847, 663, 887, 857, 122, 161, 564, 530, 873, 365, 175, 591, 618, 358, 168];
var posY = [789, 636, 656, 121, 229, 429, 649, 107, 650, 795, 247, 151, 507, 668, 528, 559, 695, 776, 79, 136, 68, 753, 206, 417, 585, 522, 717, 7, 549, 30, 495, 732, 325, 240, 215, 228, 181, 772, 15, 40, 399, 804, 226, 308, 362, 560, 723, 411, 680, 594, 338, 783, 696, 212, 246, 614, 91, 586, 681, 66, 607, 180, 500, 195, 347, 460, 526, 724, 761, 89, 330, 802, 186, 484, 768, 158, 290, 1, 178, 536, 700, 57, 132, 534, 541, 502, 679, 454, 714, 728, 156, 564, 191, 127, 716, 305, 35, 676, 58, 292, 255, 45, 659, 263, 367, 344, 562, 135, 137, 123, 400, 52, 591, 515, 118, 684, 350, 124, 639, 254, 409, 184, 551, 555, 583, 504, 37, 633, 788, 268, 482, 821, 743, 435, 3, 410, 513, 391, 466, 71, 705, 793, 631, 464, 306, 597, 317, 476, 218, 781, 467, 388, 422, 404, 13, 361, 752, 209, 110, 277, 113, 394, 309, 363, 461, 763, 32, 643, 430, 626, 829, 64, 104, 352, 535, 756, 604, 101, 824, 707, 608, 602, 408, 142, 207, 341, 433, 167, 33, 313, 380, 770, 227, 622, 525, 448, 250, 115, 603, 733, 667, 471, 634, 485, 204, 243, 153, 220, 23, 570, 61, 828, 547, 465, 5, 298, 790, 819, 8, 281, 822, 271, 44, 288, 214, 48, 266, 566, 450, 139, 295, 386, 334, 698, 725, 87, 177, 373, 590, 130, 165, 582, 412, 669, 275, 709, 598, 108, 141, 686, 524, 174, 830, 160, 19, 202, 80, 378, 651, 444, 219, 18, 403, 221, 773, 701, 771, 169, 201, 117, 25, 100, 683, 387, 303, 620, 183, 103, 343, 734, 721, 758, 285, 530, 314, 145, 90, 567, 272, 300, 609, 641, 257, 370, 366, 449, 759, 223, 678, 232, 319, 196, 428, 637, 321, 556, 623, 491, 280, 406, 452, 775, 282, 438, 632, 625, 553, 785, 508, 170, 59, 774, 213, 791, 550, 304, 744, 478, 55, 420, 624, 375, 318, 154, 453, 239, 473, 509, 149, 533, 731, 42, 818, 326, 173, 384, 660, 241, 31, 119, 745, 499, 642, 655, 419, 270, 803, 552, 307, 84, 230, 777, 546, 665, 529, 224, 349, 640, 381, 51, 416, 418, 581, 627, 179, 479, 613, 208, 235, 112, 284, 751, 60, 148, 133, 574, 654, 6, 54, 538, 62, 737, 279, 293, 365, 459, 436, 336, 749, 431, 152, 65, 197, 423, 787, 729, 286, 421, 258, 486, 735, 327, 261, 301, 122, 324, 53, 796, 727, 689, 496, 97, 568, 4, 765, 278, 138, 722, 78, 799, 462, 358, 77, 390, 348, 356, 708, 825, 291, 405, 629, 332, 493, 647, 150, 755, 807, 340, 575, 102, 287, 217, 544, 472, 120, 690, 610, 99, 779, 322, 164, 41, 480, 814, 283, 703, 699, 323, 618, 143, 635, 222, 809, 389, 446, 425, 786, 427, 630, 736, 702, 726, 738, 401, 611, 532, 469, 601, 273, 596, 674, 488, 70, 543, 481, 572, 506, 563, 612, 514, 432, 798, 38, 713, 315, 653, 691, 769, 766, 817, 782, 600, 155, 193, 383, 443, 548, 24, 815, 351, 424, 511, 312, 577, 234, 558, 816, 182, 621, 521, 14, 510, 784, 269, 780, 663, 503, 619, 267, 587, 85, 531, 131, 210, 9, 189, 260, 606, 11, 28, 592, 434, 96, 489, 252, 116, 710, 687, 451, 211, 599, 767, 86, 580, 168, 237, 475, 368, 22, 140, 754, 492, 76, 520, 21, 329, 764, 74, 331, 93, 578, 739, 414, 161, 810, 670, 238, 289, 82, 747, 377, 715, 346, 157, 762, 800, 398, 328, 565, 697];

const actors = {};
var keys = [];

  //PARSING ACTORS////////////////
  var i = 0;
  var count = 0;
    d3.csv("movies.csv", function(data) {

      //check csv 3 times to get all actors
      data.forEach(function(d) {
        if(d.title_year == 2011){

        if(actors[d.actor_1_name] != null) {
          actors[d.actor_1_name].movies += 1;
          actors[d.actor_1_name].costarNames.push(d.actor_2_name, d.actor_3_name);
          actors[d.actor_1_name].costars[d.actor_3_name] = (actors[d.actor_1_name].costars[d.actor_3_name]) ? actors[d.actor_1_name].costars[d.actor_3_name]+1 : 1;
          actors[d.actor_1_name].costars[d.actor_2_name] = (actors[d.actor_1_name].costars[d.actor_2_name]) ? actors[d.actor_1_name].costars[d.actor_2_name]+1 : 1;
        } else {
          count++;
          actors[d.actor_1_name] = {
          name: d.actor_1_name,
          likes: d.actor_1_facebook_likes,
          movies: 1,
          costars: {},
          x: posX[i],
          y: posY[i],
          costarNames: [d.actor_3_name, d.actor_2_name]
        };
        actors[d.actor_1_name].costars[d.actor_3_name] = (actors[d.actor_1_name].costars[d.actor_3_name]) = 1;
        actors[d.actor_1_name].costars[d.actor_2_name] = (actors[d.actor_1_name].costars[d.actor_2_name]) = 1;
        actors[d.actor_1_name].id = i;
        keys[i] = d.actor_1_name;
        i++;
        }

        if(actors[d.actor_2_name]!= null) {
          actors[d.actor_2_name].movies += 1;
          actors[d.actor_2_name].costarNames.push(d.actor_3_name, d.actor_1_name);
          actors[d.actor_2_name].costars[d.actor_3_name] = (actors[d.actor_2_name].costars[d.actor_3_name]) ? actors[d.actor_2_name].costars[d.actor_3_name]+1 : 1;
          actors[d.actor_2_name].costars[d.actor_1_name] = (actors[d.actor_2_name].costars[d.actor_1_name]) ? actors[d.actor_2_name].costars[d.actor_1_name]+1 : 1;
        } else {
          count++;
          actors[d.actor_2_name] = {
          name: d.actor_2_name,
          likes: d.actor_2_facebook_likes,
          movies: 1,
          x: posX[i],
          y: posY[i],
          costars: {},
          costarNames: [d.actor_1_name, d.actor_3_name]
        };
          actors[d.actor_2_name].costars[d.actor_3_name] = (actors[d.actor_2_name].costars[d.actor_3_name]) = 1;
          actors[d.actor_2_name].costars[d.actor_1_name] = (actors[d.actor_2_name].costars[d.actor_1_name]) = 1;
        actors[d.actor_2_name].id = i;
        keys[i] = d.actor_3_name;
        i++;
        }

        if(actors[d.actor_3_name] != null){
          actors[d.actor_3_name].movies += 1;
          actors[d.actor_3_name].costarNames.push(d.actor_2_name, d.actor_1_name);
          actors[d.actor_3_name].costars[d.actor_2_name] = (actors[d.actor_3_name].costars[d.actor_2_name]) ? actors[d.actor_3_name].costars[d.actor_2_name]+1 : 1;
          actors[d.actor_3_name].costars[d.actor_1_name] = (actors[d.actor_3_name].costars[d.actor_1_name]) ? actors[d.actor_3_name].costars[d.actor_1_name]+1 : 1;
         } else {
          count++;
          actors[d.actor_3_name] = {
          name: d.actor_3_name,
          likes: d.actor_3_facebook_likes,
          movies: 1,
          x: posX[i],
          y: posY[i],
          costars: {},
          costarNames: [d.actor_1_name, d.actor_2_name]
          };
          actors[d.actor_3_name].costars[d.actor_2_name] = (actors[d.actor_3_name].costars[d.actor_2_name]) = 1;
          actors[d.actor_3_name].costars[d.actor_1_name] = (actors[d.actor_3_name].costars[d.actor_1_name]) = 1;
         actors[d.actor_3_name].id = i;
         keys[i] = d.actor_3_name;
         i++;
         }
        }

      });

      for(var k = 0; k < keys.length; k++) {
        circGen(actors[keys[k]]);
      }
    });

  ///CIRCLE GENERATOR/////////////////
  var clicked = false;
  function circGen(actor) {
    var col = colByMov(actor.movies);
    var siz = sizeByLikes(actor.likes);
    var circ = svg.append("g")
      .classed("leaf", true)
      .attr("transform", "translate(" + actor.x + "," + actor.y + ")")
      .attr("id", "actors")
      .append("circle").attr({
        r: siz,
      })
      //.on("mouseover", handleMouseOver)
      //.on("mouseout", handleMouseOut)
      .on("click", function() {
        clicked = !clicked;

        for (var i = 0; i < actor.costarNames.length; i++) {
          console.log(actors[actor.costarNames[i]]);
          makeLine(actor, actors[actor.costarNames[i]], clicked);
        }
      })
      .style("fill", col)
  }

  ///HELPER FUNCTIONS////////
  function sizeByLikes(likes) {
    var size = 3;
    if(likes <= 3000) {
      size = 3;
    }
    if(3000 < likes <= 6000) {
      size = 6;
    }
    if(likes > 6000) { //can be bigger with this math
      size = likes/1000;
    }
    if(100000 < likes) {
      size = 100;
    }
    return size;
  }
  function colByMov(mov) {
    var col = "#e45c1e"; //orange
    if(mov == 3) {
      col = "#3e9ad6"; //blue
    }
    if(mov == 2) {
      col = "#b5c92d"; //green
    }
    if(mov == 1) {
      col = "#BB698B"; //purp
    }
    return col;
  }

  //IF CLICKED OR HOVERED////////////////


    // Create Event Handlers for mouse
  function handleMouseOver(d, i) {  // Add interactivity
    // Use D3 to select element, change color and size
    d3.select(this).attr({
      fill: "orange",
      r: r * 2
    });

    // Specify where to put label of text
    svg.append("text").attr({
       id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
        x: function() { return xScale(d.x) - 30; },
        y: function() { return yScale(d.y) - 15; }
    })
    .text(function() {
      return [d.x, d.y];  // Value of the text
    });
  }
  function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this).attr({
      fill: "black",
      r: r
    });

    // Select text by id and then remove
    d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
  }
  function makeLine(p1, p2, clicked) {
    if(clicked){
      p1.clicked = p1.id;
      var line = svg.append("line")
      .style("stroke", colByMov(p2.movies))
      .attr("x1", p1.x)
      .attr("y1", p1.y)
      .attr("x2", p2.x)
      .attr("y2", p2.y)
      .style("stroke-width", p1.costars[p2.name]);
    } else {
      p1.clicked = -1;
      d3.select("line").remove();
   }

  }


  //ADD LENS TO ZOOM FOR INFO/////////////////

  function updatePositions(transition) {
    d3.select("svg #lens")
    .attr("r", lens.radius)
    .attr("transform", `translate(${[lens.x, lens.y]})`);

    let change = d3.select("#actors");
    if (transition) change = change.transition().duration(200);
    change.attr("transform", (d, i, e) => { //lol
    let pos = [d.x, d.y]; //actor position
    console.log("pos " + pos);

    let diffX = pos[0] - lens.x,
      diffY = pos[1] - lens.y,
      dist = Math.sqrt(diffX ** 2 + diffY ** 2), //distance formula
      diffUniX = diffX / dist,
      diffUniY = diffY / dist,
      targetX,
      targetY;
    if (dist < lens.radius) {
      targetX = lens.x + lens.scale * diffX;
      targetY = lens.y + lens.scale * diffY;
    } else {
      targetX = lens.x + diffUniX * (dist - lens.radius);
      targetY = lens.y + diffUniY * (dist - lens.radius);
    }
    pos[0] += (targetX - pos[0]) * 0.8;
    pos[1] += (targetY - pos[1]) * 0.8;
    //if in the lens or out
    console.log(e[i]);
    if (dist < lens.radius) {
      d3.select(e[i]).classed("labeled", true);
    } else {
      d3.select(e[i]).classed("labeled", false);
    }
    return `translate(${pos})`;
  });
  }

  function zoomSlightly() {
  if (zoom <= 1) {
    zoom = 1.2;
    updatePositions(/*transition*/ true);
  }
}

  //Drag lens/////////////////////
  function add_interaction(chart) {


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
  svg.selectAll(".leaf circle").on("click", click);
  svg.on("click", click);

}
function click(d) {
  d3.event.stopPropagation();
  if (d === undefined || d.name === clicked) {
    clicked = -1;
  } else {
    clicked = d.name;
  }
  inout();
}

function inout() {
  d3.selectAll(".journal").classed("clicked", d => d.name === clicked);

  if (clicked === -1) {
    d3.select("#inout")
      .transition()
      .style("opacity", 0);
    setTitle("");
    return;
  }

  setTitle(d.name);

  updatePositions();
}

// var drag = d3.behavior.drag()
//   .on("dragstart", function() {
//     d3.event.sourceEvent.stopPropagation()
//   })
//   .on("drag", dragmove);


// //Drag handler
// function dragmove(d) {
//   var x = d3.event.x;
//   var y = d3.event.y;
//   d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
//   if(d3.select(this).attr("class") == "first") {
//     line.attr("x1", x);
//     line.attr("y1", y);
//   } else {
//     line.attr("x2", x);
//     line.attr("y2", y);
//   };
// };

function setTitle(title) {
  const text = d3.select("svg g#maintitle text");
  text.text(title);
  const w = text.node().getBBox().width;
  d3.select("svg g#maintitle rect").attr("width", !w ? 0 : w + 2 * 9);
}
