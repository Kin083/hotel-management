<<<<<<< HEAD
package com.example.HotelManager.Controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelManager.Repository.UserAccountRepository;
import com.example.HotelManager.Repository.UserRepository;
import com.example.HotelManager.Service.EmailSenderService;
import com.example.HotelManager.Service.UserService;
import com.example.HotelManager.Service.UserService.UserInput;
import com.example.HotelManager.Entity.User;

@RestController
public class UserController {
	@Autowired
	private UserService userService;

	private final EmailSenderService emailService;
	private final UserRepository userRepo;
	private final UserAccountRepository userAccRepo;

	private HashMap<String, User> check_valid = new HashMap<>();

	@Autowired
	public UserController(EmailSenderService emailService, UserRepository userRepo, UserAccountRepository userAccRepo) {
		this.emailService = emailService;
		this.userRepo = userRepo;
		this.userAccRepo = userAccRepo;
	}

	@PostMapping(value = "/register")
	public ResponseEntity<?> createUser(@RequestBody User userRequest) {
		
		if (userService.check_existed(userRequest.getUser_name())) {
			System.out.println(userRequest.getUser_name());
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Tên người dùng đã tồn tại");
		}
		/*
		String uuid = emailService.sendAuthenticationEmail(userRequest.getEmail());
		check_valid.put("1", userRequest);
		System.out.println("uuid:" + uuid);
		*/
		userService.saveDetails(userRequest);
		return ResponseEntity.status(HttpStatus.OK).body("Vui lòng kiểm tra email của bạn");
	}

	@PostMapping(value = "/register/validation")
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
	
	/*
	@PatchMapping(value = "/admin/update/{id}")
	public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserRequest userRequest) {
		User user = userService.getUserById(id);
		if (user == null)
			return (ResponseEntity<?>) ResponseEntity.notFound();
		if (userRequest.full_name() != null)
			user.setFull_name(userRequest.full_name());
		if (userRequest.user_name() != null)
			user.setUser_name(userRequest.user_name());
		if (userRequest.phone() != null)
			user.setPhone(userRequest.phone());
		if (userRequest.email() != null)
			user.setEmail(userRequest.email());
		if (userRequest.user_password() != null)
			user.setUser_password(userRequest.user_password());
		userService.saveDetails(user);
		return ResponseEntity.ok(user);
	}
	*/

	@DeleteMapping(value = "/admin/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable int id) {
		userService.removeUserById(id);
		return ResponseEntity.ok(null);
	}
	
	@GetMapping(value = "/home")
	public ResponseEntity<?> homepage() {
		System.out.println("this is home page");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
		    // Lấy danh sách các vai trò (Granted Authorities) của người dùng
			System.out.println("name xac thuc " + authentication.getName());
		    for (GrantedAuthority authority : authentication.getAuthorities()) {
		        // Kiểm tra từng vai trò của người dùng
		        String role = authority.getAuthority();
		        System.out.print("vai tro cua " + authentication.getName() + " la: " + role);
		    }
		}
		return ResponseEntity.status(HttpStatus.OK).body("This is home page!");
	}
	
	@GetMapping(value = "/admin")
	public ResponseEntity<?> admin_notify() {
		
		return ResponseEntity.status(HttpStatus.OK).body("Hello admin!");
	}
	
	@GetMapping(value = "/manager")
	public ResponseEntity<?> manager_notify() {
		
		return ResponseEntity.status(HttpStatus.OK).body("Hello manager!");
	}
	
	@GetMapping(value = "/receptionist")
	public ResponseEntity<?> receptionist_notify() {
		
		return ResponseEntity.status(HttpStatus.OK).body("Hello receptionist!");
	}

	/*
	@GetMapping(value = "/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest userLoginRequest, HttpSession session, Model model) {
		// Thực hiện xác thực người dùng và trả về kết quả
		User user = userRepo.findByUserName(userLoginRequest.user_name());
		if (user != null) {
			if (user.getUser_password().equals(userLoginRequest.user_password())) {
				session.setAttribute("user", userLoginRequest.user_name());
				return ResponseEntity.status(HttpStatus.OK).body("Đăng nhập thành công");
			}

		}
		model.addAttribute("error", "Invalid User name or password");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tên người dùng hoặc mật khẩu không đúng");
	}
	
	*/

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
    	System.out.println("goi logout");
        try {
            // Xóa thông tin xác thực khỏi SecurityContextHolder
            SecurityContextHolder.clearContext();
            // Đăng xuất thành công, trả về mã trạng thái 200 OK
            return ResponseEntity.ok("Đăng xuất thành công!");
        } catch (Exception e) {
            // Xảy ra lỗi khi đăng xuất, trả về mã trạng thái 500 và thông báo lỗi
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi đăng xuất: " + e.getMessage());
        }
    }

}
=======
package com.example.HotelManager.Controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelManager.Repository.UserAccountRepository;
import com.example.HotelManager.Repository.UserRepository;
import com.example.HotelManager.Service.EmailSenderService;
import com.example.HotelManager.Service.UserService;
import com.example.HotelManager.Service.UserService.UserInput;
import com.example.HotelManager.Entity.User;

