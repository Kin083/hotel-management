<<<<<<< HEAD
package com.example.HotelManager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.HotelManager.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> { // Thay đổi này
    // Các phương thức tùy chỉnh nếu cần
	@Query("SELECT u FROM User u WHERE u.user_name = ?1")
    User findByUserName(String user_name);
=======
package com.example.HotelManager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.HotelManager.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> { // Thay đổi này
    // Các phương thức tùy chỉnh nếu cần
	@Query("SELECT u FROM User u WHERE u.user_name = ?1")
    User findByUserName(String user_name);
>>>>>>> tuananh
}