package com.ijmfes.services;

import com.ijmfes.models.User;

public interface UserService {
    User findUserByUsername(String username);
}