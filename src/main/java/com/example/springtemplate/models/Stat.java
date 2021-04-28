package com.example.springtemplate.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.xml.bind.v2.model.core.ID;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name="stats")
public class Stat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String champion;
    private Integer takedowns;
    private Integer assists;
    private Integer deaths;
    @Column(columnDefinition="tinyint(1) default 1")
    private Boolean victory;
    
    @ManyToOne
    @JsonIgnore
    private Game game;



    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return this.id;
    }

    public void setChampion(String champion) {
        this.champion = champion;
    }

    public String getChampion() {
        return this.champion;
    }

    public void setTakeDowns(Integer takeDowns) {
        this.takedowns = takeDowns;
    }

    public Integer getTakeDowns() {
        return this.takedowns;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    public Integer getAssists() {
        return this.assists;
    }

    public void setDeaths(Integer deaths) {
        this.deaths = deaths;
    }

    public Integer getDeaths() {
        return this.deaths;
    }

    public void setVictory(Boolean b) {
        this.victory = b;
    }

    public Boolean getVictory() {
        return this.victory;
    }

}
