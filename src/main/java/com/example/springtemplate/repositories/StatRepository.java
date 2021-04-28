package com.example.springtemplate.repositories;

import com.example.springtemplate.models.Game;
import com.example.springtemplate.models.Stat;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface StatRepository
        extends CrudRepository<Stat, Integer> {
  @Query(value = "SELECT * FROM stats",
      nativeQuery = true)
  public List<Stat> findAllStats();
  @Query(value = "SELECT * FROM stats WHERE id=:statId",
      nativeQuery = true)
  public Stat findStatById(@Param("statId") Integer id);
}
