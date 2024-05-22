let yourCO2emission = 0;
let displayYourCO2emission = document.getElementById('yourEmission');


// Det første dilemma har tre knapper, som skal ændre noget content afhængig af hvad du trykker på
document.getElementById('dillema1Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
    yourCO2emission = yourCO2emission + 500;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e"
});

document.getElementById('dillema1Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
    yourCO2emission = yourCO2emission + 200;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e"
});

document.getElementById('dillema1Knap3').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 3. Her er det tilsvarende indhold.";
    yourCO2emission = yourCO2emission + 1500;
    displayYourCO2emission.textContent = yourCO2emission + "g CO2e"
});

// Denne variable fortæller, hvilken main brugeren sidst har bevæget sig hen til m. knapperne
let currentSection = 0
console.log("Current section is " + currentSection);

// Funktionen tager højde for variablen currentSection, og så sender den dig til næste main
function scrollForward() {
    // Find den ønskede sektion
    let section = document.getElementById('main'+(currentSection+1));
    currentSection = currentSection + 1;
    console.log("currentSection er " + currentSection);
    
    // Brug scrollIntoView-metoden for at scrolle til sektionen
    section.scrollIntoView({behavior: 'smooth'});
    
}

// Funktionen sender dig til forrige main
function scrollBack() {
    if(currentSection > 0) {
    let prevSection = document.getElementById('main'+(currentSection-1));
    currentSection = currentSection - 1;
    console.log("currentSection er " + currentSection);

    prevSection.scrollIntoView({behavior: 'smooth'});
    };
}

// Funktionen sender dig til toppen
function scrollToTop() {
    let prevSection = document.getElementById('main0');
    currentSection = 0;
    console.log("currentSection er " + currentSection);

    prevSection.scrollIntoView({behavior: 'smooth'});

    yourCO2emission = 0;
    displayYourCO2emission.textContent = "Din CO2 udledning er nulstillet"
    };


// Sæt knapper ind i alle .main .header
d3.selectAll('.main .header')
    .each(function(d, i) {

        const numOfHeaders = d3.selectAll('.main .header').size();
        if(i !== 0) {
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

        if(i !== numOfHeaders - 1) {
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
    
        if(i !== 0) {
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
    });