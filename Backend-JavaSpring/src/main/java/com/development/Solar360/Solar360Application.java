package com.development.Solar360;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.zoho.api.authenticator.OAuthToken;
import com.zoho.api.authenticator.Token;
import com.zoho.api.authenticator.store.DBStore;
import com.zoho.api.authenticator.store.TokenStore;
import com.zoho.api.logger.Logger;
import com.zoho.api.logger.Logger.Levels;
import com.zoho.crm.api.Initializer;
import com.zoho.crm.api.RequestProxy;
import com.zoho.crm.api.SDKConfig;
import com.zoho.crm.api.UserSignature;
import com.zoho.crm.api.dc.DataCenter.Environment;
import com.zoho.crm.api.dc.USDataCenter;

@SpringBootApplication
public class Solar360Application {

	public static void main(String[] args) {
		initialize();
		SpringApplication.run(Solar360Application.class, args);
	}
	
	public static void initialize() throws Exception
    {
        /*
        * Create an instance of Logger Class that takes two parameters
        * 1 -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
        * 2 -> Absolute file path, where messages need to be logged.
        */
        Logger logger = Logger.getInstance(Levels.INFO, "/Users/user_name/Documents/java_sdk_log.log");

        //Create an UserSignature instance that takes user Email as parameter
        UserSignature user = new UserSignature("abc@zoho.com");

        /*
        * Configure the environment
        * which is of the pattern Domain.Environment
        * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
        * Available Environments: PRODUCTION, DEVELOPER, SANDBOX
        */
        Environment environment = USDataCenter.DEVELOPER;

        /*
        * Create a Token instance
        * 1 -> OAuth client id.
        * 2 -> OAuth client secret.
        * 3 -> REFRESH/GRANT token.
        * 4 -> Token type(REFRESH/GRANT).
        * 5 -> OAuth redirect URL.
        */
        Token token = new OAuthToken("clientId", "clientSecret", "REFRESH/GRANT token", TokenType.REFRESH/GRANT, "redirectURL");

        /*
        * Create an instance of TokenStore.
        * 1 -> DataBase host name. Default "localhost"
        * 2 -> DataBase name. Default "zohooauth"
        * 3 -> DataBase user name. Default "root"
        * 4 -> DataBase password. Default ""
        * 5 -> DataBase port number. Default "3306"
        */
        //TokenStore tokenstore = new DBStore();
        TokenStore tokenstore = new DBStore("hostName", "dataBaseName", "userName", "password", "portNumber", "");

        //TokenStore tokenstore = new FileStore("absolute_file_path");

        /*
         * autoRefreshFields
         * if true - all the modules' fields will be auto-refreshed in the background, every    hour.
         * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or refresh the fields using methods from ModuleFieldsHandler(com.zoho.crm.api.util.ModuleFieldsHandler)
         *
         * pickListValidation
         * if true - value for any picklist field will be validated with the available values.
         * if false - value for any picklist field will not be validated, resulting in creation of a new value.
         */
        SDKConfig sdkConfig = new SDKConfig.Builder().autoRefreshFields(false).pickListValidation(true).build();

        String resourcePath = "/Users/user_name/Documents/javasdk-application";

        /**
         * Create an instance of RequestProxy class that takes the following parameters
         * 1 -> Host
         * 2 -> Port Number
         * 3 -> User Name
         * 4 -> Password
         * 5 -> User Domain
         */
        // RequestProxy requestProxy = new RequestProxy("proxyHost", "proxyPort", "proxyUser", "password");

        RequestProxy requestProxy = new RequestProxy("proxyHost", "proxyPort", "proxyUser", "password", "userDomain");

        /*
        * The initialize method of Initializer class that takes the following arguments
        * 1 -> UserSignature instance
        * 2 -> Environment instance
        * 3 -> Token instance
        * 4 -> TokenStore instance
        * 5 -> SDKConfig instance
        * 6 -> resourcePath -A String
        * 7 -> Logger instance
        * 8 -> RequestProxy instance
        */

        // The following are the available initialize methods

        Initializer.initialize(user, environment, token, tokenstore, sdkConfig, resourcePath);

        Initializer.initialize(user, environment, token, tokenstore, sdkConfig, resourcePath, logger);

        Initializer.initialize(user, environment, token, tokenstore, sdkConfig, resourcePath, requestProxy);

        Initializer.initialize(user, environment, token, tokenstore, sdkConfig, resourcePath, logger, requestProxy);
    }
}

}
