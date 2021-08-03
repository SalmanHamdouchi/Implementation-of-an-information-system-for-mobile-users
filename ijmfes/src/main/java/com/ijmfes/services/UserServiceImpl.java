package com.ijmfes.services;

import com.ijmfes.models.User;
import com.ijmfes.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService  {
    
    @Autowired
	private UserRepository userRepository;

	@Override
	public User findUserByUsername(String usernameOrEmail) {
		User user = null;
		try {
			user = userRepository.findUserByUsername(usernameOrEmail);
		} catch (Exception e) {
			throw e;
		}
		return user;
	}
}