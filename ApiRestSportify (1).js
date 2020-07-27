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
const { request } = require("http");
const app = express();
let cors = require('cors');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// END POINTS USERS

app.post("/users/register", function(request, response) {
    let params = [request.body.name, request.body.lastName, request.body.password, request.body.rol, request.body.email, request.body.phone];
    let sql = "INSERT INTO user(`user_id`, `name`, `lastName`, `password`, `rol`,`email`, `phone`) VALUES (NULL, ?, ?, ?, ?, ?, ?)";
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
    let sql = "SELECT * FROM user WHERE user_id = ?";
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
    let sql = "UPDATE user SET name =?, lastName = ?, password =?, rol =?, email = ?, phone = ?  WHERE user_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("usuario actualizado");
            response.send(resultado);
        }
    });
});

// DELETE FROM user WHERE user_id = ? DELETE FROM user_teams WHERE user_id = ? 
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
// ERROR
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

app.get("/training/:team_id", function(request, response) {
    let params = [request.params.team_id]
        // "INNER JOIN training AS t5 ON (t4.training_id = t5.training_id) "
    let sql = "SELECT t3.* FROM training AS t3 " +
        "INNER JOIN training_team AS t2 ON (t3.training_id = t2.training_id)" +
        "INNER JOIN team AS t1 ON (t1.team_id  = t2.team_id)" +
        "WHERE t1.team_id =1"

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
    let sql = "INSERT INTO training(`training_id`, `name`, `date`, `location`, `description`)  VALUES(NULL, ?, ?, ?, ?) "


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
    let sql = "UPDATE training SET name = ?, date = ?, location = ?, description = ? WHERE training_id = ?";
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

app.get("/match/:user_id", function(request, response) {
    let params = [request.params.user_id];
    let sql = "SELECT t5.date, t5.location, t5.comments FROM matches AS t5 " +
        "INNER JOIN users AS t1 INNER JOIN user_teams t2 ON (t1.user_id = t2. user_id) " +
        "INNER JOIN team AS t3 ON (t2.team_id = t3.team_id) " +
        "INNER JOIN matches_teams AS t4 ON (t3.team_id = t4.team_id) " +
        "WHERE t1.user_id = ?";

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
    let params = [request.body.date, request.body.location, request.body.comments];
    let sql = "INSERT INTO matches( `match_id`, `date`, `location`, `comments`)  VALUES(NULL, ?, ?, ?) "

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
    let params = [request.body.date, request.body.location, request.body.comments, request.body.match_id];
    let sql = "UPDATE matches SET  date = ?, location = ?, comments = ? WHERE match_id = ?";
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



app.get("/exercise/:user_id", function(request, response) {
    let params = [request.params.user_id]
    let sql = "SELECT t7.name, t7.description, t7.url, t7.type FROM exercise AS t7 INNER JOIN users AS t1 " +
        "INNER JOIN user_teams AS t2 ON (t1.user_id = t2.user_id) " +
        "INNER JOIN team AS t3 ON ( t2.team_id = t3.team_id) " +
        "INNER JOIN  training_team AS t4 ON (t3.team_id = t4.team_id) " +
        "INNER JOIN training AS t5 ON (t4.training_id = t5.training_id) " +
        "INNER JOIN training_exercises AS t6 ON (t5.training_id = t6.training_id) " +
        "WHERE t1.user_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("ejercicios  del usuario");
            response.send(resultado);
        }
    });
});


app.post("/exercise", function(request, response) {
    let params = [request.body.name, request.body.description, request.body.url, request.body.type];
    let sql = "INSERT INTO exercise( `exercise_id`, `name`, `description`, `url`, `type`)  VALUES(NULL, ?, ?, ?, ?) "
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
    let sql = "SELECT users.name, users.lastName, users.email, users.phone, users.user_id FROM users INNER JOIN user_teams ON (users.user_id = user_teams.user_id) WHERE( user_teams.team_id = ? AND users.rol = 'player')"
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("usuarios que sean jugadores del equipo seleccionado");
            response.send(resultado);
        }
    });
});
app.post("/users/teamPlayers", function(request, response) {
    let params = [request.body.phone, request.body.email]
    let sql = "SELECT * FROM users WHERE phone= ? AND email = ?"
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log(resultado)
            let param1 = [resultado.insertId, request.body.team_id];
            let sql1 = "INSERT INTO user_teams(user_id, team_id) VALUES(?, ?) ";
            connection.query(sql1, param1, function(err, res) {
                if (err) {
                    response.send(err)
                } else {
                    response.send(res)
                }
            })

        }
    });
})



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

app.listen(3025);