package com.files;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FilesApplication {
//	public static final String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/";;
	public static void main(String[] args) {
		SpringApplication.run(FilesApplication.class, args);

//		System.out.println(DIRECTORY);
	}

}
