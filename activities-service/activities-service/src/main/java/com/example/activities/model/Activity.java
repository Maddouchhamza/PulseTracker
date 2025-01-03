package com.example.activities.model;
import java.time.Instant;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private int duration; // en minutes
    private Float distance; // en kilomètres
    private Float calories;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Timestamp.from(Instant.now());
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }
    public Float getDistance() { return distance; }
    public void setDistance(Float distance) { this.distance = distance; }
    public Float getCalories() { return calories; }
    public void setCalories(Float calories) { this.calories = calories; }
    public Timestamp getCreatedAt() { return createdAt; }
}

