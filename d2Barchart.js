// Width og height til SVG1
const w = 800;
const h = 500;
//Padding for at søjlerne ikke skal sidde helt op af hinanden
const padding = 40;
//Padding til akserne for at man kan se det hele
const axisPadding = 70;

/**
 * Her har vi et datasæt - det er det fra eksamensøvesæt 4.
 * Det er genereret af chatGPT og jeg tolker det som en række målepunkter foretaget på nogle bestemte tidspunkter.
 * Det er ikke vigtigt at forstå hvad det betyder - det er bare data.
 * Men det kunne forsås således:
 *  d[0] : Måling fortaget den 2023-10-30 kl 08:22:14, måleresultatet er 27 og det tog 0.987654 sekunder at foretage målingen.
 * NB: I eksamenssættet er der ikke sorteret efter dato, som udgangspunkt. Det har jeg dog gjort her, så det virker mere realistisk.
 * */

const dataset = [
  [0.987654, 1.4972, "Havregryn og mælk med frugt"],
  [0.456789, 1.5405, "Weinerbrød og kaffe"],
  [0.654321, 2.3219, "Bolle med PJ og avocado"],
  
];

//SVG-elementet tilføjes til body
const svg1 = d3.select("#graf2")
.append("svg")
.attr("width", w)
.attr("height", h);

//Skaleringsfunktioner - de er sat til null, fordi de skal sættes op senere
let yScale = null;
let xScale = null;

//Akser - de er sat til null, fordi de skal sættes op senere
let xAxis = null;
let yAxis = null;

//Denne funktion sørger for at vise den første graf, når siden loades
init(dataset, false);

//Her tilføjes der eventlisteners til knapperne
d3.selectAll("#sortByValue, #sortByDate, #sortByMeasureTime").on(
  "click",
  function (e) {
    // Find hvilken knap der blev trykket på
    let id = e.target.id;
    //Log id'et til konsollen
    console.log(id);
    let isFastest = false;
    if (id === "sortByMeasureTime") {
      isFastest = true;
    }
    //Data sorteres baseret på hvilken knap der blev trykket på
    sortData(id);
    //Efter sorteringen er færdig, logges det sorterede datasæt til konsollen
    console.log("Sorted data by " + id + " : ", dataset);
    //Data animeres
    animateData(dataset, isFastest);
  }
);

function init(dataset, isFastest) {
  //Først skal de dynamiske værdier sættes op
  setUp(dataset, isFastest);
  //Her oprettes det første chart som vises som standard når siden loades
  createDefaultChart(dataset);
  //Akser tilføjes
  addAxes();
}

function setUp(dataset, isFastest) {
  //Skaleringsfunktioner
  yScale = createScaleY(dataset);
  xScale = createScaleX(dataset);
  //Akser
  xAxis = createAxisX(xScale, isFastest);
  yAxis = createAxisY(yScale);
}



function createDefaultChart(dataset) {
  /**
   * Bar chart laves herunder
   * Vi bruger 'xScale' til at placere søjler langs x-aksen.
   * Vi bruger 'yScale' til at bestemme højden af søjlerne
   * Vi giver også hver søjle en unik key.
   * Derudover kommer vi akser og labels på også.
   * */
  svg1
    .selectAll("rect")
    /**
     * Der skal gives en key til hvert datapunkt, så d3 kan genkende dem.
     * Det gør vi ved at give en callback-funktion som returnerer en værdi som er unik for hvert datapunkt.
     * I dette tilfælde er det dato-stemplet, som er unikt for hvert datapunkt.
     * */
    .data(dataset, function (d) {
      return d[3];
    })
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      console.log(d);
      return i * dataset.length;
    })
    .attr("x", function (d, i) {
      return xScale(i) + padding;
    })
    .attr("y", function (d) {
      return yScale(d[1]);
    })
    .attr(
      "width",
      w / dataset.length - 2 * padding - (2 * axisPadding) / dataset.length
    )
    .attr("height", function (d) {
      console.log("height: " + (yScale(d[1]) - axisPadding));
      return h - padding - axisPadding - yScale(d[1]);
    })
    .attr("fill", function (d) {
      return "rgb(0, 0, " + (256 - d[1]) + ")";
    });
}

