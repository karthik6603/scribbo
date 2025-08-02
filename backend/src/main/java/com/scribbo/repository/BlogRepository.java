package com.scribbo.repository;

import com.scribbo.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogRepository extends MongoRepository<Blog, String> {
    Page<Blog> findByAuthorId(String authorId, Pageable pageable);
}