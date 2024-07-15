package auth.authentication_service.core.filters;

import auth.authentication_service.core.services.UserDetailsServices;
import auth.authentication_service.kernel.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserDetailsServices userDetailsServices;
    private final JwtUtil jwtUtil;

    public JwtRequestFilter(UserDetailsServices userDetailsServices, JwtUtil jwtUtil) {
        this.userDetailsServices = userDetailsServices;
        this.jwtUtil = jwtUtil;
    }

    private static final String SERVICE_TOKEN_HEADER = "Service";
    private static final String SERVICE_TOKEN_VALUE = "authentication_service";

    private static final String PRIVATE_TOKEN_HEADER = "Service-Token";
    private static final String PRIVATE_TOKEN_VALUE = "Golde34";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String serviceTokenHeader = request.getHeader(SERVICE_TOKEN_HEADER);
        final String privateTokenHeader = request.getHeader(PRIVATE_TOKEN_HEADER);
        if (serviceTokenHeader != null && privateTokenHeader != null
                && serviceTokenHeader.equals(SERVICE_TOKEN_VALUE)
                && request.getHeader(PRIVATE_TOKEN_HEADER).equals(PRIVATE_TOKEN_VALUE)) {
            log.info("Header token valid, no need to filter");
            filterChain.doFilter(request, response);
            return;
        }

        final String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.exactUsername(jwt);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsServices.loadUserByUsername(username);
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                filterChain.doFilter(request, response);
            }
        }

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.flushBuffer();
    }
}