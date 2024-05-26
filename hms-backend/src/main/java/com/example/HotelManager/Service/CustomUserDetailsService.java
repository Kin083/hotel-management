package com.example.HotelManager.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.HotelManager.Repository.UserAccountRepository;
import com.example.HotelManager.Entity.UserAccount;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserAccountRepository useracRepo;
	
	@Override
	public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
		Optional<UserAccount> userac = useracRepo.findByUserName(s);
		userac.orElseThrow(() -> new UsernameNotFoundException("Not found: " + s));
		return userac.map(CustomUserDetails::new).get();
	}
}
