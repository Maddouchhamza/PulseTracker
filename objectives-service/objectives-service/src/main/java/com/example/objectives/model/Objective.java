package com.example.objectives.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "objectives")
public class Objective {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "goal_type", nullable = false, length=50)
    private String goalType;

    @Column(name = "target_value", nullable = false)
    private Double targetValue;

    @Column(name = "current_value", nullable = false)
    private Double currentValue;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "status", nullable = false, length=20)
    private String status;

    // Getters and Setters

    public Long getId() { return id; }

    public String getGoalType() { return goalType; }

    public Double getTargetValue() { return targetValue; }

    public Double getCurrentValue() { return currentValue; }

    public LocalDateTime getStartDate() { return startDate; }

    public LocalDateTime getEndDate() { return endDate; }

    public String getStatus() { return status; }

    public void setId(Long newId) { this.id = newId; }

    public void setGoalType(String newGoalType) { this.goalType = newGoalType; }

    public void setTargetValue(Double newTargetValue) { this.targetValue = newTargetValue; }

    public void setCurrentValue(Double newCurrentValue) { this.currentValue = newCurrentValue; }

    public void setStartDate(LocalDateTime newStartDate) { this.startDate = newStartDate; }

    public void setEndDate(LocalDateTime newEndDate) { this.endDate = newEndDate; }

    public void setStatus(String newStatus) { this.status = newStatus; }
}

