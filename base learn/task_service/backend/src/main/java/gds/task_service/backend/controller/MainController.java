package gds.task_service.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpRequest;

@RestController
@RequestMapping("/task")
public class MainController {
    @GetMapping(value = "/hello")
    public String helloCOntroller() {
        return "hello";
    }
}
