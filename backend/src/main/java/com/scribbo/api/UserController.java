package com.scribbo.api;

import com.scribbo.dto.UserDTO;
import com.scribbo.entity.User;
import com.scribbo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.registerUser(userDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.loginUser(userDTO));
    }
}