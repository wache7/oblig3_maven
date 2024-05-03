let billettregister = []; // billettregister
function registrerBillett(){

    const billett = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost:$("#epost").val()
    };

    let meldingFilmEl = $("#filmFeilmelding");
    let meldingAntallEl = $("#antallFeilmelding");
    let meldingFornavnEl = $("#fornavnFeilmelding");
    let meldingEtternavnEl = $("#etternavnFeilmelding");
    let meldingTelefonnrEl = $("#telefonnrFeilmelding");
    let meldingEpostEl = $("#epostFeilmelding");

// itererer gjennom arrayet og lager en felles feilmelding dersom det ikke har blitt tastet inn verdi på feltet.

    let booleanValue = true;

    // Må sjekke brukerinput sin validitet, bruker if setninger med spesifikke betingelser som klienten må taste inn.
    if(isNaN(billett.antall) || billett.antall === "" || billett.antall < 0){
        meldingAntallEl = "vennligst velg et tall antall større enn 1";
        booleanValue = false;
    } else{
        meldingAntallEl = "";
    }

    if(billett.fornavn === "" || !isNaN(billett.fornavn)){
        meldingFornavnEl.html("Du må skrive fornavn ditt");
        booleanValue = false;
    } else {
        console.log(meldingFornavnEl);
        meldingFornavnEl.html("");
    }

    if(billett.etternavn === "" || !isNaN(billett.etternavn)){
        meldingEtternavnEl.html("Du må skrive etternavnet ditt");
        booleanValue = false;
    } else{
        meldingEtternavnEl.html("");
    }

    if(billett.telefonnr === "" || isNaN(billett.telefonnr)){
        meldingTelefonnrEl.html("Du må skrive telefonnummeret ditt");
        booleanValue = false;
    } else {
        meldingTelefonnrEl.html("");
    }

    if(billett.epost === ""){
        meldingEpostEl.html("Du må skrive eposten din");
        booleanValue = false;
    } else {
        meldingEpostEl.html("");

    }

// finne en måte hvor jeg kan angripe alle feltene samtidig.

    if(booleanValue){
        billettregister.push(billett);
        tomInput();
        visBilletter(billett);

        $.post("/lagreKunde", billett, function (data){
            hentAlle(data);
        });
    }

    // Viser
    function tomInput(){
        const input = ["film", "antall", "fornavn", "etternavn", "telefonnr", "epost"]
    }
}

function visBilletter(data){
    let tabell =
        "<tr>" +
        "<th>Film</th>" +
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Telefonnr</th>" +
        "<th>E-post</th>" +
        "</tr>"
    // itererer gjennom arrayliste billett og henter dem ut.
    for(let billett of billettregister){
        tabell+=
            "<tr>" +
            "<td>" +  billett.film+ "</td>" +
            "<td>" +  billett.antall+ "</td>" +
            "<td>" +  billett.fornavn+ "</td>" +
            "<td>" +  billett.etternavn+ "</td>" +
            "<td>" +  billett.telefonnr+ "</td>" +
            "<td>" +  billett.epost+ "</td>" +
            "</tr>"
    }
    $("#billetter").html(tabell);
}

function hentAlle(){
    $.get("/hentKunder", function(data){
        visBilletter(data);
    });
}

function clearAll(){
    $.get("/slettKunder", function (){
        hentAlle();
    })

    billettregister.length = 0;
    $("#billetter").html("");
}