package com.example.HotelManager.Service;

import org.springframework.stereotype.Service;

import com.example.HotelManager.Entity.User;

@Service
public interface UserService {
	public User saveDetails(User user);

	public void removeUserById(int id);

	public User getUserById(int id);

	public boolean check_existed(String user);
	
	public boolean checkSessionExisted(String sessionId);

	public record UserRequest(String full_name, String user_name, String phone, String email, String user_password) {

	}

	public record LoginRequest(String user_name, String user_password) {

	}

	public record UserInput(String userInput) {

	}
	
	public record AddAccount(String user_name, String user_password, boolean active, String role) {
		
	}
	
	public record ChangePassword(String old_pass, String new_pass, String repeat) {
		
	}
	
}