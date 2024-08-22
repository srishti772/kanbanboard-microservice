export interface IUser {
    id?: string; // Optional unique identifier, which can be generated by the backend
    nuid: string; // User's NUID (assumed to be unique)
    firstName: string; // User's first name
    lastName: string; // User's last name
    email: string; // User's email address
    password?: string; // Optional field for password (not usually exposed)
    roles?: 'ROLE_USER' | 'ROLE_ADMIN'; // User roles, with default role as 'ROLE_USER'
  }
  