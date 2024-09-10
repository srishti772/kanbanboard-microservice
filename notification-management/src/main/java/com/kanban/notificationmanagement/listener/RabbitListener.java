package com.kanban.notificationmanagement.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.kanban.notificationmanagement.dto.Message;
import com.kanban.notificationmanagement.dto.Owner;
import com.kanban.notificationmanagement.dto.Task;

@Component
public class RabbitListener {
 @Autowired
    private JavaMailSender mailSender;

    @org.springframework.amqp.rabbit.annotation.RabbitListener(queues = "task_notification")
    public void receiveMessage(Message message) {
        System.out.println("Received message: " + message);
        // Add your processing logic here
         // Prepare email content
        // Extract details from the message
        Owner owner = message.getOwner();
        Task task = message.getTask();
        String action = message.getAction();
        
        // Prepare email content
        String recipientEmail = owner.getEmail();
        String subject = action.equalsIgnoreCase("created") ? 
        "Task Assigned: " + task.getTitle() : 
        "Task Updated: " + task.getTitle();
        String content= action.equalsIgnoreCase("created") ? 
        "A new task has been assigned to you. " : 
        "A task has been updated";

        String body = String.format(
            "Hi %s %s,\n\n" +
            "%s\n\n" +
            "Task Name: %s (%s)\n" +
            "Status: %s\n" +
            "Priority: %s\n" +
            "Description: %s\n\n" +
            "Please review the task and take appropriate action.\n\n" +
            "Best regards,\n" +
            "Kanban Board Team",
            owner.getFirstName(), owner.getLastName(),
            content,
            task.getTitle(), task.getId(),
            task.getStatus(), task.getPriority(),
            task.getDescription()
        );
        // Create and send email
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipientEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(body);

        
        try {
            mailSender.send(mailMessage);
            System.out.println("Email sent to: " + recipientEmail);
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }
    
}
