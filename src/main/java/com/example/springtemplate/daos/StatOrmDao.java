package com.example.springtemplate.daos;

import com.example.springtemplate.models.Game;
import com.example.springtemplate.models.Stat;
import com.example.springtemplate.repositories.GameRepository;
import com.example.springtemplate.repositories.StatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class StatOrmDao {
    @Autowired
    StatRepository statRepository;

    @Autowired
    GameRepository gameRepository;

    @PostMapping("/api/stats")
    public Stat createStat(@RequestBody Stat section) {
        return statRepository.save(section);
    }

    @PostMapping("/api/games/{gameId}/stats")
    public Stat createStatForGame(
            @PathVariable("gameId") Integer gid,
            @RequestBody Stat stat) {
        stat = statRepository.save(stat);
        Game game = gameRepository.findById(gid).get();
        stat.setGame(game);
        return statRepository.save(stat);
    }

    @GetMapping("/api/games/{gid}/stats")
    public List<Stat> findStatsForGame(
            @PathVariable("gid") Integer gameId) {
        Game game = gameRepository.findById(gameId).get();
        return game.getStats();
    }
    
    @GetMapping("/api/stats")
    public List<Stat> findAllStats() {
        return (List<Stat>) statRepository.findAll();
    }
    
    @GetMapping("/api/stats/{statId}")
    public Stat findStatById(
            @PathVariable("statId") Integer id) {
        return statRepository.findById(id).get();
    }

    @PutMapping("/api/stats/{statId}")
    public Stat updateStat(
            @PathVariable("statId") Integer id,
            @RequestBody() Stat newStat) {
        Stat stat = this.findStatById(id);
        stat.setChampion(newStat.getChampion());
        stat.setTakeDowns(newStat.getTakeDowns());
        stat.setAssists(newStat.getAssists());
        stat.setDeaths(newStat.getDeaths());
        stat.setVictory(newStat.getVictory());
        return statRepository.save(stat);
    }

    @DeleteMapping("/api/stats/{statId}")
    public void deleteSection(
            @PathVariable("statId") Integer id) {
        statRepository.deleteById(id);
    }
}