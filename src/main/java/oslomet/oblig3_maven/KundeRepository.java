package oslomet.oblig3_maven;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KundeRepository {

    private JdbcTemplate db;
    public void lagreAlleKunder(Kunde innKunde){
        String sql = "INSERT INTO Kunde(film, antall, fornavn, etternavn, tlf, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, innKunde.getFilm(), innKunde.getAntall(), innKunde.getFornavn(),
                innKunde.getEtternavn(),innKunde.getEpost() ,innKunde.getEpost());
    }

    public List<Kunde> hentAlleKunder() {
        String sql = "SELECT * FROM Kunde ORDER BY etternavn";
        List<Kunde> alleKunder = db.query(sql, new BeanPropertyRowMapper<>(Kunde.class));
        return alleKunder;
    }

    public void slettAlleKunder(){
        String sql = "DELETE FROM Kunde";
        db.update(sql);
    }

}