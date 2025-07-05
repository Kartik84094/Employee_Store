import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        role
      }
    }
  }
`;

export const GET_EMPLOYEES_PAGINATED = gql`
  query ListEmployees($page: Int, $limit: Int, $sortBy: String, $order: String) {
    listEmployees(page: $page, limit: $limit, sortBy: $sortBy, order: $order) {
      employees {
        id
        name
        age
        class
        subjects
        attendance
        flagged
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $age: Int!, $class: String!, $subjects: [String!]!, $attendance: Int!) {
    addEmployee(name: $name, age: $age, class: $class, subjects: $subjects, attendance: $attendance) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $name: String, $age: Int, $class: String, $subjects: [String!], $attendance: Int) {
    updateEmployee(id: $id, name: $name, age: $age, class: $class, subjects: $subjects, attendance: $attendance) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export const FLAG_EMPLOYEE = gql`
  mutation FlagEmployee($id: ID!, $flagged: Boolean!) {
    flagEmployee(id: $id, flagged: $flagged)
  }
`;
