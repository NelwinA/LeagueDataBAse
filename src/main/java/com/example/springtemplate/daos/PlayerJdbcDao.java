package com.example.springtemplate.daos;

import com.example.springtemplate.models.Player;

import java.sql.*;
import java.util.*;
import org.springframework.web.bind.annotation.RequestParam;

public class PlayerJdbcDao {
    static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    static final String HOST = "localhost:3306";
    static final String SCHEMA = "db_league";
    static final String CONFIG = "serverTimezone=UTC";
    static final String URL =
            "jdbc:mysql://"+HOST+"/"+SCHEMA+"?"+CONFIG;
    static final String USERNAME = "root";
    static final String PASSWORD = "P@ssw0rd";
    
    static Connection connection = null;
    static PreparedStatement statement = null;

    // template for SQL functions
    String CREATE_PLAYER = "INSERT INTO players VALUES (null, ?, ?, ?, ?, ?, ?)";
    String FIND_ALL_PLAYERS = "SELECT * FROM players";
    String FIND_PLAYER_BY_ID = "SELECT * FROM players WHERE id=?";
    String DELETE_PLAYER = "DELETE FROM players WHERE id=?";
    String UPDATE_PLAYER_PASSWORD = "UPDATE players SET password=? WHERE id=?";
    String UPDATE_PLAYER = "UPDATE players SET first_name=?, last_name=?, username=?, password=?, "
        + "email=? WHERE id=?";
    
    private Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName(DRIVER);
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
    
    private void closeConnection(Connection connection) throws SQLException {
        connection.close();
    }
    
    public Player findPlayerById(Integer id) throws SQLException, ClassNotFoundException {
        Player player = null;
        connection = getConnection();
        statement = connection.prepareStatement(FIND_PLAYER_BY_ID);
        statement.setInt(1, id);
        ResultSet resultSet = statement.executeQuery();
        if(resultSet.next()) {
            player = new Player(
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("username"),
                    resultSet.getString("password"),
                    resultSet.getString("email")
            );
        }
        closeConnection(connection);
        return player;
    }


    public Integer deletePlayer (@RequestParam("id") Integer playerId)
        throws SQLException, ClassNotFoundException {

        Integer rowsDeleted = 0;
        connection = getConnection();
        statement = connection.prepareStatement(DELETE_PLAYER);
        statement.setInt(1, playerId);
        rowsDeleted = statement.executeUpdate();
        closeConnection(connection);
        return rowsDeleted;
    }
    
    public Integer updatePlayer(Integer playerId, Player newPlayer)
        throws SQLException, ClassNotFoundException {
        Integer rowsUpdated = 0;
        connection = getConnection();
        statement = connection.prepareStatement(UPDATE_PLAYER);
        statement.setString(1, newPlayer.getFirstName());
        statement.setString(2, newPlayer.getLastName());
        statement.setString(3, newPlayer.getUsername());
        statement.setString(4, newPlayer.getPassword());
        statement.setString(5, newPlayer.getEmail());
        statement.setInt(6, playerId);

        rowsUpdated = statement.executeUpdate();
        closeConnection(connection);
        return rowsUpdated;
    }
    
    public List<Player> findAllPlayers() throws ClassNotFoundException, SQLException {
        List<Player> players = new ArrayList<Player>();
        connection = getConnection();
        statement = connection.prepareStatement(FIND_ALL_PLAYERS);
        ResultSet resultSet = statement.executeQuery();
        while (resultSet.next()) {
            Player player = new Player(
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getString("username"),
                resultSet.getString("password"),
                resultSet.getString("email")
            );
            players.add(player);
        }
        closeConnection(connection);
        return players;
    }

    // creates new player and adds it to the database
    public Integer createPlayer(Player player)
            throws ClassNotFoundException, SQLException {

        long now = System.currentTimeMillis();
        Timestamp rn = new Timestamp(now);
        Integer rowsUpdated = 0;
        connection = getConnection();
        statement = connection.prepareStatement(CREATE_PLAYER);
        statement.setString(1, player.getFirstName());
        statement.setString(2, player.getLastName());
        statement.setString(3, player.getUsername());
        statement.setString(4, player.getPassword());
        statement.setString(5, player.getEmail());
        statement.setTimestamp(6, rn);
        rowsUpdated = statement.executeUpdate();
        closeConnection(connection);
        return rowsUpdated;
    }
    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        System.out.println("JDBC DAO");
        PlayerJdbcDao dao = new PlayerJdbcDao();

        //create user
//        Player adam = new Player("Adam", "Smith", "adams",
//            "invisiblehand", "gmailbruv");
////        User catherine = new User("Catherine", "Wood", "cathie", "bitcoinisbig", "https://ark-invest.com/");
////        User thomas = new User("Thomas", "Sowell", "thomas", "polymath", "http://www.tsowell.com/");
//          dao.createPlayer(adam);
////        dao.createUser(catherine);
////        dao.createUser(thomas);

        //find all users
//        List<Player> players = dao.findAllPlayers();
//        for(Player player: players) {
//            System.out.println(player.getUsername());
//        }

        //delete user
//        Player playerA = dao.findPlayerById(7);
//        System.out.println(playerA.getUsername());
//
//        dao.deletePlayer(7);
//        List<User> users = dao.findAllUsers();
//        for(User user: users) {
//            System.out.println(user.getUsername());
//        }
//
//        User newTom = new User(
//                "Tom",
//                "Sowell",
//                "tom",
//                "knowitall",
//                thomas.getProfilePicture());
//        dao.updateUser(6, newTom);
//        User tom = dao.findUserById(6);
//        System.out.println(tom.getUsername());
    }
}
