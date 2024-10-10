package com.development.Solar360;
import com.zoho.api.authenticator.OAuthToken;
import com.zoho.api.authenticator.Token;
import com.zoho.crm.api.Initializer;
import com.zoho.crm.api.dc.DataCenter;
import com.zoho.crm.api.dc.INDataCenter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Solar360Application {

	public static void main(String[] args) {

        SpringApplication.run(Solar360Application.class, args);
//        try
//        {
//            DataCenter.Environment environment = INDataCenter.PRODUCTION;
//            Token token = new OAuthToken.Builder().accessToken("1000.6b72195df34c25ae4ee2be2e7119d86b.ec3eec6b56c68a03ef29100a5ffc0fe6").build();
//            new Initializer.Builder().environment(environment).token(token).initialize();
//            String moduleAPIName = "Leads";
////			createRecords(moduleAPIName);
//        }
//        catch (Exception e)
//        {
//            e.printStackTrace();
//        }
	}
	

}


