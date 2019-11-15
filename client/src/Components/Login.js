import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  Form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "600px",
    margin: "0 auto",
    background: "white",
    borderRadius: "5px",
    boxShadow: "2px 4px 5px #000",
    padding: "30px 50px",
    fontFamily: "Lato, sans-serif"
  },
  TextField: {
    width: "400px",
    margin: "5px 0"
  },
  Input: {
    fontSize: "24px",
    fontFamily: "Lato, sans-serif"
  },
  Label: {
    fontSize: "18px",
    fontFamily: "Lato, sans-serif"
  },
  Button: {
    width: "440px",
    margin: "10px 0",
    fontSize: "18px",
    fontFamily: "Lato, sans-serif"
  }
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3300/api/auth/login", {
        username,
        password
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        history.push("/");
      }

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className={classes.Form} onSubmit={handleSubmit}>
        <div>
          <h2>Login</h2>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item style={{ paddingBottom: "18px" }}>
              <PersonIcon className={classes.Icon} />
            </Grid>
            <Grid item>
              <TextField
                id="username"
                label="Username"
                name="username"
                type="text"
                shrink="false"
                className={classes.TextField}
                onChange={e => setUsername(e.target.value)}
                value={username}
                InputProps={{ className: classes.Input }}
                InputLabelProps={{ className: classes.Label }}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item style={{ paddingBottom: "18px" }}>
              <LockIcon />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                className={classes.TextField}
                InputProps={{ className: classes.Input }}
                InputLabelProps={{ className: classes.Label }}
              />
            </Grid>
          </Grid>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.Button}
        >
          Login!
        </Button>
        <p>
          Don't have an account? <Link to="/register">Sign up now!</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
