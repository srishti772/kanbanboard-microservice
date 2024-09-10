package com.kanban.notificationmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.Data;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task {
    private String id = "";
    private String title = "";
    private String description = "";
    private String status = "";
    private String priority = "";
    private String owner = "";
    private String createdAt = "";
    private String updatedAt = "";



    @Override
    public String toString() {
        return "Task{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", priority='" + priority + '\'' +
                ", owner='" + owner + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

