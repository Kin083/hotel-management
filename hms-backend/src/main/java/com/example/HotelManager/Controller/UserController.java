package com.example.HotelManager.Controller;


import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelManager.Repository.UserAccountRepository;
import com.example.HotelManager.Repository.UserRepository;
import com.example.HotelManager.Repository.UserSessionRepository;
import com.example.HotelManager.Service.EmailSenderService;
import com.example.HotelManager.Service.UserService;
import com.example.HotelManager.Service.UserService.UserInput;
import com.example.HotelManager.Entity.User;
import com.example.HotelManager.Entity.UserSession;

@RestController
public class UserController {
	@Autowired
	private UserService userService;

	private final EmailSenderService emailService;
	private final UserRepository userRepo;
	private final UserAccountRepository userAccRepo;
	private final UserSessionRepository userSessionRepo;
	
	private HashMap<String, User> check_valid = new HashMap<>();

	@Autowired
	public UserController(EmailSenderService emailService, UserRepository userRepo, UserAccountRepository userAccRepo, UserSessionRepository userSessionRepo) {
		this.emailService = emailService;
		this.userRepo = userRepo;
		this.userAccRepo = userAccRepo;
		this.userSessionRepo = userSessionRepo;
	}

	@PostMapping(value = "/register")
	public ResponseEntity<?> createUser(@RequestBody User userRequest) {
		System.out.println("goi duoc xu ly logic register");
		if (userService.check_existed(userRequest.getUser_name())) {
			System.out.println(userRequest.getUser_name());
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Tên người dùng đã tồn tại");
		}
		String uuid = emailService.sendAuthenticationEmail(userRequest.getEmail());
		check_valid.put(uuid, userRequest);
		System.out.println("uuid:" + uuid);
		return ResponseEntity.status(HttpStatus.OK).body("Vui lòng kiểm tra email của bạn");
	}

	@PostMapping(value = "register/validation")
	public ResponseEntity<?> validation(@RequestBody UserInput user_input) {
		String input = user_input.userInput();
		System.out.println("user_input:" + input);
		if (check_valid.containsKey(input)) {
			User u = check_valid.get(input);
			check_valid.remove(input);
			userService.saveDetails(u);
			return ResponseEntity.status(HttpStatus.CREATED).body("Đăng ký tài khoản thành công");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mã xác thực không tồn tại");
	}
	
	/*
	//MANAGER DUOC PHEP TAO TAI KHOAN CHO HOTEL CUA HO --- DANG CHO HOAN TAT TINH NANG LOGIN, LOGOUT
	@PostMapping(value = "/manager/add_account")
	public ResponseEntity<?> addAccount(@RequestBody AddAccount user_input) {
		UserAccount newAcc = new UserAccount(user_input.user_name(),user_input.user_password(),user_input.active(),user_input.role(), "Can lay hotel id cua manager hien tai");
		if (userService.check_existed(user_input.user_name())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Tên người dùng đã tồn tại");
		}
		return ResponseEntity.status(HttpStatus.CREATED).body("Đăng ký tài khoản thành công");
	}
	*/
	
	
	@PostMapping("/home")
	public String homepage(@RequestBody UserSession userSession) {
		System.out.println("this is home page with id: " +userSession);
		
		if (userService.checkSessionExisted(userSession.getSessionId())) {
			// xu ly tiep 
			System.out.println("Đang truy cập với tư cách là: ");
			System.out.println("SessionId: " + userSession.getSessionId());
	 		System.out.println("Username: " + userSession.getUsername());
			System.out.println("Role: " + userSession.getRole());
			return "/main";
		}	
		return "/login";
	}

    @PostMapping("/logoutt")
    public String logout(@RequestBody UserSession userSession) {
    	System.out.println("goi logout");
    	if (userService.checkSessionExisted(userSession.getSessionId())) {
			// xu ly tiep 
			userSessionRepo.delete(userSession);
			ResponseEntity.status(HttpStatus.OK).body("Đăng xuất thành công!");
			return "/login";
		}	
    	ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đăng xuất không thành công!");
		return "/login";
    }
 
}
