package oslomet.oblig3_maven;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class KundeController {

    @Autowired
    public KundeRepository rep;

    // hente verdier fra serverside og returnere dem til klientsiden.
// Metoden er tilkoblet til endepunktet "/lagrekunde" og inntar type Kunde med objektet innKunde.
    @PostMapping("/lagreKunde")
    public void lagreKunde(Kunde innKunde){rep.lagreAlleKunder(innKunde);}
    //
    @GetMapping("/hentKunder")
    public List<Kunde> hentAlle() {return rep.hentAlleKunder();}

    @GetMapping("/slettKunder")
    public void slettAlle(){rep.slettAlleKunder();}

}