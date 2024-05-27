let yourCO2emission = 0;
let previousEmissions = [];
let currentSection = 0;

// Function to update the CO2 emission display for all elements with the class 'yourEmission'
function updateCO2Display() {
    let displayElements = document.querySelectorAll('.yourEmission');
    displayElements.forEach(function(element) {
        element.textContent = "Din CO2 udledning indtil videre " + yourCO2emission + "g CO2e";
    });
}

// Update emissions based on the choices made in dilemma 1
document.getElementById('dillema1Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission += 500;
    previousEmissions[currentSection] = 500;
    updateCO2Display();
});

document.getElementById('dillema1Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission += 200;
    previousEmissions[currentSection] = 200;
    updateCO2Display();
});

document.getElementById('dillema1Knap3').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 3. Her er det tilsvarende indhold.";
    yourCO2emission += 1500;
    previousEmissions[currentSection] = 1500;
    updateCO2Display();
});

// Repeat similar blocks for other dilemmas...

function scrollForward() {
    let section = document.getElementById('main' + (currentSection + 1));
    currentSection += 1;
    console.log("currentSection er " + currentSection);
    section.scrollIntoView({ behavior: 'smooth' });
}

function scrollBack() {
    if (currentSection > 0) {
        yourCO2emission -= previousEmissions[currentSection];
        previousEmissions[currentSection] = 0;
        updateCO2Display();
        
        let prevSection = document.getElementById('main' + (currentSection - 1));
        currentSection -= 1;
        console.log("currentSection er " + currentSection);
        prevSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    let prevSection = document.getElementById('main0');
    currentSection = 0;
    console.log("currentSection er " + currentSection);
    prevSection.scrollIntoView({ behavior: 'smooth' });

    yourCO2emission = 0;
    previousEmissions = [];
    updateCO2Display();
}

d3.selectAll('.main .header')
    .each(function(d, i) {
        if (i % 2 === 0) {
            const numOfHeaders = d3.selectAll('.main .header').size();
            if (i !== 0) {
                d3.select(this)
                    .append('button')
                        .attr('class', 'backbtn')
                        .attr('onclick', 'scrollBack()')
                        .text('Forrige side');
                d3.select(this)
                    .append('img')
                        .attr('class', 'arrowBack')
                        .attr('src', 'Images/arrow-small-left.png')
                        .attr('alt', '');
            }

            if (i !== numOfHeaders - 1) {
                d3.select(this)
                    .append('button')
                        .attr('class', 'forwardbtn')
                        .attr('onclick', 'scrollForward()')
                        .text('Næste side');
                d3.select(this)
                    .append('img')
                        .attr('class', 'arrowDown')
                        .attr('src', 'Images/arrow-small-left.png')
                        .attr('alt', '');
            }

            if (i !== 0) {
                d3.select(this)
                    .append('button')
                        .attr('class', 'topbtn')
                        .attr('onclick', 'scrollToTop()')
                        .text('Til toppen');
                d3.select(this)
                    .append('img')
                        .attr('class', 'arrowHome')
                        .attr('src', 'Images/angle-double-small-up.png')
                        .attr('alt', '');
            }
        }
    });
