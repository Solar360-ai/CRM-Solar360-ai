package com.development.Solar360;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/addlead")
public class LeadController {

    @PostMapping("/create-lead")
    public ResponseEntity<String> createLead(@RequestBody LeadRequest leadRequest) {
        try {
            // Call the createRecords method with the data from the request
            CreateRecords.createRecords("Leads", leadRequest);
            return new ResponseEntity<>("Lead created successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error creating lead: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
