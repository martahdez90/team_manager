let mysql = require("mysql");
let connection = mysql.createConnection({
    // host: "185.224.137.151",
    // user: "u300024584_sportify",
    // password: "Sportify1234",
    // database: "u300024584_sportify"
    host: "localhost",
    user: "root",
    password: null,
    database: "sportify"
});
connection.connect(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('conexion correcta.');
    }
});
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
let cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// END POINTS USERS

//Registro

app.post("/users/register", function(request, response) {
    let params1 = [request.body.email]
    let sql1 = `SELECT email FROM users WHERE email = ?`
    connection.query(sql1, params1, function(err, res) {
        if (err) {
            response.send(err)
        } else if (res.length === 0) {
            let params = [request.body.name, request.body.lastName, request.body.password, request.body.rol, request.body.email, request.body.phone];
            let sql = "INSERT INTO users(`user_id`, `name`, `lastName`, `password`, `rol`,`email`, `phone`) " +
                "VALUES (NULL, ?, ?, ?, ?, ?, ?) ";
            connection.query(sql, params, function(err, resultado) {
                if (err) {
                    console.log(err);
                    response.send(err);
                } else {
                    console.log("nuevo usuario");
                    response.send({
                        resultado: resultado,
                        alerta: "1"
                    });
                }
            });
        } else {
            response.send(res)
        }
    })
});


//datos usuario login
app.get("/users/:user_id", function(request, response) {
    let params = [request.params.user_id];
    let sql = "SELECT * FROM users WHERE user_id = ?";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("usuario con id=?");
            response.send(resultado);
        }
    });
});

//actualizar usuario
app.put("/users", function(request, response) {
    let params = [request.body.name, request.body.lastName, request.body.password, request.body.rol, request.body.email, request.body.phone, request.body.user_id];
    let sql = "UPDATE users SET name =?, lastName = ?, password =?, rol =?, email = ?, phone = ?  WHERE user_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("usuario actualizado");
            response.send(resultado);
        }
    });
});

//eliminar usuario
app.delete("/users", function(request, response) {
    let params = [request.body.user_id];
    let sql = "DELETE FROM users WHERE user_id = ?;"

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("eliminar ejercicio");
            response.send(resultado);
        }
    });
})

// END POINTS TEAMS

//obtener equipos del usuario
app.get("/teams/:user_id", function(request, response) {
    let params = [request.params.user_id];
    let sql = "SELECT t3.* FROM users AS t1" +
        " INNER JOIN user_teams AS t2 ON(t1.user_id = t2.user_id)" +
        " INNER JOIN team AS t3 ON (t2.team_id = t3.team_id)" +
        " WHERE t1.user_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("equipos creados por el usuario");
            response.send(resultado);
        }
    });
});

//publicar nuevo equipo
app.post("/teams", function(request, response) {
    let params = [request.body.name, request.body.category]
        // let params1 = [request.body.user_id, resultado.insertId]
    let sql = "INSERT INTO team (`team_id`, `name`, `category`) VALUES(NULL, ?, ?)"

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log(resultado);
            let params1 = [resultado.insertId, request.body.user_id]
            let sql1 = "INSERT INTO user_teams (`team_id`, `user_id`) VALUES(?, ?) "
            connection.query(sql1, params1, function(err, res) {
                if (err) {
                    response.send(err)
                } else {
                    response.send(res)
                }
            });
        }
    });
});

//actualizar equipo
app.put("/teams", function(request, response) {
    let params = [request.body.name, request.body.category, request.body.team_id];
    let sql = "UPDATE team SET name = ?, category = ?  " +
        "WHERE team_id = ?"
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("actualiza un nuevo equipo al usuario");
            response.send(resultado);
        }
    });
});

//eliminar equipo
app.delete("/teams", function(request, response) {
    let params = [request.body.team_id]
    let sql = "DELETE FROM team WHERE team_id = ?"
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("eliminado");
            response.send(resultado);
        }
    });
});

// END POINTS TRAINING 

