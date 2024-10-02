package com.development.Solar360;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Solar360Application {

	public static void main(String[] args) {

        SpringApplication.run(Solar360Application.class, args);

		Initialize init = new Initialize();
	 		try {
			init.initialize();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

}