function createScaleX(dataset) {
  return (
    d3
      /**
       * Her brues scaleBand i stedet for ScaleLinear
       * Dette skyldes at vi vil have tickmarks jævnt fordelt i "bånd" på midten af hver søjle.
       * Før har vi gjort det ved hver start på en en søjle - altså dens x-værdi.
       * Jeg fjerner dem senere, men der sørger også for at placere labels rigtigt i forhold til søjlerne.
       * */
      .scaleBand()
      .range([padding + axisPadding, w - padding - axisPadding])
      .domain(
        /**
         * Arrays har en indbygget metode som hedder 'map'.
         * Den tager en callback-funktion som parameter.
         * Callback-funktionen køres en gang for hvert element i arrayet.
         * Der er altid tre parametre til callback-funktionen:
         * 1) selve elementet (d)
         * 2) indexet for elementet (i)
         * 3) selve arrayet (ikke brugt)
         * Da vi kun skal bruge indexet, så er det kun nødvendigt at tage de to første parametre med i callback-funktionen (d,i).
         * Hvis jeg kun skrev "i", ville jeg få elementet, da der så kun er den første parameter.
         * */
        dataset.map(function (d, i) {
          //Vi returnerer i for at fortælle d3 at der skal være lige så mange tickmarks som der er elementer i arrayet
          return i;
        })
      )
  );
}

function createScaleY(dataset) {
  return d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset, function (d) {
        return d[1];
      }),
    ])
    .range([h - padding - axisPadding, padding + axisPadding])
    .nice();
}

function createAxisY(yScale) {
  return d3.axisLeft().scale(yScale).ticks(5);
}

function createAxisX(xScale, isFastest) {
  return (
    d3
      .axisBottom()
      .scale(xScale)
      //Her fortæller vi hvad der skal skrives på aksen, isFastest bestemmer om det skal være måletid eller måledato
      .tickFormat(function (d) {
        while (d < dataset.length) {
          if (isFastest) {
            return dataset[d][0];
          } else {
            return dataset[d][2];
          }
        }
      })
  );
}

function addAxes() {
  svg1
    .append("g")
    .attr("transform", "translate(0," + (h - padding - axisPadding) + ")")
    .attr("id", "xAxis");

  svg1
    .append("g")
    .attr("transform", "translate(" + (padding + axisPadding) + ",0)")
    .attr("id", "yAxis")
    .call(yAxis);

  //X-aksen formateres, så den viser sine labels korrekt
  formatAxisX();
}

function formatAxisX() {
  svg1
    .select("#xAxis")
    .call(xAxis)
    //Her fjernes tickmarks fra x-aksen - det synes jeg ser pænere ud
    .call(xAxis.tickSize(0))
    .selectAll("text")
    .attr("transform", "translate(-10,5)rotate(-45)")
    .style("text-anchor", "end");
}

function animateData(data, isFastest) {
  setUp(data, isFastest);
  formatAxisX();
  // select alle 'rect'.
  svg1
    .selectAll("rect")
    .data(data, function (d) {
      // Vælg key til hvert dataelement
      return d[2];
    })
    //start en animation
    .transition()
    //Lad den vare 2000 ms
    .duration(2000)
    /**
     * Dette skal være slutresultatet: flyt søjlerne til de nye positioner
     * 'width', 'height' og 'color' er de samme som før,
     * så dem behøver vi ikke at tage med i vores 'transition'
     * Men i praksis kan man sagtens animere flere ting på én gang, hvis man vil.
     * I dette tilfælde skal altså kun 'x' ændres.
     * */
    .attr("x", function (d, i) {
      return xScale(i) + padding;
    });

  //her opdateres så x-aksen
}




function formatAxisX() {
  svg1
    .select("#xAxis")
    .call(xAxis)
    .call(xAxis.tickSize(0))
    .selectAll("text")
    .attr("transform", function() {
      // Rotate the labels only if the text length is less than a certain threshold
      return (this.getComputedTextLength() > threshold) ? "translate(0,0)rotate(-45)" : "translate(0,0)rotate(0)";
    })
    .style("text-anchor", function() {
      // Adjust text anchor based on rotation
      return (this.getComputedTextLength() > threshold) ? "end" : "middle";
    });
}