//obtener entrenamiento de un usuario
app.get("/training/players/:user_id", function(request, response) {
    let params = [request.params.user_id]

    let sql = ` SELECT training_team.team_id, training.*, team.name AS team FROM training
     AS training INNER JOIN training_team AS training_team ON ( training.training_id = training_team.training_id ) 
     INNER JOIN team AS team ON ( training_team.team_id = team.team_id ) INNER JOIN user_teams AS user_teams ON ( team.team_id = user_teams.team_id ) 
     INNER JOIN users AS users ON ( user_teams.user_id = users.user_id ) WHERE users.user_id = ? ORDER BY training.date ASC`;

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("entrenamientos del usuario");
            response.send(resultado);
        }
    });

});

//obtener entrenamientos del equipo
app.get("/training/coach/:team_id", function(request, response) {
    let params = [request.params.team_id]
    let sql = "SELECT training.* FROM `training` " +
        "INNER JOIN training_team ON(training_team.training_id = training.training_id) " +
        "INNER JOIN team ON(team.team_id = training_team.team_id) " +
        "WHERE team.team_id= ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("entrenamientos del usuario");
            response.send(resultado);
        }
    });

});

//publicar nuevo entrenamiento
app.post("/training", function(request, response) {
    let params = [request.body.name, request.body.date, request.body.location, request.body.description];
    let sql = "INSERT INTO training(`training_id`, `name`, `date`, `location`, `description`)  " +
        "VALUES(NULL, ?, ?, ?, ?) "

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            let param1 = [resultado.insertId, request.body.team_id]
            let sql1 = "INSERT INTO training_team(`training_id`, `team_id`) VALUES(?, ?)";
            connection.query(sql1, param1, function(err, res) {
                if (err) {
                    response.send(err)
                } else {
                    response.send(res)
                }
            })
        }
    });
});

//actualizar entrenamiento
app.put("/training", function(request, response) {
    let params = [request.body.name, request.body.date, request.body.location, request.body.description, request.body.training_id]
    let sql = "UPDATE training SET name = ?, date = ?, location = ?, description = ? " +
        "WHERE training_id = ?";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("nuevo entrenamineto");
            response.send(resultado);
        }
    });
});

//eliminar entrenamiento
app.delete("/training", function(request, response) {
    let params = [request.body.training_id];
    let sql = "DELETE FROM training WHERE training_id = ?";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("borrado el entrenammiento usuario");
            response.send(resultado);
        }
    });

});

//END POINT  MATCHES

//obtener partidos del equipo
app.get("/match/:team_id", function(request, response) {
    let params = [request.params.team_id];
    let sql = "SELECT t3.* FROM matches AS t3 " +
        "INNER JOIN matches_teams AS t2 on (t3.match_id = t2.match_id) " +
        "INNER JOIN team  AS t1 ON (t2.team_id = t1.team_id) " +
        "WHERE t1.team_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("partidos del usuario");
            response.send(resultado);
        }
    });
});

//obtener partidos del jugador
app.get("/match/player/:user_id", function(request, response) {
    let params = [request.params.user_id];

    let sql = `SELECT matches_teams.team_id,  matches_teams.match_id, team.name, matches.date, matches.rival, matches.location, matches.comments
     FROM matches AS matches INNER JOIN matches_teams AS matches_teams ON (matches.match_id = matches_teams.match_id) 
     INNER JOIN team AS team ON (matches_teams.team_id = team.team_id) INNER JOIN user_teams AS user_teams ON (team.team_id = user_teams.team_id) 
     INNER JOIN users AS users ON (user_teams.user_id = users.user_id) WHERE users.user_id = ? ORDER BY matches.date  ASC`;


    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("partidos del usuario");
            response.send(resultado);
        }
    });
});

//nuevo partido
app.post("/match", function(request, response) {
    let params = [request.body.date, request.body.comments, request.body.rival, request.body.location];
    let sql = "INSERT INTO matches( `match_id`, `date`,`comments`,`rival`,`location`)  " +
        "VALUES(NULL, ?, ?, ?, ?) "

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            let param1 = [resultado.insertId, request.body.team_id]
            let sql1 = "INSERT INTO matches_teams(match_id, team_id) VALUES(?, ?)";
            connection.query(sql1, param1, function(err, res) {
                if (err) {
                    response.send(err)
                } else {
                    response.send(res)
                }
            })
        }
    });
});

//actualizar partido
app.put("/match", function(request, response) {
    let params = [request.body.date, request.body.comments, request.body.rival, request.body.location, request.body.match_id];
    let sql = "UPDATE matches SET  date = ?, comments = ?, rival = ?, location = ? WHERE match_id = ?";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("actualñizar partido");
            response.send(resultado);
        }
    });

});

