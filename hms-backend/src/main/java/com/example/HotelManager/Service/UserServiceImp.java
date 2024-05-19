package com.example.HotelManager.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.HotelManager.Repository.UserAccountRepository;
import com.example.HotelManager.Repository.UserRepository;

import com.example.HotelManager.Repository.UserSessionRepository;
import com.example.HotelManager.Entity.User;
import com.example.HotelManager.Entity.UserAccount;
import com.example.HotelManager.Entity.UserSession;


@Component
public class UserServiceImp implements UserService{
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private UserAccountRepository userAccRepo;
	

	@Autowired
    private UserSessionRepository userSessionRepository;
	
	@Autowired
	private UserSessionRepository userSessionRepo;
	@Override
	public boolean check_existed(String userAcc) {
		Optional<UserAccount> userOptional = userAccRepo.findByUserName(userAcc);

		if (userOptional.isPresent()) {
		    return true;
		} else {
		    return false;
		}
	}
	
	@Override

	public boolean checkSessionExisted(String userSession) {
		Optional<UserSession> uSession = userSessionRepo.findById(userSession);

		if (uSession.isPresent()) {
		    return true;
		} else {
		    return false;
		}
	}
	
	@Override

	public User saveDetails(User user) {	
		BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
		String encryptedPass = crypt.encode(user.getUser_password());
		user.setUser_password(encryptedPass);
		UserAccount acc = new UserAccount(user.getUser_name(), user.getUser_password(), true, "MANAGER", user.getId());
		userAccRepo.save(acc);
		return userRepo.save(user);
	}
	
	@Override
	public void removeUserById(int id) {
		userRepo.deleteById(id);
	}
	
	@Override
	public User getUserById(int id) {
		return userRepo.getReferenceById(id);
	}

}
