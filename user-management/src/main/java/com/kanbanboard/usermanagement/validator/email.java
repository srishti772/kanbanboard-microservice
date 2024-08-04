package com.kanbanboard.usermanagement.validator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;


@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailValidator.class)
public @interface email {
    String message() default "enter a valid northeastern email address";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default{};
}
