const API_BASE_URL = 'http://localhost:3001';

export const apiClient = {
  async get(endpoint: string) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }
};

export const resumeApi = {
  getPersonalInfo: () => apiClient.get('/personalInfo'),
  getExperiences: () => apiClient.get('/experiences'),
  getSkillCategories: () => apiClient.get('/skillCategories'),
  getEducation: () => apiClient.get('/education'),
  getCertifications: () => apiClient.get('/certifications'),
  
  getAllData: async () => {
    const [
      personalInfo,
      experiences,
      skillCategories,
      education,
      certifications
    ] = await Promise.all([
      apiClient.get('/personalInfo'),
      apiClient.get('/experiences'),
      apiClient.get('/skillCategories'),
      apiClient.get('/education'),
      apiClient.get('/certifications')
    ]);
    
    return {
      personalInfo,
      experiences,
      skillCategories,
      education,
      certifications
    };
  }
};