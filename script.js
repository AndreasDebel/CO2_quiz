document.getElementById('option1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 1. Her er det tilsvarende indhold.";
});

document.getElementById('option2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 2. Her er det tilsvarende indhold.";
});

document.getElementById('option3').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte mulighed 3. Her er det tilsvarende indhold.";
});

function scrollToSection() {
    // Find den ønskede sektion
    var section = document.getElementById('main1');
    
    // Brug scrollIntoView-metoden for at scrolle til sektionen
    section.scrollIntoView({behavior: 'smooth'});
}