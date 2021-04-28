package com.example.springtemplate.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Timestamp;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String mapType;
    private String mode;
    private Timestamp created;
    private Integer playerId;
    
    @OneToMany(mappedBy = "game")
    @JsonIgnore
    private List<Stat> stats;

    public List<Stat> getStats() {
        return stats;
    }

    public void setSections(List<Stat> sections) {
        this.stats = stats;
    }

    //Setters and Getters
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPlayerId() {
        return this.playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public String getMode() {
        return this.mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public Timestamp getCreated() {
        return this.created;
    }

    public void setCreated(Timestamp timestamp) {
        this.created = timestamp;
    }

    public Game (String mapType, String mode, Integer playerId) {
        this.playerId = playerId;
        this.mapType = mapType;
        this.mode = mode;
    }

    public Game() {}

    public String getMapType() {
        return this.mapType;
    }

    public void setMapType(String mapType) {
        this.mapType = mapType;
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + id +
            ", mapType='" + mapType + '\'' +
            ", mode='" + mode + '\'' +
            ", created=" + created +
            ", playerId=" + playerId +
            '}';
    }
}
