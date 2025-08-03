package com.scribbo.dto;

import com.scribbo.entity.Blog;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogPageResponse {
    private List<Blog> blogs;
    private int totalPages;
    private int currentPage;
}
