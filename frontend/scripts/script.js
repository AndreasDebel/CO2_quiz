let yourCO2emission = 0;
let displayYourCO2emission = document.getElementById('yourEmission');
let previousEmissions = []; // Array to store emissions for each section


// Update emissions based on the choices made in dilemma 1
document.getElementById('dillema1Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte havregryn med frugt. Udover at det formentlig er det sundeste valg, så er det faktisk også det bedste valg i forhold til klimaet. Det udleder nemlig kun 1472 gram CO2.";
    yourCO2emission += 1472;
    previousEmissions[currentSection] = 1472;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["a"] = 1472;
    piedata3["a"] = 1472;
});

document.getElementById('dillema1Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte kaffe og wienerbrød. Det er en lækker combo, men det er faktisk ikke det bedste valg rent klimamæssigt. Det udleder nemlig 1540 gram CO2, hvilket er omkring 70 gram mere CO2 end det bedste valg. Men for nogle er kaffen livsvigtig.";
    yourCO2emission += 1540;
    previousEmissions[currentSection] = 1540;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["a"] = 1540;
    piedata3["a"] = 1540;
});

document.getElementById('dillema1Knap3').addEventListener('click', function() {
    document.getElementById('dynamicContent').innerText = "Du valgte brød med peanutbutter og avocado. Det er et lækkert valg, men også den største CO2-udleder af de tre måltider, du kunne have valgt. Dette måltid udleder nemlig 2319 gram CO2, hvilket er omkring 850 gram CO2 mere end det bedste valg.";
    yourCO2emission += 2319;
    previousEmissions[currentSection] = 2319;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["a"] = 2319;
    piedata3["a"] = 2319;
});

// Update emissions based on the choices made in dilemma 2
document.getElementById('dillema2Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent2').innerText = "Du valgte en hurtig tur i det kolde vand. Måske er du en rigtig viking, eller også tænker du på klimaet, for dette er bestemt det bedste valg, hvis klimaet er i tankerne. Prøv at afspille grafen og se, hvor meget dit valg udleder i CO2.";
    yourCO2emission += 10;
    previousEmissions[currentSection] = 10;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["b"] = 10;
    piedata3["b"] = 10;
});

document.getElementById('dillema2Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent2').innerText = "Du valgte en lang tur i det varme vand. Det er bestemt heller ikke dårligt, hvis man har brug for at slappe af, men hvis det er klimaet, du har i tankerne, så er det bestemt ikke det rigtige valg. Prøv at afspille grafen og se, hvor meget dit valg udleder i CO2.";
    yourCO2emission += 723;
    previousEmissions[currentSection] = 723;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["b"] = 723;
    piedata3["b"] = 723;
});

// Update emissions based on the choices made in dilemma 3
document.getElementById('dillema3Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent3').innerText = "Du valgte at tage elcyklen på arbejde. Udover at det er god motion, selvom elen hjælper dig lidt på vej, så er det også den bedste klimamæssige løsning for at komme på arbejde. Du udleder nemlig kun 210 gram CO2 for at cykle 15 km, og det er mere end 10 gange mindre end de andre løsninger, som du kunne have taget. På grafen her kan du se, hvor meget de andre transportmidler udleder.";
    yourCO2emission += 210;
    previousEmissions[currentSection] = 210;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["c"] = 210;
    piedata3["c"] = 210;
});

document.getElementById('dillema3Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent3').innerText = "Du valgte at tage bilen på arbejde, hvilket nok er en af de mere populære måder at tage på arbejde på, men det er ikke den bedste måde at transportere sig selv fra A til B, da bilen faktisk udleder 10 gange mere CO2, end hvis du for eksempel havde valgt at tage cyklen. På grafen her kan du se, hvor meget de andre transportmidler udleder.";
    yourCO2emission += 2550;
    previousEmissions[currentSection] = 2550;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["c"] = 2550;
    piedata3["c"] = 2550;
});

document.getElementById('dillema3Knap3').addEventListener('click', function() {
    document.getElementById('dynamicContent3').innerText = "Du valgte at sejle på arbejde med et krydstogtskib. Dette er en af de lidt mere usædvanlige måder at tage på arbejde på, men ikke desto mindre er det en af de værste transportmåder, da det udleder en stor mængde CO2. På grafen her kan du se, hvor meget de andre transportmidler udleder.";
    yourCO2emission += 3750;
    previousEmissions[currentSection] = 3750;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["c"] = 3750;
    piedata3["c"] = 3750;
});

// Update emissions based on the choices made in dilemma 4
document.getElementById('dillema4Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent4').innerText = "Du valgte til frokost steak med pommes og sauce. Det er en klassisk go to ret, men denne ret udleder faktisk 12,75 kilo CO2, hvor retten med falafel kun udleder 750 gram CO2. På grafen kan du også se, hvilke dele af retten der virkelig er en byrde for CO2-udledningen.";
    yourCO2emission += 12750;
    previousEmissions[currentSection] = 12750;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["d"] = 12750;
    piedata3["d"] = 12750;
});

document.getElementById('dillema4Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent4').innerText = "Du valgte til frokost falafel med ris og salat. Udover at det er en relativt sund og lækker ret, udleder den faktisk heller ikke særlig meget CO2. Den udleder nemlig kun 750 gram CO2, og hvis du sammenligner dette med den anden ret, som udleder 12,75 kilo CO2, er dette valg rigtig fornuftigt. På grafen kan du også se, hvilke dele af retten der virkelig er en byrde for CO2-udledningen.";
    yourCO2emission += 750;
    previousEmissions[currentSection] = 750;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["d"] = 750;
    piedata3["d"] = 750;
});



