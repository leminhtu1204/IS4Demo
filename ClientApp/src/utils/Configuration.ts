import config from "react-global-configuration";

const authenticateConfig = ({
    authorizationUrl: 'http://localhost:5000/connect/authorize',
    client_id:'mvc',
    redirect_uri: 'http://localhost:3000/login',
    response_type : "token",
    scope : "api01",
    state : Date.now() + "" + Math.random()
})


export default authenticateConfig