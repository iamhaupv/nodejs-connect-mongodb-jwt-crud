const { studentRepository } = require("../repositories/index");
const MAX_RECORDS = 100
//
async function getAllStudents(req, res) {    
  //http:locahost: 3002?page=1&size=100
  let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
  size = size >= MAX_RECORDS ? MAX_RECORDS : size
  try {
      let filteredStudents = await studentRepository.getAllStudents({
          size, page, searchString
      })
      res.status(200).json({
          message: 'Get students successfully',
          size: filteredStudents.length,        
          page,
          searchString,
          data: filteredStudents,        
      })    
  }catch(exception) {
      res.status(500).json({
          message: exception.message, 
      })
  }
}
async function getStudentById(req, res) {}
async function getStudentById(req, res) {
  let studentId = req.params.id;
  try {
    const student = await studentRepository.getStudentById(studentId);
    res.status(200).json({
      message: "Get detail student successfully",
      data: student,
    });
  } catch (exception) {
    res.status(500).json({
      message: exception.message,
    });
  }
}
async function generateFakeStudents(req, res) {
  await studentRepository.generateFakeStudents(req.body)
  res.status(200).json({
      message: 'Insert fake students successfully',        
  })
}
async function updateStudent(req, res) {
  const {
      id,
      name, 
      email, 
      languages, 
      gender, 
      phoneNumber,
      address
  } = req.body
  //not validate !
  try {
      const student = await studentRepository.updateStudent(req.body)
      res.status(200).json({
          message: 'Update student successfully',            
          data: student,        
      })  
  }catch(exception) {
      res.status(500).json({
          message: exception.message, 
      })
  }
}
async function insertStudent(req, res) {
  try {
    const student = await studentRepository.insertStudent(req.body);
    res.status(200).json({
      message: "Insert student successfully",
      data: student,
    });
  } catch (exception) {
    res.status(500).json({
      message: "Cannot insert student:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudent,
  insertStudent,
  generateFakeStudents
};
