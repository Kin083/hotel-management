package com.example.HotelManager.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelManager.Service.UserService.LoginRequest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class LoginController {

	private final AuthenticationManager authenticationManager;
	public LoginController(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	private SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
	private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder
			.getContextHolderStrategy();

	@GetMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
					loginRequest.user_name(), loginRequest.user_password());
			Authentication authentication = authenticationManager.authenticate(token);
			SecurityContext context = securityContextHolderStrategy.createEmptyContext();
			context.setAuthentication(authentication);
			securityContextHolderStrategy.setContext(context);
			securityContextRepository.saveContext(context, request, response);
			// Đăng nhập thành công, trả về mã trạng thái 200 OK
			return ResponseEntity.ok("Đăng nhập thành công!");
		} catch (Exception e) {
			System.out.print(e);
			// Đăng nhập thất bại, xử lý lỗi và trả về mã trạng thái 401 Unauthorized hoặc
			// 403 Forbidden
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tài khoản hoặc mật khẩu không chính xác" );
		}
	}

}