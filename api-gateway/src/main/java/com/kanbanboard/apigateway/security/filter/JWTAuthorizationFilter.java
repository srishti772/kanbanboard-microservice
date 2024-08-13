package  com.kanbanboard.apigateway.security.filter;
import  com.kanbanboard.apigateway.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.stereotype.Component;

@Component
public class JWTAuthorizationFilter extends AbstractGatewayFilterFactory<JWTAuthorizationFilter.Config> {

    @Autowired
    private WebClient.Builder webClientBuilder;

    public JWTAuthorizationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            HttpHeaders headers = exchange.getRequest().getHeaders();
            String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7); // Extract token

                WebClient webClient = webClientBuilder.build();
                return webClient.get()
                        .uri("lb://usermanagement/auth/validate")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .retrieve()
                        .bodyToMono(UserData.class)
                        .flatMap(userData -> {
                            // Token is valid, continue with the request
                            return chain.filter(exchange);
                        });

                      
            } else {
               throw new RuntimeException("No token provided");
            }
        };
    }

    public static class Config {
    }
}
