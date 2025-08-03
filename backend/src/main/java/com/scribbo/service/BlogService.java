package com.scribbo.service;

import com.scribbo.dto.BlogDTO;
import com.scribbo.entity.Blog;
import com.scribbo.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;

    public Page<Blog> getAllBlogs(Pageable pageable, String userId) {
        if (userId != null) {
            return blogRepository.findByAuthorId(userId, pageable);
        }
        return blogRepository.findAll(pageable);
    }

    public Page<Blog> getBlogsByAuthorId(String userId, Pageable pageable) {
        return blogRepository.findByAuthorId(userId, pageable);
    }


    public Blog getBlogById(String id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    public Blog createBlog(BlogDTO blogDTO, String userId, String userEmail) {
        Blog blog = new Blog();
        blog.setTitle(blogDTO.getTitle());
        blog.setContent(blogDTO.getContent());
        Blog.Author author = new Blog.Author();
        author.setId(userId);
        author.setEmail(userEmail);
        blog.setAuthor(author);
        return blogRepository.save(blog);
    }

    public Blog updateBlog(String id, BlogDTO blogDTO, String userId) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        if (!blog.getAuthor().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this blog");
        }
        blog.setTitle(blogDTO.getTitle());
        blog.setContent(blogDTO.getContent());
        return blogRepository.save(blog);
    }

    public void deleteBlog(String id, String userId) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        if (!blog.getAuthor().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this blog");
        }
        blogRepository.deleteById(id);
    }
}