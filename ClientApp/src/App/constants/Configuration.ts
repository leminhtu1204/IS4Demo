export default class Configuration {
  public static ACCESS_TOKEN = "ACCESS_TOKEN";
  public static API_URI = "https://localhost:44355/graphql";
  public static AUTH_URL = "http://localhost:5000/connect/authorize";
  public static CLIENT_ID = "mvc";
  public static REDIRECT_URI = "http://localhost:5002/login";
  public static RESPONSE_TYPE = "token";
  public static SCOPE = "api01";
  public static STATE = Date.now() + "" + Math.random();
  public static LOGOUT_URL = "http://localhost:5000/Account/Logout";
}
