package com.vm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vm.vo.LoginRequest;

@CrossOrigin(origins = "*",allowCredentials= "true", maxAge = 360000)
@RestController
@RequestMapping("/api")
public class LoginController {

	 @PostMapping("/login")
	    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
	        // Replace this with your in-memory user validation logic
	        UserDetails user = loadUserByUsername(loginRequest.getUsername());

	        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
	            return new ResponseEntity<String>("Login successful", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<String>( "Login Failure", HttpStatus.BAD_REQUEST);
	        }
	    }

	    // Simulate in-memory user validation (replace with your actual logic)
	    private UserDetails loadUserByUsername(String username) {
	        if ("admin".equals(username)) {
	            return User.withUsername("admin")
	                    .password("admin")
	                    .roles("USER")
	                    .build();
	        }
	        return null;
	    }
}

