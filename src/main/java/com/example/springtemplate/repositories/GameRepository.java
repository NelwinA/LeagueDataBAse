package com.example.springtemplate.repositories;


import com.example.springtemplate.models.Game;
import com.example.springtemplate.models.Player;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface GameRepository
        extends CrudRepository<Game, Integer> {
  @Query(value = "SELECT * FROM games",
      nativeQuery = true)
  public List<Game> findAllGames();
  @Query(value = "SELECT * FROM games WHERE id=:gameId",
      nativeQuery = true)
  public Game findGameById(@Param("gameId") Integer id);
}
