package com.example.HotelManager.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.HotelManager.Service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
	@Bean
    public UserDetailsService userDetailsService() {
        // Trả về một implement của UserDetailsService để tìm kiếm thông tin người dùng từ cơ sở dữ liệu
        return new CustomUserDetailsService();
    }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(
	            UserDetailsService userDetailsService,
	            PasswordEncoder passwordEncoder) {
			
	        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
	        authenticationProvider.setUserDetailsService(userDetailsService);
	        authenticationProvider.setPasswordEncoder(passwordEncoder);
	       
	        return new ProviderManager(authenticationProvider);
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests((authz) -> authz
						.requestMatchers("/home").permitAll()
						.requestMatchers("/login").permitAll()
						.requestMatchers("/register/**").permitAll()
						.requestMatchers("/admin/**").hasRole("ADMIN")
						.requestMatchers("/reciptionist/**").hasAnyRole("ADMIN", "RECEPTIONIST")
						.requestMatchers("/manager/**").hasAnyRole("ADMIN", "MANAGER")
						.requestMatchers("/logoutt").permitAll()
						.anyRequest().authenticated()
						
				)
				.httpBasic(Customizer.withDefaults());
		http
		.securityContext((securityContext) -> securityContext
			.securityContextRepository(securityContextRepository())
		);
		return http.build();
	}
	
    @Bean
    public HttpSessionSecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }
	
    
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedOrigins("http://localhost:5173") // Thay đổi domain này thành domain của ứng dụng React của bạn
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Content-Type", "Authorization");
			}
		};
	}
	
}
