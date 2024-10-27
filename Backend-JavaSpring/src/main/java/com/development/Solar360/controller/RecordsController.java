package com.development.Solar360.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.zoho.api.authenticator.OAuthToken;
import com.zoho.api.authenticator.Token;
import com.zoho.crm.api.HeaderMap;
import com.zoho.crm.api.Initializer;
import com.zoho.crm.api.ParameterMap;
import com.zoho.crm.api.attachments.Attachment;
import com.zoho.crm.api.attachments.ParentId;
import com.zoho.crm.api.dc.USDataCenter;
import com.zoho.crm.api.dc.DataCenter.Environment;
import com.zoho.crm.api.dc.DataCenter;
import com.zoho.crm.api.dc.INDataCenter;
import com.zoho.crm.api.record.APIException;
import com.zoho.crm.api.record.Comment;
import com.zoho.crm.api.record.Consent;
import com.zoho.crm.api.record.FileDetails;
import com.zoho.crm.api.record.ImageUpload;
import com.zoho.crm.api.record.Info;
import com.zoho.crm.api.record.LineTax;
import com.zoho.crm.api.record.Participants;
import com.zoho.crm.api.record.PricingDetails;
import com.zoho.crm.api.record.RecordOperations;
import com.zoho.crm.api.record.RecurringActivity;
import com.zoho.crm.api.record.RemindAt;
import com.zoho.crm.api.record.ResponseHandler;
import com.zoho.crm.api.record.ResponseWrapper;
import com.zoho.crm.api.record.Tax;
import com.zoho.crm.api.record.RecordOperations.GetRecordsHeader;
import com.zoho.crm.api.record.RecordOperations.GetRecordsParam;
import com.zoho.crm.api.tags.Tag;
import com.zoho.crm.api.users.MinifiedUser;
import com.zoho.crm.api.util.APIResponse;
import com.zoho.crm.api.util.Choice;
import com.zoho.crm.api.util.Model;

import com.development.Solar360.model.io.LeadRequest;
import com.development.Solar360.records.CreateRecords;
import com.development.Solar360.records.GetRecords;
import com.zoho.crm.api.record.ResponseHandler;
import com.zoho.crm.api.util.APIResponse;

@RestController
@RequestMapping("/getRecordsList")
public class RecordsController {

	@GetMapping("/getRecords")
	public ResponseEntity<Object> getRecords() {

		List<com.zoho.crm.api.record.Record> records = null;


		try {
			// Call the createRecords method with the data from the request
			APIResponse<ResponseHandler> response = GetRecords.getRecords("Leads");
			System.out.println(response);


			if (response != null)
			{
				System.out.println("Status Code: " + response.getStatusCode());
				if (Arrays.asList(204, 304).contains(response.getStatusCode()))
				{
					if(response.getStatusCode() == 204) {
						return new ResponseEntity<>("No Content",HttpStatus.NO_CONTENT);
					}else {
						return new ResponseEntity<>("Not Modified",HttpStatus.NOT_MODIFIED);
					}
				}
				if (response.isExpected())
				{
					ResponseHandler responseHandler = response.getObject();
					if (responseHandler instanceof ResponseWrapper)
					{
						ResponseWrapper responseWrapper = (ResponseWrapper) responseHandler;
						records = responseWrapper.getData();

						// Log the records to verify
						for (com.zoho.crm.api.record.Record record : records) {
							System.out.println("Record ID: " + record.getId());
							System.out.println("Record Data: " + record.getKeyValues());
						}


					}
					return new ResponseEntity<>(records, HttpStatus.OK);
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error getting records: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(records, HttpStatus.OK);
	}
}
