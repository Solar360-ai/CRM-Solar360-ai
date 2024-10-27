package com.development.Solar360.records;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.development.Solar360.model.io.LeadRequest;
import com.zoho.api.authenticator.OAuthToken;
import com.zoho.api.authenticator.Token;
import com.zoho.crm.api.HeaderMap;
import com.zoho.crm.api.Initializer;
import com.zoho.crm.api.dc.DataCenter;
import com.zoho.crm.api.dc.DataCenter.Environment;
import com.zoho.crm.api.dc.INDataCenter;
import com.zoho.crm.api.dc.USDataCenter;
import com.zoho.crm.api.record.APIException;
import com.zoho.crm.api.record.ActionHandler;
import com.zoho.crm.api.record.ActionResponse;
import com.zoho.crm.api.record.ActionWrapper;
import com.zoho.crm.api.record.BodyWrapper;
import com.zoho.crm.api.record.Field;
import com.zoho.crm.api.record.RecordOperations;
import com.zoho.crm.api.record.SuccessResponse;
import com.zoho.crm.api.tags.Tag;
import com.zoho.crm.api.util.APIResponse;
import com.zoho.crm.api.util.Choice;
import com.zoho.crm.api.util.Model;

public class CreateRecords
{
	
	public static void createRecords(String moduleAPIName, LeadRequest leadRequest) throws Exception
	{
		DataCenter.Environment environment = INDataCenter.PRODUCTION;
		Token token = new OAuthToken.Builder().accessToken("1000.bc4b542f4a8452bf550964065e12fb3d.08af3557b194fd421b51a367a25444be").build();
		new Initializer.Builder().environment(environment).token(token).initialize();


		RecordOperations recordOperations = new RecordOperations(moduleAPIName);
		BodyWrapper bodyWrapper = new BodyWrapper();
		List<com.zoho.crm.api.record.Record> records = new ArrayList<com.zoho.crm.api.record.Record>();
		com.zoho.crm.api.record.Record record1 = new com.zoho.crm.api.record.Record();
//        record1.addFieldValue(Field.Accounts.ACCOUNT_NAME, "Wattamwar");
		record1.addFieldValue(Field.Leads.LAST_NAME, leadRequest.getLastName());
		record1.addFieldValue(Field.Leads.FIRST_NAME, leadRequest.getFirstName());
		record1.addFieldValue(Field.Leads.COMPANY, leadRequest.getCompany());
        record1.addFieldValue(Field.Leads.PHONE, leadRequest.getPhone());
//		record1.addFieldValue(Field.Leads.Lea;
		record1.addFieldValue(Field.Leads.LEAD_STATUS, new Choice<String>("Cold"));
		List<Tag> tagList = new ArrayList<Tag>();
		Tag tag = new Tag();
		tag.setName("Testtask");
		tagList.add(tag);
		record1.setTag(tagList);
		records.add(record1);
		bodyWrapper.setData(records);
		HeaderMap headerInstance = new HeaderMap();
		APIResponse<ActionHandler> response = recordOperations.createRecords(bodyWrapper, headerInstance);
		if (response != null)
		{
			System.out.println("Status Code: " + response.getStatusCode());
			if (response.isExpected())
			{
				ActionHandler actionHandler = response.getObject();
				if (actionHandler instanceof ActionWrapper)
				{
					ActionWrapper actionWrapper = (ActionWrapper) actionHandler;
					List<ActionResponse> actionResponses = actionWrapper.getData();
					for (ActionResponse actionResponse : actionResponses)
					{
						if (actionResponse instanceof SuccessResponse)
						{
							SuccessResponse successResponse = (SuccessResponse) actionResponse;
							System.out.println("Status: " + successResponse.getStatus().getValue());
							System.out.println("Code: " + successResponse.getCode().getValue());
							System.out.println("Details: ");
							for (Map.Entry<String, Object> entry : successResponse.getDetails().entrySet())
							{
								System.out.println(entry.getKey() + ": " + entry.getValue());
							}
							System.out.println("Message: " + successResponse.getMessage().getValue());
						}
						else if (actionResponse instanceof APIException)
						{
							APIException exception = (APIException) actionResponse;
							System.out.println("Status: " + exception.getStatus().getValue());
							System.out.println("Code: " + exception.getCode().getValue());
							System.out.println("Details: ");
							for (Map.Entry<String, Object> entry : exception.getDetails().entrySet())
							{
								System.out.println(entry.getKey() + ": " + entry.getValue());
							}
							System.out.println("Message: " + exception.getMessage().getValue());
						}
					}
				}
				else if (actionHandler instanceof APIException)
				{
					APIException exception = (APIException) actionHandler;
					System.out.println("Status: " + exception.getStatus().getValue());
					System.out.println("Code: " + exception.getCode().getValue());
					System.out.println("Details: ");
					for (Map.Entry<String, Object> entry : exception.getDetails().entrySet())
					{
						System.out.println(entry.getKey() + ": " + entry.getValue());
					}
					System.out.println("Message: " + exception.getMessage().getValue());
				}
			}
			else
			{
				Model responseObject = response.getModel();
				Class<? extends Model> clas = responseObject.getClass();
				java.lang.reflect.Field[] fields = clas.getDeclaredFields();
				for (java.lang.reflect.Field field : fields)
				{
					System.out.println(field.getName() + ":" + field.get(responseObject));
				}
			}
		}
	}

//	public static void main(String[] args)
//	{
//		try
//		{
//			Environment environment = INDataCenter.PRODUCTION;
//			Token token = new OAuthToken.Builder().accessToken("1000.63962993bd28481eb8bb21dcfc01ea1a.62811b512f5e4047112d8076b75c6b4b").build();
//			new Initializer.Builder().environment(environment).token(token).initialize();
//			String moduleAPIName = "Leads";
////			createRecords(moduleAPIName);
//		}
//		catch (Exception e)
//		{
//			e.printStackTrace();
//		}
//	}
}
