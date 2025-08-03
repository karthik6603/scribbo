package com.scribbo.api;

import com.scribbo.dto.BlogDTO;
import com.scribbo.dto.BlogPageResponse;
import com.scribbo.entity.Blog;
import com.scribbo.jwt.JwtUtil;
import com.scribbo.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;
    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<Page<Blog>> getAllBlogs(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String userId) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        return ResponseEntity.ok(blogService.getAllBlogs(pageable, userId));
    }

    @GetMapping("/myblogs")
    public ResponseEntity<BlogPageResponse> getMyBlogs(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestHeader("Authorization") String authHeader
    ) {
        String jwt = authHeader.substring(7);
        String userId = jwtUtil.getUserIdFromToken(jwt);

        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Blog> userBlogs = blogService.getAllBlogs(pageable, userId);

        BlogPageResponse response = new BlogPageResponse(
                userBlogs.getContent(),
                userBlogs.getTotalPages(),
                page
        );

        return ResponseEntity.ok(response);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable String id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    @PostMapping
    public ResponseEntity<Blog> createBlog(
            @RequestBody BlogDTO blogDTO,
            @RequestHeader("Authorization") String authHeader) {
        String jwt = authHeader.substring(7);
        String userId = jwtUtil.getUserIdFromToken(jwt);
        String userEmail = jwtUtil.getEmailFromToken(jwt);
        return ResponseEntity.status(201).body(blogService.createBlog(blogDTO, userId, userEmail));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(
            @PathVariable String id,
            @RequestBody BlogDTO blogDTO,
            @RequestHeader("Authorization") String authHeader) {
        String jwt = authHeader.substring(7);
        String userId = jwtUtil.getUserIdFromToken(jwt);
        return ResponseEntity.ok(blogService.updateBlog(id, blogDTO, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(
            @PathVariable String id,
            @RequestHeader("Authorization") String authHeader) {
        String jwt = authHeader.substring(7);
        String userId = jwtUtil.getUserIdFromToken(jwt);
        blogService.deleteBlog(id, userId);
        return ResponseEntity.noContent().build();
    }
}