@RestController
public class UserController {
	@Autowired
	private UserService userService;

	private final EmailSenderService emailService;
	private final UserRepository userRepo;
	private final UserAccountRepository userAccRepo;

	private HashMap<String, User> check_valid = new HashMap<>();

	@Autowired
	public UserController(EmailSenderService emailService, UserRepository userRepo, UserAccountRepository userAccRepo) {
		this.emailService = emailService;
		this.userRepo = userRepo;
		this.userAccRepo = userAccRepo;
	}

	@PostMapping(value = "/register")
	public ResponseEntity<?> createUser(@RequestBody User userRequest) {
		
		if (userService.check_existed(userRequest.getUser_name())) {
			System.out.println(userRequest.getUser_name());
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Tên người dùng đã tồn tại");
		}
		/*
		String uuid = emailService.sendAuthenticationEmail(userRequest.getEmail());
		check_valid.put("1", userRequest);
		System.out.println("uuid:" + uuid);
		*/
		userService.saveDetails(userRequest);
		return ResponseEntity.status(HttpStatus.OK).body("Vui lòng kiểm tra email của bạn");
	}

	@PostMapping(value = "/register/validation")
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
	
	/*
	@PatchMapping(value = "/admin/update/{id}")
	public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserRequest userRequest) {
		User user = userService.getUserById(id);
		if (user == null)
			return (ResponseEntity<?>) ResponseEntity.notFound();
		if (userRequest.full_name() != null)
			user.setFull_name(userRequest.full_name());
		if (userRequest.user_name() != null)
			user.setUser_name(userRequest.user_name());
		if (userRequest.phone() != null)
			user.setPhone(userRequest.phone());
		if (userRequest.email() != null)
			user.setEmail(userRequest.email());
		if (userRequest.user_password() != null)
			user.setUser_password(userRequest.user_password());
		userService.saveDetails(user);
		return ResponseEntity.ok(user);
	}
	*/

	@DeleteMapping(value = "/admin/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable int id) {
		userService.removeUserById(id);
		return ResponseEntity.ok(null);
	}
	
	@GetMapping(value = "/home")
	public ResponseEntity<?> homepage() {
		System.out.println("this is home page");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
		    // Lấy danh sách các vai trò (Granted Authorities) của người dùng
			System.out.println("name xac thuc " + authentication.getName());
		    for (GrantedAuthority authority : authentication.getAuthorities()) {
		        // Kiểm tra từng vai trò của người dùng
		        String role = authority.getAuthority();
		        System.out.print("vai tro cua " + authentication.getName() + " la: " + role);
		    }
		}
		return ResponseEntity.status(HttpStatus.OK).body("This is home page!");
	}
	
	@GetMapping(value = "/admin")
	public ResponseEntity<?> admin_notify() {
		
		return ResponseEntity.status(HttpStatus.OK).body("Hello admin!");
	}
	
	@GetMapping(value = "/manager")
	public ResponseEntity<?> manager_notify() {
		
		return ResponseEntity.status(HttpStatus.OK).body("Hello manager!");
	}
	
	@GetMapping(value = "/receptionist")
	public ResponseEntity<?> receptionist_notify() {
		
		return ResponseEntity.status(HttpStatus.OK).body("Hello receptionist!");
	}

	/*
	@GetMapping(value = "/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest userLoginRequest, HttpSession session, Model model) {
		// Thực hiện xác thực người dùng và trả về kết quả
		User user = userRepo.findByUserName(userLoginRequest.user_name());
		if (user != null) {
			if (user.getUser_password().equals(userLoginRequest.user_password())) {
				session.setAttribute("user", userLoginRequest.user_name());
				return ResponseEntity.status(HttpStatus.OK).body("Đăng nhập thành công");
			}

		}
		model.addAttribute("error", "Invalid User name or password");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tên người dùng hoặc mật khẩu không đúng");
	}
	
	*/

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
    	System.out.println("goi logout");
        try {
            // Xóa thông tin xác thực khỏi SecurityContextHolder
            SecurityContextHolder.clearContext();
            // Đăng xuất thành công, trả về mã trạng thái 200 OK
            return ResponseEntity.ok("Đăng xuất thành công!");
        } catch (Exception e) {
            // Xảy ra lỗi khi đăng xuất, trả về mã trạng thái 500 và thông báo lỗi
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi đăng xuất: " + e.getMessage());
        }
    }

}
>>>>>>> tuananh
