package com.development.Solar360;

import com.zoho.api.authenticator.OAuthToken;
import com.zoho.api.authenticator.Token;
import com.zoho.api.authenticator.store.DBStore;
import com.zoho.api.authenticator.store.FileStore;
import com.zoho.api.authenticator.store.TokenStore;
import com.zoho.api.logger.Logger;
import com.zoho.api.logger.Logger.Levels;
import com.zoho.crm.api.Initializer;
import com.zoho.crm.api.RequestProxy;
import com.zoho.crm.api.SDKConfig;
import com.zoho.crm.api.UserSignature;
import com.zoho.crm.api.dc.DataCenter.Environment;
import com.zoho.crm.api.dc.USDataCenter;

public class Initialize
{

    public static void initialize() throws Exception
    {
        /*
         * Create an instance of Logger Class that takes two parameters
         * level -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
         * filePath -> Absolute file path, where messages need to be logged.
         */
        Logger logger = new Logger.Builder()
                .level(Levels.INFO)
                .filePath("/Users/user_name/Documents/java_sdk_log.log")
                .build();
        //Create an UserSignature instance that takes user Email as parameter
        UserSignature user = new UserSignature("aniket@solar360.ai");
        /*
         * Configure the environment
         * which is of the pattern Domain.Environment
         * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
         * Available Environments: PRODUCTION, DEVELOPER, SANDBOX
         */
        Environment environment = USDataCenter.PRODUCTION;
        /*
         * Create a Token instance that requires the following
         * clientId -> OAuth client id.
         * clientSecret -> OAuth client secret.
         * refreshToken -> REFRESH token.
         * grantToken -> GRANT token.
         * id -> User unique id.
         * redirectURL -> OAuth redirect URL.
         */
        // if grant token is available
//        code = 1000.af1bd34b22e1a510a6c167bf2318faa8.f9c54d75551828606c46ba651cd12b53
        Token token = new OAuthToken.Builder()
                .clientID("1000.ISSL008JD15OG31GVOD8ZUVKY2FSBK")
                .clientSecret("401ad641818d3dbf979ec7ccedf2092372905ef68d")
                .grantToken("1000.422fc15ead1288e883b93ece91ccdfeb.c5f724f356711cfc1fb10c61dd596885")
                .redirectURL("http://google.com/oauth2/callback")
                .build();
        /*
         * Create an instance of DBStore that requires the following
         * host -> DataBase host name. Default value "localhost"
         * databaseName -> DataBase name. Default  value "zohooauth"
         * userName -> DataBase user name. Default value "root"
         * password -> DataBase password. Default value ""
         * portNumber -> DataBase port number. Default value "3306"
         * tabletName -> DataBase table name. Default value "oauthtoken"
         */
//        TokenStore tokenstore = new DBStore.Builder().build();
//        TokenStore tokenstore = new DBStore.Builder()
//                .host("hostName")
//                .databaseName("databaseName")
//                .tableName("tableName")
//                .userName("userName")
//                .password("password")
//                .portNumber("portNumber")
//                .build();
//        TokenStore tokenstore = new FileStore("absolute_file_path");
        /*
         * autoRefreshFields
         * if true - all the modules' fields will be auto-refreshed in the background, every hour.
         * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or refresh the fields using methods from ModuleFieldsHandler(com.zoho.crm.api.util.ModuleFieldsHandler)
         *
         * pickListValidation
         * A boolean field that validates user input for a pick list field and allows or disallows the addition of a new value to the list.
         * if true - the SDK validates the input. If the value does not exist in the pick list, the SDK throws an error.
         * if false - the SDK does not validate the input and makes the API request with the user’s input to the pick list
         */
        SDKConfig sdkConfig = new SDKConfig.Builder()
                .autoRefreshFields(false)
                .pickListValidation(true)
                .build();
        String resourcePath = "/Users/user_name/Documents/javasdk-application";
        /*
         * Create an instance of RequestProxy
         * host -> proxyHost
         * port -> proxyPort
         * user -> proxyUser
         * password -> password
         * userDomain -> userDomain
         */
//        RequestProxy requestProxy = new RequestProxy.Builder()
//                .host("host")
//                .port(proxyPort)
//                .user("userName")
//                .password("password")
//                .userDomain("userDomain")
//                .build();
        /*
         * Set the following in InitializeBuilder
         * user -> UserSignature instance
         * environment -> Environment instance
         * token -> Token instance
         * store -> TokenStore instance
         * SDKConfig -> SDKConfig instance
         * resourcePath -> resourcePath - A String
         * logger -> Log instance (optional)
         * requestProxy -> RequestProxy instance (optional)
         */
        new Initializer.Builder()
                .user(user)
                .environment(environment)
                .token(token)
                .logger(logger)
                .initialize();
    }
}
