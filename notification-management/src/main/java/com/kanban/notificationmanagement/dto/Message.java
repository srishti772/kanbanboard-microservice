package com.kanban.notificationmanagement.dto;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.Data;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Message {
    private String action;
    private Task task;
    private Owner owner;
    
}
