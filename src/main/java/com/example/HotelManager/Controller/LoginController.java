package com.example.HotelManager.Controller;


import java.util.Collection;
import java.util.UUID;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelManager.Repository.UserRepository;
import com.example.HotelManager.Repository.UserSessionRepository;
import com.example.HotelManager.Service.UserService;
import com.example.HotelManager.Service.UserService.ChangePassword;
import com.example.HotelManager.Service.UserService.LoginRequest;
import com.example.HotelManager.Entity.User;
import com.example.HotelManager.Entity.UserSession;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
	
	@RestController
	public class LoginController {
	    private UserSessionRepository userSessionRepository;
		private final AuthenticationManager authenticationManager;
		private final UserService userService;
		private final UserRepository userRepo;
		public LoginController(AuthenticationManager authenticationManager, UserService userService, UserRepository userRepo, UserSessionRepository userSession) {
			this.authenticationManager = authenticationManager;
			this.userService = userService;
			this.userRepo = userRepo;
			this.userSessionRepository = userSession;
		}
	
		@PostMapping("/login")
		public UserSession login(@RequestBody LoginRequest loginRequest, HttpServletRequest request,
				HttpServletResponse response) {
			System.out.println("call login");
			try {
				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
					loginRequest.user_name(), loginRequest.user_password());
				Authentication authentication = authenticationManager.authenticate(token);
				System.out.println("testrolecai" + authentication.getAuthorities());
				String sessionId = UUID.randomUUID().toString();
				String name = authentication.getName();
				Collection<? extends GrantedAuthority> authorize = authentication.getAuthorities();
				String role = authorize.toString();
		        // Lưu trữ thông tin phiên vào cơ sở dữ liệu
		        UserSession userSession = new UserSession(sessionId, name, role);
				// Đăng nhập thành công, trả về mã trạng thái 200 OK
				//System.out.println("authentication:" + authentication);
		        System.out.print(userSession);
				userSessionRepository.save(userSession);
				ResponseEntity.status(HttpStatus.OK).body("Đăng nhập thành công!");
				return userSession;
			} catch (Exception e) {
				System.out.print(e);
				// Đăng nhập thất bại, xử lý lỗi và trả về mã trạng thái 401 Unauthorized hoặc
				// 403 Forbidden
				ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tài khoản hoặc mật khẩu không chính xác" );
				return null;
			}
		}
		
	
	    @PostMapping("/change-password")
	    public ResponseEntity<?> changePassword(@RequestBody ChangePassword changePasswordRequest) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        // Kiểm tra xem người dùng đã đăng nhập chưa
	        if (authentication == null || !authentication.isAuthenticated()) {
	            return ResponseEntity.badRequest().body("Vui lòng đăng nhập trước khi đổi mật khẩu.");
	        }
	        
	        // Thực hiện kiểm tra mật khẩu cũ và đổi mật khẩu mới
	        String currentPassword = changePasswordRequest.old_pass();
	        String newPassword = changePasswordRequest.new_pass();
	        String repeatPassword = changePasswordRequest.repeat();
	        if(!newPassword.equals(repeatPassword)) {
	        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu mới và mật khẩu xác nhận lại không khớp");
	        }
	        
	        String currentUsername = authentication.getName();
	        try {
	        	UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(currentUsername, currentPassword);
	            Authentication au = authenticationManager.authenticate(token);
				User user = userRepo.findByUserName(currentUsername);
				user.setUser_password(repeatPassword);
				userService.saveDetails(user);
				return ResponseEntity.ok("Đổi mật khẩu thành công, vui lòng đăng nhập lại!");
			} catch (Exception e) {
				System.out.print(e);
				return ResponseEntity.badRequest().body("Mật khẩu cũ không đúng.");
			}
	         // Thực hiện thay đổi mật khẩu trong cơ sở dữ liệu hoặc hệ thống xác thực của bạn
	    }
		
	
	}

