import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux API
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
// libs
import { useRive, useStateMachineInput } from "rive-react";
// APIs
// Styles
import "./login.css";

const STATE_MACHINE_NAME = "State Machine 1";

const Login = () => {
  // Rive setup
  const { rive, RiveComponent } = useRive({
    src: "520-990-teddy-login-screen.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });
  const stateSuccess = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "success"
  );
  const stateFail = useStateMachineInput(rive, STATE_MACHINE_NAME, "fail");
  const stateHandUp = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "hands_up"
  );

  const stateCheck = useStateMachineInput(rive, STATE_MACHINE_NAME, "Check");
  const stateLook = useStateMachineInput(rive, STATE_MACHINE_NAME, "Look");

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSignIn = async () => {
    try {
      stateSuccess.fire();
      setTimeout(() => navigate("/products"), 500);
    } catch (error) {
      stateFail.fire();
      setLoginError(
        error?.response?.data?.message ||
          "Unable to login, please retry after sometime"
      );
    } finally {
      setIsLogging(false);
    }
  };

  const setLook = () => {
    if (!stateLook || !stateCheck || !setHangUp) {
      return;
    }
    setHangUp(false);
    setCheck(true);
    let nbChars = 0;
    if (user) {
      nbChars = parseFloat(user.split("").length);
    }
    let ratio = nbChars / parseFloat(41);
    let lookToSet = ratio * 100 - 25;
    stateLook.value = Math.round(lookToSet);
  };

  useEffect(() => {
    setLook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setLoginError("");
  }, [user, password]);

  const setHangUp = (hangUp) => {
    stateHandUp && (stateHandUp.value = hangUp);
  };

  const setCheck = (check) => {
    if (stateCheck) {
      stateCheck.value = check;
    }
  };

  const setToDefaultLook = () => {
    setHangUp(false);
    setCheck(false);
    let nbChars = 0;
    let ratio = nbChars / parseFloat(41);
    let lookToSet = ratio * 100 - 25;
    stateLook.value = Math.round(lookToSet);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setToDefaultLook();
    setIsLogging(true);
    setTimeout(() => handleSignIn(), 3000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          height: "77vh",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          borderRadius: "6px",
          padding: "0 20px",
        }}
      >
        <div className="rive-container">
          <RiveComponent
            style={{ width: "250px", height: "250px" }}
            src="520-990-teddy-login-screen.riv"
          />
        </div>
        <Typography pt={2} component="h1" variant="h5">
          Welcome to Whalemart
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(event) => setUser(event.target.value)}
            onBlur={setToDefaultLook}
            value={user}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          <TextField
            onChange={(event) => setPassword(event.target.value)}
            onFocus={() => setHangUp(true)}
            onBlur={setToDefaultLook}
            //onE
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <LoadingButton
            onBlur={setToDefaultLook}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!user || !password}
            loading={isLogging}
          >
            Sign In
          </LoadingButton>
          {loginError && <Alert severity="error">{loginError}</Alert>}
        </form>
      </Box>
      <Typography pt={1} textAlign="center" variant="body2" gutterBottom>
        Gaurang's Whalemart © 2024
      </Typography>
    </Container>
  );
};

export default Login;
