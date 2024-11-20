package com.yourcompany.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.config.server.environment.EnvironmentController;
import org.springframework.cloud.config.server.environment.EnvironmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "resolved/${spring.cloud.config.server.prefix:}")
public class ReplacedEnvironmentController {

  private EnvironmentController environmentController;

  @Autowired
  public ReplacedEnvironmentController(EnvironmentRepository repository) {
    environmentController = new EnvironmentController(repository, new ObjectMapper());
  }

  public ReplacedEnvironmentController(EnvironmentRepository repository, ObjectMapper objectMapper) {
    environmentController = new EnvironmentController(repository, objectMapper);
  }

  @RequestMapping("/{name}/{profiles:.*[^-].*}")
  public ResponseEntity<String> resolvedDefaultLabel(@PathVariable String name, @PathVariable String profiles) throws Exception {
    return resolvedLabelled(name, profiles, null);
  }

  @RequestMapping("/{name}/{profiles}/{label:.*}")
  public ResponseEntity<String> resolvedLabelled(@PathVariable String name, @PathVariable String profiles,
      @PathVariable String label) throws Exception {
    return environmentController.labelledJsonProperties(name, profiles, label, true);
  }
}