// Update emissions based on the choices made in dilemma 5
document.getElementById('dillema5Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent5').innerText = "Du valgte at planlægge en flyrejse til Miami, en lækker destination, men flyveturen til Miami udleder omkring 1930 kilo CO2, hvilket er en ordentlig slat. Dette tal vil kun blive højere, hvis man for eksempel vælger at rejse på first class eller business class. Hvis du holder markøren over linjerne, kan du se information om de forskellige rejser.";
    yourCO2emission += 1930000;
    previousEmissions[currentSection] = 1930000;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["e"] = 1930000;
});

document.getElementById('dillema5Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent5').innerText = "Du valgte at planlægge en bilrejse til Barcelona, en lækker destination, men bilturen til Barcelona udleder omkring 359 kilo CO2 Hvis du holder markøren over linjerne, kan du se information om de forskellige rejser.";
    yourCO2emission += 359000;
    previousEmissions[currentSection] = 359000;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["e"] = 359000;
});

document.getElementById('dillema5Knap3').addEventListener('click', function() {
    document.getElementById('dynamicContent5').innerText = "Du valgte at planlægge en bilrejse til Helsinki. På turen til Helsinki skal du med 2 færger, som i alt udgør 191 km af den 1140 km lange tur. I alt udledes der 208 kilo CO2 ved at køre til Helsinki, hvor cirka 48 kilo CO2 kommer fra færgeturen. Hvis du holder markøren over linjerne, kan du se information om de forskellige rejser.";
    yourCO2emission += 208000;
    previousEmissions[currentSection] = 208000;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["e"] = 208000;
});

// Update emissions based on the choices made in dilemma 6
document.getElementById('dillema6Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent6').innerText = "Du valgte den mere ekstreme hobby, nemlig motocross. Der er fart over feltet og duften af benzin, men det er langt fra den mest klimavenlige hobby. Du udleder nemlig helt op til 26,45 kilo CO2 i timen.";
    yourCO2emission += 26450;
    previousEmissions[currentSection] = 26450;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["f"] = 26450;
    piedata3["f"] = 26450;
});

document.getElementById('dillema6Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent6').innerText = "Du valgte den mere stille og rolige hobby, hvor man er i ét med naturen, nemlig friluftsliv. Denne hobby udleder omkring 6,6 kilo CO2 i timen, hvis der er et bål eller andet tændt.";
    yourCO2emission += 6600;
    previousEmissions[currentSection] = 6600;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["f"] = 6600;
    piedata3["f"] = 6600;
});

// Update emissions based on the choices made in dilemma 7
document.getElementById('dillema7Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent7').innerText = "På vej hjem fra din hobby, valgte du at købe ind til hjemmelavet sushi, en relativ sund og populær ret, som faktisk kun udleder 1.8 kilo CO2, ";
    yourCO2emission += 1800;
    previousEmissions[currentSection] = 1800;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["g"] = 1800;
    piedata3["g"] = 1800;
});

document.getElementById('dillema7Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent7').innerText = " På vej hjem fra din hobby, valgte du at købe ind til lammekølle med kartofler, en ret der udleder en stor mængde CO2 nemlig 12.3 kilo CO2";
    yourCO2emission += 12357;
    previousEmissions[currentSection] = 12357;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["g"] = 12357;
    piedata3["g"] = 12357;
});



// Update emissions based on the choices made in dilemma 8
document.getElementById('dillema8Knap1').addEventListener('click', function() {
    document.getElementById('dynamicContent8').innerText = "Du valgte at se Netflix i stedet for at udforske det store web sammen med mig, ChatGPT. Selvfølgelig skal der også være plads til det valg, men udover at du ikke får ny viden, udleder du faktisk også mere CO2 end hvis du havde interageret med mig.";
    yourCO2emission += 600;
    previousEmissions[currentSection] = 600;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["h"] = 600;
    piedata3["h"] = 600;
});

document.getElementById('dillema8Knap2').addEventListener('click', function() {
    document.getElementById('dynamicContent8').innerText = "Du valgte at lave hjernegymnastik med ChatGPT. Sikke en god måde at slutte din dag på! Udover at du sandsynligvis bliver MEGET klogere, udleder du faktisk også mindre CO2 end hvis du havde valgt at se Netflix.";
    yourCO2emission += 225;
    previousEmissions[currentSection] = 225;
    displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
    piedata2["h"] = 225;
    piedata3["h"] = 225;
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
        displayYourCO2emission.textContent = Math.round(yourCO2emission/1000) + "kg CO2e";
        
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
    piedata2 = {};
    piedata3 = {};
}

d3.selectAll('.main .header')
    .each(function(d, i) {
        const numOfHeaders = d3.selectAll('.main .header').size();
        const isEven = i % 2 === 0;
        const isLastSection = i === numOfHeaders - 1;

        if (isEven || isLastSection) {
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
                let forwardBtnText = i === 0 ? 'Start quiz' : 'Næste side';
                d3.select(this)
                    .append('button')
                        .attr('class', 'forwardbtn')
                        .attr('onclick', 'scrollForward()')
                        .text(forwardBtnText);
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