//eliminar partido
app.delete("/match", function(request, response) {
    let params = [request.body.match_id];
    let sql = "DELETE FROM matches WHERE match_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("eliminar partido");
            response.send(resultado);
        }
    });

});

// END POINT   EXERCISE

//obtener ejercicio
app.get("/exercise/:training_id", function(request, response) {
    let params = [request.params.training_id]
    let sql = "SELECT exercise.* FROM exercise " +
        "INNER JOIN training_exercises ON(training_exercises.exercise_id = exercise.exercise_id) " +
        "INNER JOIN training ON (training.training_id = training_exercises.training_id) " +
        "WHERE training.training_id = ?"

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log(request.params.training_id);
            console.log("ejercicios  del usuario");
            response.send(resultado);
        }
    });
});

//nuevo ejercicio
app.post("/exercise", function(request, response) {
    let params = [request.body.name, request.body.description, request.body.url, request.body.type];
    let sql = "INSERT INTO exercise( `exercise_id`, `name`, `description`, `url`, `type`)  " +
        "VALUES(NULL, ?, ?, ?, ?) "
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            let param1 = [resultado.insertId, request.body.training_id]
            let sql1 = "INSERT INTO training_exercises(exercise_id, training_id) VALUES(? , ?)";
            connection.query(sql1, param1, function(err, res) {
                if (err) {
                    response.send(err)
                } else {
                    response.send(res)
                }
            })
        }
    });
});

//actualizar ejercicio
app.put("/exercise", function(request, response) {
    let params = [request.body.name, request.body.description, request.body.url, request.body.type, request.body.exercise_id]
    let sql = "UPDATE exercise SET name = ?, description = ?, url = ?, type = ? WHERE exercise_id = ?";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.send(resultado);
        }
    });
});

//eliminar ejercicio
app.delete("/exercise", function(request, response) {
    let params = [request.body.exercise_id];
    let sql = "DELETE FROM exercise WHERE exercise_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("eliminar ejercicio");
            response.send(resultado);
        }
    });

});

// end point players

//obtener jugadores equipo
app.get("/users/teamPlayers/:team_id", function(request, response) {
    let params = [request.params.team_id];
    let sql = "SELECT users.name, users.lastName, users.email, users.phone, users.user_id FROM users " +
        "INNER JOIN user_teams ON (users.user_id = user_teams.user_id) " +
        "WHERE( user_teams.team_id = ? AND users.rol = 'player')"
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("usuarios que sean jugadores del equipo seleccionado");
            response.send(resultado);
        }
    });
});


//eliminar jugador equipo
app.delete("/users/teamPlayers/", function(request, response) {
    let params = [request.body.user_id];
    let sql = "DELETE FROM user_teams  WHERE user_id = ?";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("eliminar jugador de equipo");
            response.send(resultado);
        }
    });
});

//login jugador
app.post("/users/login", function(request, response) {
    let params = [request.body.password, request.body.email]
    let sql = "SELECT * FROM users WHERE password = ? AND email = ?"
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("jugador logeado");
            response.send(resultado);
        }
    });
})

//obtener entrenador equipo
app.get("/users/coach/:user_id", function(request, response) {
    let params = [request.params.user_id]
    let sql = `SELECT user_teams.team_id FROM user_teams
    INNER JOIN users ON users.user_id = user_teams.user_id
    WHERE users.user_id = ?`
    connection.query(sql, params, function(err, res) {
        if (err) {
            response.send(err)
        } else if (res.length === 0) {
            response.send(res)
        } else {
            console.log(res)
            let id = [res[0].team_id]
            console.log(id)
            let sql1 = `SELECT users.* FROM users
            INNER JOIN user_teams on user_teams.user_id = users.user_id
            INNER JOIN team on team.team_id = user_teams.team_id
            WHERE team.team_id = ? AND users.rol = 'coach'`
            connection.query(sql1, id, function(err, result) {
                if (err) {
                    response.send(err)
                } else {
                    response.send(result)
                }
            })
        }
    })
})

// Add player to team

