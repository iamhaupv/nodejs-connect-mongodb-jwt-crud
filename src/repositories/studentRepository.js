const Exception = require("../exceptions/Exception");
const { Student } = require("../models/index");
const {faker}  =  require('@faker-js/faker')
//
const getAllStudents = async ({
    page, 
    size,
    searchString,
}) => {
    //aggregate data for all students
    page = parseInt(page)
    size = parseInt(size)
    //searchString? name, email, address contains searchString
    let filteredStudents = await Student.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: {$regex: `.*${searchString}.*`, $options: 'i'} //ignore case
                    },
                    {
                        email: {$regex: `.*${searchString}.*`, $options: 'i'} //ignore case
                    },
                    {
                        address: {$regex: `.*${searchString}.*`, $options: 'i'} //ignore case
                    }
                ]
            }
        },
        {$skip: (page - 1) * size},
        {$limit: size},
    ])
    return filteredStudents
}
const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  try {
    const student = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address,
    });
    return student;
  } catch (exception) {
    if (!!exception.errors) {
      //error from validations
      throw new Exception("Input error", exception.errors);
    }
  }
};
//
async function generateFakeStudents() {
  let fakeStudents = [];
  for (let i = 0; i < 1000; i++) {
    let fakeStudent = {
      name: `${faker.fullName.fullName()}-fake`,
      email: faker.internet.email(),
      languages: [
        faker.helpers.arrayElement(["English", "Vietnamese", "French"]),
        faker.helpers.arrayElement(["Korean", "Japanese", "Chinese"]),
      ],
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      phoneNumber: faker.phone.number(),
      address: faker.streetAddress.streetAddress(),
    };
    fakeStudents.push(fakeStudent);
  }
  await Student.insertMany(fakeStudents);
}
const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Exception("Cannot find Student with id " + studentId);
  }
  return student;
};
const updateStudent = async ({
    id,
    name, 
    email, 
    languages, 
    gender, 
    phoneNumber,
    address
}) => {    
    const student = await Student.findById(id)      
    student.name = name ?? student.name
    student.email = email ?? student.email
    student.languages = languages ?? student.languages
    student.gender = gender ?? student.gender
    student.phoneNumber = phoneNumber ?? student.phoneNumber
    student.address = address ?? student.address
    await student.save()
    return student    
}
module.exports = {
  generateFakeStudents,
  getAllStudents,
  insertStudent,
  getStudentById,
  updateStudent
};
