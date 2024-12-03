package megagram.springBootBackend5;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@Profile("local")
public class LocalCorsConfiguration {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(false);
        config.addAllowedOrigin("http://localhost:8024");
        config.addAllowedOrigin("http://localhost:8033");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/graphql", config);
        source.registerCorsConfiguration("/getFastestDeliveryTimesForProducts", config);
        source.registerCorsConfiguration("/getShippingPricesAndTaxesAndShortestDeliveryTimesOfProducts", config);
        
        return new CorsFilter(source);
    }
}
