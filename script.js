document.getElementById('dillema1Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
});

document.getElementById('dillema1Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
});

document.getElementById('dillema1Knap3').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 3. Her er det tilsvarende indhold.";
});


let currentSection = 0
console.log("Current section is " + currentSection);

// Funktionen er ændret, så den tager højde for variablen currentSection, og så sender den dig til næste main
function scrollForward() {
    // Find den ønskede sektion
    let section = document.getElementById('main'+(currentSection+1));
    currentSection = currentSection + 1;
    console.log("currentSection er " + currentSection);
    
    // Brug scrollIntoView-metoden for at scrolle til sektionen
    section.scrollIntoView({behavior: 'smooth'});
    
}

// function scrollToSection() {
//     // Find den ønskede sektion
//     let section = document.getElementById('main1');
    
//     // Brug scrollIntoView-metoden for at scrolle til sektionen
//     section.scrollIntoView({behavior: 'smooth'});
// }


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
    if(currentSection > 0) {
    let prevSection = document.getElementById('main0');
    currentSection = 0;
    console.log("currentSection er " + currentSection);

    prevSection.scrollIntoView({behavior: 'smooth'});
    };
}