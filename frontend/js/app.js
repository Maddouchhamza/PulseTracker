// app.js

// --------------- Activités ----------------

// Fonction pour charger les activités
async function loadActivities() {
    const errorElement = document.getElementById('activitiesError');
    errorElement.textContent = ''; // Réinitialiser les messages d'erreur
  
    try {
      const url = 'http://localhost:8080/activities-service/activities';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erreur HTTP: ' + response.status);
      }
  
      const data = await response.json(); // data est un tableau d'objets
      console.log('Activités:', data);
  
      // Sélection du <tbody> pour y injecter des lignes
      const tbody = document.querySelector('#activitiesTable tbody');
      tbody.innerHTML = ''; // Vider le tableau avant d'insérer
  
      data.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${activity.type}</td>
          <td>${activity.distance}</td>
          <td>${activity.duration}</td>
          <td>${activity.calories}</td>
          <td>
            <button class="btn" onclick="deleteActivity(${activity.id})">Supprimer</button>
          </td>

        `;
        tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Erreur lors du chargement des activités:', error);
      errorElement.textContent = 'Erreur lors du chargement des activités. Voir la console pour plus de détails.';
    }
  }
  
  // Fonction pour afficher le formulaire de création d'activité
  function showCreateActivityForm() {
    document.getElementById('createActivityForm').style.display = 'block';
  }
  
  // Fonction pour cacher le formulaire de création d'activité
  function hideCreateActivityForm() {
    document.getElementById('createActivityForm').style.display = 'none';
  }
  
  // Fonction pour créer une nouvelle activité (POST)
  async function createActivity(event) {
    event.preventDefault(); // Empêcher le rechargement de la page
  
    const type = document.getElementById('activityName').value;
    const distance = parseFloat(document.getElementById('activityDistance').value);
    const duration = parseFloat(document.getElementById('activityDuration').value);
    const calories = parseFloat(document.getElementById('activityCalories').value);
  
    const newActivity = {
      type,
      distance,
      duration,
      calories
    };
  
    try {
      const url = 'http://localhost:8080/activities-service/activities';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newActivity)
      });
  
      if (!response.ok) {
        throw new Error('Erreur HTTP: ' + response.status);
      }
  
      const createdActivity = await response.json();
      console.log('Activité créée:', createdActivity);
  
      // Recharger la liste des activités
      
      loadActivities();
      loadObjectives();
      // Cacher le formulaire
      hideCreateActivityForm();
    } catch (error) {
      console.error('Erreur lors de la création de l\'activité:', error);
      alert('Erreur lors de la création de l\'activité. Voir la console pour plus de détails.');
    }
  }

    // Fonction pour supprimer une activité (DELETE)
    async function deleteActivity(id) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
        return;
      }
    
      try {
        const url = `http://localhost:8080/activities-service/activities/${id}`;
        const response = await fetch(url, {
          method: 'DELETE'
        });
    
        if (response.status === 204) {
          console.log('Activité supprimé avec succès.');
          // Recharger la liste des activités
          loadActivities();
        } else {
          throw new Error('Erreur HTTP: ' + response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'activité:', error);
        alert('Erreur lors de la suppression de l\'activité. Voir la console pour plus de détails.');
      }
    }
    
  
  // --------------- Objectifs ----------------
  
  // Fonction pour charger les objectifs
  async function loadObjectives() {
    const errorElement = document.getElementById('objectivesError');
    errorElement.textContent = ''; // Réinitialiser les messages d'erreur
  
    try {
      const url = 'http://localhost:8080/objectives-service/objectives';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erreur HTTP: ' + response.status);
      }
  
      const data = await response.json(); // data est un tableau d'objets
      console.log('Objectifs:', data);
  
      // Sélection du <tbody> pour y injecter des lignes
      const tbody = document.querySelector('#objectivesTable tbody');
      tbody.innerHTML = ''; // Vider le tableau avant d'insérer
  
      data.forEach(objective => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${objective.goalType}</td>
          <td>${objective.startDate}</td>
          <td>${objective.currentValue}</td>
          <td>${objective.targetValue}</td>
          <td>${objective.endDate}</td>
          <td>${objective.status}</td>
          <td>
            ${objective.status !== 'COMPLETED' ? `<button class="btn" onclick="showUpdateObjectiveForm(${objective.id})">Modifier</button>` : ''}
            <button class="btn" onclick="deleteObjective(${objective.id})">Supprimer</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Erreur lors du chargement des objectifs:', error);
      errorElement.textContent = 'Erreur lors du chargement des objectifs. Voir la console pour plus de détails.';
    }
  }
  
  // Fonction pour afficher le formulaire de création d'objectif
  function showCreateObjectiveForm() {
    document.getElementById('createObjectiveForm').style.display = 'block';
  }
  
  // Fonction pour cacher le formulaire de création d'objectif
  function hideCreateObjectiveForm() {
    document.getElementById('createObjectiveForm').style.display = 'none';
  }
  
  // Fonction pour créer un nouvel objectif (POST)
  async function createObjective(event) {
    event.preventDefault(); // Empêcher le rechargement de la page
  
    const goalType = document.getElementById('objectiveGoalType').value;
    const targetValue = parseFloat(document.getElementById('objectiveTargetValue').value);
  
    const newObjective = {
      goalType,
      targetValue,
    };
  
    try {
      const url = 'http://localhost:8080/objectives-service/objectives';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObjective)
      });
  
      if (!response.ok) {
        throw new Error('Erreur HTTP: ' + response.status);
      }
  
      const createdObjective = await response.json();
      console.log('Objectif créé:', createdObjective);
  
      // Recharger la liste des objectifs
      loadObjectives();
  
      // Cacher le formulaire
      hideCreateObjectiveForm();
    } catch (error) {
      console.error('Erreur lors de la création de l\'objectif:', error);
      alert('Erreur lors de la création de l\'objectif. Voir la console pour plus de détails.');
    }
  }
  
  // Fonction pour afficher le formulaire de mise à jour d'objectif
  async function showUpdateObjectiveForm(id) {
    try {
      const url = `http://localhost:8080/objectives-service/objectives/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erreur HTTP: ' + response.status);
      }
  
      const objective = await response.json();
      console.log('Objectif à mettre à jour:', objective);
  
      // Créer un formulaire de mise à jour dynamique
      const formContainer = document.createElement('div');
      formContainer.className = 'form-container';
      formContainer.innerHTML = `
        <h3>Modifier l'Objectif</h3>
        <form onsubmit="updateObjective(event, ${objective.id})">
          <label for="updateObjectiveGoalType">Type de Goal :</label>
          <input type="text" id="updateObjectiveGoalType" name="updateObjectiveGoalType" value="${objective.goalType}" required><br>
    
          <label for="updateObjectiveTargetValue">Valeur Cible :</label>
          <input type="number" id="updateObjectiveTargetValue" name="updateObjectiveTargetValue" value="${objective.targetValue}" required><br>
  
          <button type="submit" class="btn">Mettre à jour</button>
          <button type="button" class="btn" onclick="this.parentElement.parentElement.remove()">Annuler</button>
        </form>
      `;
      document.body.appendChild(formContainer);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'objectif:', error);
      alert('Erreur lors de la récupération de l\'objectif. Voir la console pour plus de détails.');
    }
  }
  
  // Fonction pour mettre à jour un objectif (PUT)
  async function updateObjective(event, id) {
    event.preventDefault(); // Empêcher le rechargement de la page
  
    const goalType = document.getElementById('updateObjectiveGoalType').value;
    const targetValue = parseFloat(document.getElementById('updateObjectiveTargetValue').value);
  
    const updatedObjective = {
      goalType,
      targetValue,
    };
  
    console.log('Objet Mis à Jour:', updatedObjective);
  
    try {
      const url = `http://localhost:8080/objectives-service/objectives/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedObjective)
      });
  
      if (!response.ok) {
        throw new Error('Erreur HTTP: ' + response.status);
      }
  
      const result = await response.json();
      console.log('Objectif mis à jour:', result);
  
      // Recharger la liste des objectifs
      loadObjectives();
  
      // Cacher le formulaire de mise à jour
      const formContainer = event.target.closest('.form-container');
      if (formContainer) {
        formContainer.remove();
      } else {
        console.error('Form container not found to remove.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'objectif:', error);
      alert('Erreur lors de la mise à jour de l\'objectif. Voir la console pour plus de détails.');
    }
  }
    
  // Fonction pour supprimer un objectif (DELETE)
  async function deleteObjective(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) {
      return;
    }
  
    try {
      const url = `http://localhost:8080/objectives-service/objectives/${id}`;
      const response = await fetch(url, {
        method: 'DELETE'
      });
  
      if (response.status === 204) {
        console.log('Objectif supprimé avec succès.');
        // Recharger la liste des objectifs
        loadObjectives();
      } else {
        throw new Error('Erreur HTTP: ' + response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'objectif:', error);
      alert('Erreur lors de la suppression de l\'objectif. Voir la console pour plus de détails.');
    }
  }
  