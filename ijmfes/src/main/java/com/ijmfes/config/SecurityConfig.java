package com.ijmfes.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
	private UserDetailsService customUserDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("*********************************");
        System.out.println(passwordEncoder.encode("1234"));
        System.out.println("*********************************");
        http.cors().configurationSource(corsConfigurationSource()).and().csrf().disable()
        .authorizeRequests()
        .antMatchers("/ijmfes/etudiants","/ijmfes/login/**",
        "/ijmfes/matieres","/ijmfes/seance/*",
        "/ijmfes/presances**/**","/ijmfes/activite**/**"
        ).hasAnyAuthority("ROLE_PROF")
        .antMatchers("/ijmfes/etudiant**/**","/ijmfes/loginetudiant/**", "/ijmfes/seance/**","/ijmfes/etudactiviteetudiant/**","/ijmfes/etudactiviteseances/*"
        ).hasAnyAuthority("ROLE_ETUDIANT")
        .anyRequest().authenticated()
        .and()
        .httpBasic()
        .and()
        .logout().logoutUrl("/ijmfes/leave").invalidateHttpSession(true).logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());
    }
   @Override
	protected void configure(AuthenticationManagerBuilder authManagerBuilder) throws Exception {
		authManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);
        //the below three lines will add the relevant CORS response headers
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	@Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
/*http.csrf().
                disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/**").hasAuthority("ROLE_PROF")
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();*/
}