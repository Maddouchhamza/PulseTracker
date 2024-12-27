package com.example.activities.rest;

import com.example.activities.kafka.KafkaProducerService;
import com.example.activities.model.Activity;
import com.example.activities.repository.ActivityRepository;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import jakarta.inject.Inject;
import java.util.List;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ActivityResource {

    @Inject
    private ActivityRepository repository;
    
    @Inject
    private KafkaProducerService kafkaProducerService;

    @POST
    public Response create(Activity activity) {
        repository.save(activity);
   	kafkaProducerService.sendMessage("activities-events", null, "New activity created: " + activity.toString());
        return Response.status(Response.Status.CREATED).entity(activity).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Activity activity = repository.findById(id);
        if (activity == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(activity).build();
    }

    @GET
    public Response getAll() {
        List<Activity> activities = repository.findAll();
        return Response.ok(activities).build();
    }
}

