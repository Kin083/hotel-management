package com.example.HotelManager.Entity;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Table(name="user_account")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class UserAccount {
	@Id
	@Column(name="userName")
	private String userName;
	
	@Column(name="password")
	private String password;
	
	@Column(name="active")
	private boolean active;
	
	@Column(name="role")
	private String role;
	
	@Column(name="HotelID")
	private int hotelid;
}
