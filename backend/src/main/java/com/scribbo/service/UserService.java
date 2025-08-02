package com.scribbo.service;

import com.scribbo.dto.UserDTO;
import com.scribbo.entity.User;
import com.scribbo.repository.UserRepository;
import com.scribbo.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public User registerUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userRepository.save(user);
    }

    public String loginUser(UserDTO userDTO) {
        User user = userRepository.findByEmail(userDTO.getEmail());
        if (user == null || !passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return jwtUtil.generateToken(user.getEmail(), user.getId());
    }
}