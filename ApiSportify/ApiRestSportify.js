let mysql = require("mysql");
let connection = mysql.createConnection({
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

app.post("/users/register", function(request, response) {
    let params = [request.body.name, request.body.lastName, request.body.password, request.body.rol, request.body.email, request.body.phone];
    let sql = "INSERT INTO users(`user_id`, `name`, `lastName`, `password`, `rol`,`email`, `phone`) " +
        "VALUES (NULL, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
            response.send(err);
        } else {
            console.log("nuevo usuario");
            response.send(resultado);
        }
    });
});

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

// END POINTS  TRAINING 

app.get("/training/:user_id", function(request, response) {
    let params = [request.params.user_id]
    let sql = "SELECT training.* FROM training "+
    "INNER JOIN training_team ON training_team.training_id = training.training_id "+
    "INNER JOIN team ON team.team_id = training_team.team_id "+
    "INNER JOIN user_teams ON user_teams.team_id = team.team_id "+
    "INNER JOIN users ON users.user_id = user_teams.user_id "+
    "WHERE users.user_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("entrenamientos del usuario");
            response.send(resultado);
        }
    });

});

app.get("/training/coach/:team_id", function(request, response) {
    let params = [request.params.team_id]
    let sql = "SELECT training.* FROM `training` "+
    "INNER JOIN training_team ON(training_team.training_id = training.training_id) "+
    "INNER JOIN team ON(team.team_id = training_team.team_id) "+
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

app.post("/training", function(request, response) {
    let params = [request.body.name, request.body.date, request.body.location, request.body.description];
    let sql = "INSERT INTO training(`training_id`, `name`, `date`, `location`, `description`)  "+
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

app.put("/training", function(request, response) {
    let params = [request.body.name, request.body.date, request.body.location, request.body.description, request.body.training_id]
    let sql = "UPDATE training SET name = ?, date = ?, location = ?, description = ? "+
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

app.get("/match/:team_id", function(request, response) {
    let params = [request.params.team_id];
    let sql = "SELECT t3.* FROM matches AS t3 " +
        "INNER JOIN matches_teams AS t2 on (t3.match_id = t2.match_id) "+
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
})

app.post("/match", function(request, response) {
    let params = [request.body.date, request.body.comments, request.body.rival, request.body.location];
    let sql = "INSERT INTO matches( `match_id`, `date`,`comments`,`rival`,`location`)  "+
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

app.get("/exercise/:training_id", function(request, response) {
    let params = [request.params.training_id]
    let sql = "SELECT exercise.* FROM exercise INNER JOIN training_exercises ON(training_exercises.exercise_id = exercise.exercise_id) INNER JOIN training ON (training.training_id = training_exercises.training_id) WHERE training.training_id = ?"

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

app.post("/exercise", function(request, response) {
    let params = [request.body.name, request.body.description, request.body.url, request.body.type];
    let sql = "INSERT INTO exercise( `exercise_id`, `name`, `description`, `url`, `type`)  "+
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

app.get("/users/teamPlayers/:team_id", function(request, response) {
    let params = [request.params.team_id];
    let sql = "SELECT users.name, users.lastName, users.email, users.phone, users.user_id FROM users "+
    "INNER JOIN user_teams ON (users.user_id = user_teams.user_id) "+
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

app.get("/users/coach/:id", function(request, response) {
    let params = [request.params.id]
    let sql = `SELECT users.* FROM users
    INNER JOIN user_teams ON user_teams.user_id = users.user_id
    INNER JOIN team ON user_teams.team_id = team.team_id
    WHERE team.team_id = ? AND users.rol = 'coach'`
    connection.query(sql, params, function(err, res) {
        if (err) {
            console.log(err)
            response.send(err)
        } else {
            console.log(params)
            response.send(res)
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
            response.send(res)
        } else {
            let id = res[0].user_id;
            let params1 = [id, request.body.team_id]
            let sql2 = "INSERT INTO user_teams (user_id, team_id) VALUES (?, ?)"
            connection.query(sql2, params1, function(err, res) {
                if (err) {
                    response.send(err)
                } else {
                    response.send(res)
                }
            })
        }
    })
});

app.listen("3025", () => {
    console.log("Server started on port 3025");
});