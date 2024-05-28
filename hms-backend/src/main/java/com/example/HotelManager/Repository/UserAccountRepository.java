package com.example.HotelManager.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.HotelManager.Entity.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, String> { // Thay đổi này
    // Các phương thức tùy chỉnh nếu cần
	@Query("SELECT u FROM UserAccount u WHERE u.userName = ?1")
    Optional<UserAccount> findByUserName(String userName);
}