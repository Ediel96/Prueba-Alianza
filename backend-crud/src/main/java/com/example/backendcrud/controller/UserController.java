package com.example.backendcrud.controller;

import com.example.backendcrud.model.entity.User;
import com.example.backendcrud.model.services.IUserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private IUserServices iUserServices;

    @GetMapping("/user/{id}")
    public ResponseEntity<?> showById(@PathVariable long id){
        Map<String , Object > response  = new HashMap<>();
        User user = new User();

        System.out.println("id: " + id);

        try{
            user = iUserServices.findById(id);
        }catch (DataAccessException e){
            response.put("mensaje", "Error en la consulta se de usuarios");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(user == null){
            response.put("mensaje" , "El user id: "+id);
            return  new ResponseEntity<Map<String , Object>>( response, HttpStatus.NOT_FOUND);
        }

        return  new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<?> show(){
        Map<String , Object > response  = new HashMap<>();
        List<User> user;

        try {
            user = iUserServices.findAll();
        }catch (DataAccessException e){
            response.put("mensaje", "Error en lista de usuarios");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("user", user);
        return   new ResponseEntity<Map<String , Object>>(response, HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<?> save(@RequestBody User user){
        Map<String, Object> response = new HashMap<>();
        User userNew = new User();

        try{
            userNew = iUserServices.save(user);
        }catch (DataAccessException e){
            response.put("mensaje" , "Error al realizar la  consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El usuario ha sido creado el insert en la base de datos");
        response.put("user", userNew);
        return new ResponseEntity<Map <String, Object> >(response, HttpStatus.CREATED);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> update(@PathVariable long id, @RequestBody User user){
        Map<String, Object> response = new HashMap<>();
        User userActual = null;

        try {
            userActual = iUserServices.findById(id);

            if (userActual == null){
                response.put("mensaje" , "Error no existe es usuario");
                response.put("error", "No se encuentra en la base de datos");
                return new ResponseEntity<Map<String , Object>>(response, HttpStatus.ACCEPTED);
            }

            userActual.setEmail(user.getEmail());
            userActual.setDateStart(user.getDateStart());
            userActual.setDateEnd(user.getDateEnd());
            userActual.setPhone(user.getPhone());
            userActual.setBusinessId(user.getBusinessId());

            iUserServices.save(userActual);

        }catch (DataAccessException e){
            response.put("mensaje" , "Error al realizar la  consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }


        response.put("mensaje", "El usuario ha sido actualizado");
        response.put("user", userActual);
        return new ResponseEntity<Map <String, Object> >(response, HttpStatus.CREATED);
    }
}
