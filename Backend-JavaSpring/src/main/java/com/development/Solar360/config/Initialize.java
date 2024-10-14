package com.development.Solar360.config;

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
        
        Logger logger = new Logger.Builder()
                .level(Levels.INFO)
                .filePath("C:\\Users\\anike\\OneDrive\\Documents\\GitHub\\CRM-Solar360-ai\\java_sdk_log.log")
                .build();
        
        UserSignature user = new UserSignature("aniket@solar360.ai");
        
        Environment environment = USDataCenter.PRODUCTION;
      
        Token token = new OAuthToken.Builder()
//                .clientID("1000.ISSL008JD15OG31GVOD8ZUVKY2FSBK")
//                .clientSecret("401ad641818d3dbf979ec7ccedf2092372905ef68d")
                .accessToken("1000.c41fd8352a423f71ea1817aa6996863c.12e46f69dcd796064445f33e61678f02")
                .findUser(false)
//                .redirectURL("http://google.com/oauth2/callback")
                .build();
        
        SDKConfig sdkConfig = new SDKConfig.Builder()
                .autoRefreshFields(false)
                .pickListValidation(true)
                .build();
        String resourcePath = "C:/Users/anike/OneDrive/Documents/GitHub/CRM-Solar360-ai/javasdk-application";
        
        new Initializer.Builder()
		.environment(environment)
		.token(token)
		.SDKConfig(sdkConfig)
		.resourcePath(resourcePath)
		.logger(logger)
		.initialize();
        
        System.out.println("Initialization Done.");
    }
}
