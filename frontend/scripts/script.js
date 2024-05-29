let yourCO2emission = 0;
let displayYourCO2emission = document.getElementById('yourEmission');
let previousEmissions = []; // Array to store emissions for each section

// Update emissions based on the choices made in dilemma 1
document.getElementById('dillema1Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission += 1472;
    previousEmissions[currentSection] = 1472;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema1Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission += 1540;
    previousEmissions[currentSection] = 1540;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema1Knap3').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 3. Her er det tilsvarende indhold.";
    yourCO2emission += 2319;
    previousEmissions[currentSection] = 2319;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

// Update emissions based on the choices made in dilemma 2
document.getElementById('dillema2Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission += 10;
    previousEmissions[currentSection] = 10;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema2Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission += 723;
    previousEmissions[currentSection] = 723;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

// Update emissions based on the choices made in dilemma 3
document.getElementById('dillema3Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission += 210;
    previousEmissions[currentSection] = 210;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema3Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission += 2550;
    previousEmissions[currentSection] = 2550;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema3Knap3').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 3. Her er det tilsvarende indhold.";
    yourCO2emission += 3750;
    previousEmissions[currentSection] = 3750;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

// Update emissions based on the choices made in dilemma 4
document.getElementById('dillema4Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission += 12750;
    previousEmissions[currentSection] = 12750;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema4Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission += 750;
    previousEmissions[currentSection] = 750;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});



// Update emissions based on the choices made in dilemma 5
document.getElementById('dillema5Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission += 1930000;
    previousEmissions[currentSection] = 1930000;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema5Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission += 359000;
    previousEmissions[currentSection] = 359000;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema5Knap3').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 3. Her er det tilsvarende indhold.";
    yourCO2emission += 208000;
    previousEmissions[currentSection] = 208000;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

// Update emissions based on the choices made in dilemma 6
document.getElementById('dillema6Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission += 53000;
    previousEmissions[currentSection] = 53000;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema6Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission += 13000;
    previousEmissions[currentSection] = 13000;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

// Update emissions based on the choices made in dilemma 7
document.getElementById('dillema7Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission += 1800;
    previousEmissions[currentSection] = 1800;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema7Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission += 12357;
    previousEmissions[currentSection] = 12357;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});



// Update emissions based on the choices made in dilemma 8
document.getElementById('dillema8Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission += 600;
    previousEmissions[currentSection] = 600;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});

document.getElementById('dillema8Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission += 450;
    previousEmissions[currentSection] = 450;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
});







let currentSection = 0;
console.log("Current section is " + currentSection);

function scrollForward() {
    let section = document.getElementById('main' + (currentSection + 1));
    currentSection += 1;
    console.log("currentSection er " + currentSection);
    section.scrollIntoView({ behavior: 'smooth' });
}

function scrollBack() {
    if (currentSection > 0) {
        yourCO2emission -= previousEmissions[currentSection]; // Subtract the emission for the current section
        previousEmissions[currentSection] = 0; // Reset the emission for the current section
        displayYourCO2emission.textContent = yourCO2emission + "g CO2e";
        
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
    previousEmissions = []; // Reset the emissions array
    displayYourCO2emission.textContent = "Din CO2 udledning er nulstillet";
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
