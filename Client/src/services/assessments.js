import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = process.env.REACT_APP_API_BASE_URL
// `/assessments`

const getAllExams = async (courseId) => {
  const response = await axios.get(`${baseURL}/${courseId}/assessments`, {
    ...getAuthHeader(),
    params: { filter: 'Exam' }
  })
  return response.data
}

const getAllAssignments = async (courseId) => {
  const response = await axios.get(`${baseURL}/${courseId}/assessments`, {
    ...getAuthHeader(),
    params: { filter: 'Assignment' }
  })
  return response.data
}

const submitAssessment = async (courseId, assessment) => {
  const response = await axios.post(
    `${baseURL}/${courseId}/assessments`,
    assessment,
    getAuthHeader()
  )
  return response.data
}

const deleteAssessment = async (courseId, assessmentId) => {
  const response = await axios.delete(
    `${baseURL}/${courseId}/${assessmentId}`,
    getAuthHeader()
  )
  return response.data
}

const assessmentsService = {
  getAllExams,
  getAllAssignments,
  submitAssessment,
  deleteAssessment
}
export default assessmentsService
