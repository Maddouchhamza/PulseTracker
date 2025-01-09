package com.example.statistics.repository;

import com.example.statistics.model.Objective;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@ApplicationScoped
public class ObjectiveRepository {
    @PersistenceContext(unitName = "objectivesPU")
    private EntityManager entityManager;

    public List<Objective> findAll() {
        return entityManager.createQuery("SELECT o FROM Objective o", Objective.class).getResultList();
    }
}
