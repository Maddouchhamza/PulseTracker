package com.example.statistics.service;

import com.example.statistics.client.ActivitiesClient;
import com.example.statistics.client.ObjectivesClient;
import com.example.statistics.model.Activity;
import com.example.statistics.model.Objective;
import com.example.statistics.model.Statistics;
import com.example.statistics.repository.StatisticsRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class StatisticsService {

    @Inject
    private ActivitiesClient activitiesClient;

    @Inject
    private ObjectivesClient objectivesClient;

    @Inject
    private StatisticsRepository statisticsRepository;

    public void calculateAndStoreStatistics() {
        // Récupérer les activités et les objectifs
        List<Activity> activities = activitiesClient.getActivities();
        List<Objective> objectives = objectivesClient.getObjectives();

        // Calculer les statistiques
        double totalDistance = activities.stream().mapToDouble(Activity::getDistance).sum();
        double totalCalories = activities.stream().mapToDouble(Activity::getCalories).sum();
        double totalDuration = activities.stream().mapToDouble(Activity::getDuration).sum();

        // Créer un objet Statistics pour sauvegarder les résultats
        Statistics statistics = new Statistics();
        statistics.setTotalDistance(totalDistance);
        statistics.setTotalCalories(totalCalories);
        statistics.setTotalDuration(totalDuration);

        // Sauvegarder les statistiques dans la base de données
        statisticsRepository.save(statistics);

        System.out.println("Statistics saved: " + statistics);
    }

    public List<Statistics> getAllStatistics() {
        return statisticsRepository.findAll();
    }

    public Statistics getStatisticById(Long id) {
        return statisticsRepository.findById(id);
    }
}
