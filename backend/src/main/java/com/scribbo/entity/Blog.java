package com.scribbo.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "blogs")
@Data
public class Blog {
    @Id
    private String id;
    private String title;
    private String content;
    private Author author;
    private LocalDateTime createdAt = LocalDateTime.now();

    @Data
    public static class Author {
        private String id;
        private String email;
    }
}