package com.kanbanboard.usermanagement.security;

public class SecurityConstants {
     // Paths for user management
     public static final String BASE_USER_PATH = "/api/users";
     public static final String GET_USER_PATH = BASE_USER_PATH + "/{nuid}";
     public static final String GET_USERS_PATH = BASE_USER_PATH;
     public static final String GET_TASKS = BASE_USER_PATH + "/{userId}/tasks";

     public static final String REGISTER_PATH = BASE_USER_PATH;
     public static final String UPDATE_USER_PROFILE_PATH = BASE_USER_PATH + "/profile/{nuid}";
     public static final String UPDATE_USER_PASSWORD_PATH = BASE_USER_PATH + "/password/{nuid}";
     public static final String UPDATE_USER_PATH = BASE_USER_PATH + "/{nuid}";

     public static final String DELETE_USER_PATH = BASE_USER_PATH + "/{nuid}";
 
    


    public static final int TOKEN_EXPIRATION  = 7200000; // 7200 seconds (2 hours) * 1000 (ms)
    public static final String SECRET_KEY = "a67e6f865a0b50673f88f62fc0ad02dacb82b8bd02ef1e79162f41519cae150a0c3931c2cf6e457a4e72555ea72e94e52a2b9602622de8e37c68b3d50eadb025"; // Public path that clients can use to register.
    public static final String BEARER = "Bearer "; // Authorization : "Bearer " + Token 
    public static final String AUTHORIZATION = "Authorization"; // "Authorization" : Bearer Token


}
