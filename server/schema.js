const { gql } = require('apollo-server-express');

module.exports = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    subjects: [String]
    attendance: Int,
    flagged: Boolean
  }

  type EmployeePage {
    employees: [Employee!]!
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
  }

  type User {
   id: ID!
   username: String!
   role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    listEmployees(page: Int, limit: Int, sortBy: String, order: String): EmployeePage
    employee(id: ID!): Employee
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    addEmployee(name: String!, age: Int!, class: String, subjects: [String!], attendance: Int): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String!], attendance: Int): Employee
    deleteEmployee(id: ID!): Boolean
    flagEmployee(id: ID!, flagged: Boolean!): Boolean
    createUser(username: String!, password: String!, role: String!): User
  }
`;
