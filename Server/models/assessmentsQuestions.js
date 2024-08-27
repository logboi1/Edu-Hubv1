const mongoose = require('mongoose')

const options = {
  discriminatorKey: 'type'
}

const assessmentsQuestionsSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['MCQ', 'Esay'], required: true },
    question_number: { type: Number, required: true },
    points: { type: Number, required: true },
    question_text: { type: String, required: true },
    auto_graded: { type: Boolean, default: false }
  }
  // options
)

assessmentsQuestionsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject.keywords) {
    }
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

assessmentsQuestionsSchema.set('toObject', {
  transform: (document, returnedObject) => {
    if (returnedObject.keywords) {
    }
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const choiceQuestionSchema = new mongoose.Schema(
  {
    choices: [{ type: String, required: true }],
    ans: { type: String, required: true },
    text_match: { type: Boolean, default: false }
  },
  // options
  { discriminatorKey: 'assessmentType' }
)

const writtenQuestionSchema = new mongoose.Schema(
  {
    keywords: [
      {
        key_word: { type: String },
        weight: { type: Number },
        _id: false
      }
    ],
    ans: { type: String, required: true },
    text_match: { type: Boolean, default: false }
  },
  // options
  { discriminatorKey: 'type' }
)

const Question = mongoose.model('Question', assessmentsQuestionsSchema)

const ChoiceQuestion = Question.discriminator(
  'MCQ',
  choiceQuestionSchema,
  // options
  { discriminatorKey: 'type' }
)
const WrittenQuestion = Question.discriminator(
  'Esay',
  writtenQuestionSchema,
  // options
  { discriminatorKey: 'type' }
)

module.exports = {
  Question,
  ChoiceQuestion,
  WrittenQuestion
}
