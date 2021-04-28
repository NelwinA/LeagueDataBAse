package com.example.springtemplate.daos;

import com.example.springtemplate.models.Game;
import com.example.springtemplate.models.Game;
import com.example.springtemplate.repositories.GameRepository;
import com.example.springtemplate.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class GameOrmDao {
    @Autowired
    GameRepository gameRepository;

    @PostMapping("/api/games")
    public Game createGame(@RequestBody Game game) {
        return gameRepository.save(game);
    }
    
    @GetMapping("/api/games")
    public List<Game> findAllGames() {
        return (List<Game>) gameRepository.findAll();
    }
    
    @GetMapping("/api/games/{gameId}")
    public Game findGameById(
            @PathVariable("gameId") Integer id) {
        return gameRepository.findById(id).get();
    }

    @GetMapping("/api/update/game/{gameId}/{mode}")
    public Game updateGame(
            @PathVariable("gameId") Integer id,
            @PathVariable("mode") String newMode) {
        Game game = this.findGameById(id);
        game.setMode(newMode);
        return gameRepository.save(game);
    }

    @PutMapping("/api/courses/{gameId}")
    public Game updateGame(
            @PathVariable("gameId") Integer id,
            @RequestBody() Game newGame) {
        Game game = this.findGameById(id);
        game.setMapType(newGame.getMapType());
        game.setMode(newGame.getMode());
        game.setPlayerId(newGame.getPlayerId());
        return gameRepository.save(game);
    }

    @DeleteMapping("/api/games/{gameId}")
    public void deleteGame(
            @PathVariable("gameId") Integer id) {
        gameRepository.deleteById(id);
    }
}