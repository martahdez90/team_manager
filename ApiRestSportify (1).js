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

app.put("/users/:user_id", function(request, response) {
    let params = [request.body.name, request.body.lastName, request.body.password, request.rol, request.body.email, request.body.phone, request.params.user_id];
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



app.delete("/delete/", function(request, response) {
    let params = [request.body.user_id];
    let sql = "DELETE FROM user WHERE user_id = ? DELETE FROM user_teams WHERE user_id = ?";

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
    let sql = "SELECT t3.* FROM user t1 INNER JOIN user_teams t2 ON(t1.user_id = t2.user_id) INNER JOIN team t3(t2.team_id = t3.team_id) WHERE t1.user_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("equipos creados por el usuario");
            response.send(resultado);
        }
    });
});

app.post("/teams/", function(request, response) {
    let params = [request.body.name, request.body.category, request.body.user_id]
    let sql = "INSERT INTO team (`name`, `category`) VALUES(NULL, ?, ?)  INSERT INTO user_teams ( `user_id`, `team_id`) VALUES(NULL, ?, team_id.length) "
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("añadir uun nuevo equipo al usuario");
            response.send(resultado);
        }
    });

});

app.put("/teams/", function(request, response) {
    let params = [request.body.name, request.body.user_id, request.body.team_id];
    let sql = "UPDATE team SET t1.name = ? t1.category  (SELECT * FROM team t1 INNER JOIN user_team t2) WHERE t2.user_id = ? AND t1.team_id=?"
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("actualiza un nuevo equipo al usuario");
            response.send(resultado);
        }
    });
});

app.delete("/teams/", function(request, response) {
    let params = [request.body.team_id]
    let sql = "DELETE FROM team WHERE team_id = ? DELETE FROM user_team WHERE team_id = ?"
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

    let sql = "SELECT * FROM training t5 INNER JOIN user t1   INNER JOIN user teams t2 ON (t1.user_id = t2.user_id) INNER JOIN team t3 ON ( t2.team_id = t3.team_id) " +
        "INNER JOIN  training_team t4 ON (t3.team_id = t4.team_id) INNER JOIN training t5 ON (t4.training_team = t5.training) WHERE t1.user_id = ?";


    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("entrenamientos del usuario");
            response.send(resultado);
        }
    });

});

app.post("/training/", function(request, response) {
    let params = [request.body.name, request.body.date, request.body, location, request.body.description, request.body.team_id];
    let sql = "INSERT INTO training(`training_id`, `name`, `date`, `location`, `description`)  VALUES(NULL, ?, ?, ?, ?) " +
        " INSERT INTO training_team(`training_id`, `team_id`) VALUES(training_id.length, ?)";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("nuevo entrenamineto");
            response.send(resultado);
        }
    });
});


app.put("/training/", function(request, response) {
    let params = [request.body.name, request.body.date, request.body, location, request.body.description, request.body.team_id, request.body.training_id]
    let sql = "UPDATE training SET t1.name = ?, t1.date = ?, t1.location = ?, t1.description = ?" +
        "  (SELECT * FROM training t1 INNER JOIN training_teams t2 ON (t1.team_id = t2.team_id)) WHERE t2.team_id = ? AND t1.training_id = ?";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("nuevo entrenamineto");
            response.send(resultado);
        }
    });
});

app.delete("/training/", function(request, response) {
    let params = [request.body.training_id];
    let sql = "DELETE FROM training WHERE training_id = ? DELETE FROM training_user WHERE training_id = ?";
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
    let sql = "SELECT * FROM matches t5 INNER JOIN user t1 INNER JOIN user_teams t2 ON (t1.user_id = t2. user_id) INNER JOIN team t3 ON (t2.team_id = t3.team_id) " +
        " INNER JOIN matches_teams t4 ON (t3.team_id = t4.team_id) INNER JOIN matches t5 ON ( T4.team_id = t5.team_id) WHERE t1.user_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("partidos del usuario");
            response.send(resultado);
        }
    });

})

app.post("/match/", function(request, response) {
    let params = [request.body.team_id, request.body.date, request.body.location, request.body.comments, request.body.rival];
    let sql = "INSERT INTO matches( `match_id`, `date`, `location`, `comments`,`rival`)  VALUES(NULL, ?, ?, ?, ?) INSERT INTO matches_teams(match_id, team_id) VALUES(match_id.length, ?)";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("nuevo partido");
            response.send(resultado);
        }
    });
});


app.put("/match/", function(request, response) {
    let params = [request.body.team_id, request.body.match_id, ];
    let sql = "UPDATE matches SET t1.date = ?,  t1.date = ?, t1.location = ?, t1.comments = ? " +
        "(SELECT * FROM matches t1 INNER JOIN matches_teams t2 ON (t1.match_id = t2.match_id) WHERE t2.team_id = ?  AND t1.match_id = ?";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("actualñizar partido");
            response.send(resultado);
        }
    });

});

app.delete("/match/", function(request, response) {
    let params = [request.body.match_id];
    let sql = "DELETE FROM matches WHERE match_id = ? DELETE FROM matches_teams WHERE match_id = ?";

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

    let sql = "SELECT * FROM exercise t7 INNER JOIN user t1   INNER JOIN user teams t2 ON (t1.user_id = t2.user_id) INNER JOIN team t3 ON ( t2.team_id = t3.team_id) " +
        "INNER JOIN  training_team t4 ON (t3.team_id = t4.team_id) INNER JOIN training t5 ON (t4.training_team = t5.training) INNER JOIN training_exercises t6" +
        " ON (t5.training_id = t6.training_id) INNER JOIN exercise t7 ON(t6.exercise_id = t7.exercise_id) WHERE t1.user_id = ?";


    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("ejercicios  del usuario");
            response.send(resultado);
        }
    });

});


app.post("/exercise/", function(request, response) {
    let params = [request.body.exercise_id, request.body.name, request.body.description, request.body.url, request.body.type, request.body.training_id];
    let sql = "INSERT INTO exercise( `exercise_id`, `name`, `description`, `url`, `type`)  VALUES(NULL, ?, ?, ?, ?) " +
        "INSERT INTO training_exercises(exercise_id, training_id) VALUES(exercise_id.length, ?)";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("nuevo ejercicio");
            response.send(resultado);
        }
    });
});


app.put("/exercise/", function(request, response) {
    let params = [request.body.name, request.body.description, request.body.url, request.body.type]
    let sql = "UPDATE exercise SET t1.name = ?, t1.description = ?, t1.url = ?, t1.type = ?" +
        "  (SELECT * FROM exercise t1 INNER JOIN training_exercises t2 ON (t1.exercise_id = t2.exercise_id)) WHERE t1.exercise_id = ? AND t2.training_id = ?";
    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("actualizar ejercicio");
            response.send(resultado);
        }
    });
});


app.delete("/exercise/", function(request, response) {
    let params = [request.body.exercise_id];
    let sql = "DELETE FROM exercise WHERE exercise_id = ? DELETE FROM training_exercises WHERE exercise_id = ?";

    connection.query(sql, params, function(err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log("eliminar ejercicio");
            response.send(resultado);
        }
    });

});



app.listen(3025);