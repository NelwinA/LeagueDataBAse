package com.example.springtemplate.daos;

import com.example.springtemplate.models.Player;
import com.example.springtemplate.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PlayerOrmDao {
    @Autowired
    PlayerRepository playerRepository;

    @PostMapping("/api/players")
    public Player createUser(@RequestBody Player player) {
        return playerRepository.save(player);
    }

    //assignment 7
    @GetMapping("/api/create/player/{fn}/{ln}/{un}/{pw}/{em}")
    public Player createUser(
        @PathVariable("fn") String first,
        @PathVariable("ln") String last,
        @PathVariable("un") String uname,
        @PathVariable("pw") String pass,
        @PathVariable("em") String email)
    {
        Player player = new Player(first, last, uname, pass, email);
        return playerRepository.save(player);
    }


    @GetMapping("/api/players")
    public List<Player> findAllPlayers() {
        return playerRepository.findAllPlayers();
    }

    @GetMapping("/api/players/{playerId}")
    public Player findPlayerById(
            @PathVariable("playerId") Integer id) {
        return playerRepository.findPlayerById(id);
    }

    @PutMapping("/api/players/{playerId}")
    public Player updatePlayer(
            @PathVariable("playerId") Integer id,
            @RequestBody Player userUpdates) {
        Player player = playerRepository.findPlayerById(id);
        player.setFirstName(userUpdates.getFirstName());
        player.setLastName(userUpdates.getLastName());
        player.setUsername(userUpdates.getUsername());
        player.setPassword(userUpdates.getPassword());
        player.setEmail(userUpdates.getEmail());
        return playerRepository.save(player);
    }

    //assignment 7
    @GetMapping("/api/update/player/{playerId}/{password}")
    public Player updatePlayer(
        @PathVariable("playerId") Integer id,
        @PathVariable("password") String newPass) {
        Player player = playerRepository.findPlayerById(id);
        player.setPassword(newPass);
        return playerRepository.save(player);
    }


    @DeleteMapping("/api/players/{playerId}")
    public void deleteUser(
            @PathVariable("playerId") Integer id) {
        playerRepository.deleteById(id);
    }
}