app.post("/users/teamPlayers", function(request, response) {
    let params = [request.body.email, request.body.phone]
    let sql = "SELECT user_id FROM users WHERE email = ? AND  phone = ?"
    connection.query(sql, params, function(err, res) {
        if (err) {
            response.send(err)
        } else if (res.length === 0) {
            console.log('primer caso')
            res.length = 1
            response.send(res)
        } else {
            let id = res[0].user_id;
            let params1 = [id, request.body.team_id]
            let sql2 = "INSERT INTO user_teams (user_id, team_id) VALUES (?, ?)"
            connection.query(sql2, params1, function(err, res) {
                if (err) {
                    response.send(err)
                } else {
                    console.log('segundo caso');
                    console.log(res.affectedRows)
                    response.send(res)
                }
            })
        }
    })
});


//TORNEO
app.get("/tournament", function(request, response) {
    let sql = "SELECT * FROM tournament"
    connection.query(sql, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("toos los torneos");
            response.send(res);
        }
    })
})

app.get("/tournament/:team_id", function(request, response) {
    let params = [request.params.team_id];
    let sql = "SELECT t3.* FROM tournament AS t3 " +
        "INNER JOIN tournament_teams AS t2 on (t3.tournament_id = t2.tournament_id) " +
        "INNER JOIN team  AS t1 ON (t2.team_id = t1.team_id) " +
        "WHERE t1.team_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("partidos del usuario");
            response.send(resultado);
        }
    });
});

//obtener torneos del jugador
app.get("/tournament/player/:user_id", function(request, response) {
    let params = [request.params.user_id];
    let sql = "SELECT tournament.tournament_id, tournament.name, tournament.sport, tournament.date, tournament.category, tournament.location, tournament.description " +
        "FROM tournament  " +
        "INNER JOIN tournament_teams  ON (tournament.tournament_id = tournament_teams.tournament_id)" +
        "INNER JOIN team ON (tournament_teams.team_id = team.team_id) " +
        "INNER JOIN user_teams ON (team.team_id = user_teams.team_id) " +
        "INNER JOIN users ON (user_teams.user_id = users.user_id) WHERE users.user_id = ?"

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("torneos usuario del usuario");
            response.send(resultado);
        }
    });
});

//subscripcion a torneo
app.post("/tournament", function(request, response) {
    let params = [request.body.team_id, request.body.tournament_id]
    let sql = "INSERT INTO tournament_teams (`team_id`, `tournament_id`) VALUES (?, ?)"
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("torneo agregado");
            response.send(resultado);
        }
    });
})

//nuevo torneo
// app.post("/tournament", function(request, response) {
//     let params = [request.body.sport, request.body.date, request.body.category, request.body.description, request.body.location];
//     let sql = "INSERT INTO tournament ( `tournament_id`,`sport`, `date`,`category`,`description`,`location`)  " +
//         "VALUES(NULL, ?, ?, ?, ?, ?) "

//     connection.query(sql, params, function(err, resultado) {
//         if (err) {
//             console.log(err);
//         } else {
//             let param1 = [resultado.insertId, request.body.team_id]
//             let sql1 = "INSERT INTO tournament_teams(tournament_id, team_id) VALUES(?, ?)";
//             connection.query(sql1, param1, function(err, res) {
//                 if (err) {
//                     response.send(err)
//                 } else {
//                     response.send(res)
//                 }
//             })
//         }
//     });
// });

// //actualizar torneo
// app.put("/tournament", function(request, response) {
//     let params = [request.body.sport, request.body.date, request.body.category, request.body.description, request.body.location, request.body.tournament_id];
//     let sql = "UPDATE tournament SET   sport = ?, date = ?, category= ?, description = ?, location = ? WHERE tournament_id = ?";
//     connection.query(sql, params, function(err, resultado) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("actualñizar torneo");
//             response.send(resultado);
//         }
//     });

// });

// //eliminar torneo
// app.delete("/tournament", function(request, response) {
//     let params = [request.body.tournament_id];
//     let sql = "DELETE FROM tournament WHERE tournament_id = ?";

//     connection.query(sql, params, function(err, resultado) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("eliminar torneo");
//             response.send(resultado);
//         }
//     });

// });


//BUSQUEDAS

//buscar un jugador por nombre

//buscar entrenamiento por tipo


//buscar ejercicio por tipo





app.listen("3025", () => {
    console.log("Server started on port 3025");
});