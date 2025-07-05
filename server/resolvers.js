const Employee = require('./models/Employee');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET_KEY;

module.exports = {
    Query: {
        listEmployees: async (_, { page = 1, limit = 6, sortBy = 'name', order = 'asc' }) => {
            const skip = (page - 1) * limit;
            const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
            const employees = await Employee.find().sort(sort).skip(skip).limit(limit);
            const totalCount = await Employee.countDocuments();
            return {
                employees,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        },
        employee: (_, { id }) => Employee.findById(id),
    },
    Mutation: {
        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user || !(await bcrypt.compare(password, user.password)))
                throw new Error('Invalid credentials');

            const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1d' });
            return { token, user };
        },
        addEmployee: (_, args, context) => {
            if (context.user?.role !== 'admin') throw new Error('Unauthorized');
            return Employee.create(args);
        },
        updateEmployee: async (_, { id, ...rest }, context) => {
            if (context.user?.role !== 'admin') throw new Error('Unauthorized');
            return Employee.findByIdAndUpdate(id, rest, { new: true });
        },
        deleteEmployee: async (_, { id }, context) => {
            if (context.user?.role !== 'admin') throw new Error('Unauthorized');
            await Employee.findByIdAndDelete(id);
            return true;
        },
        flagEmployee: async (_, { id, flagged }, context) => {
            if (context.user?.role !== 'admin') throw new Error('Unauthorized');
            await Employee.findByIdAndUpdate(id, {flagged}, { new: true });
            return true;
        },
        createUser: async (_, { username, password, role }, context) => {
            if (context.user?.role !== 'admin') {
                throw new Error('Unauthorized: Only admin can create users');
            }

            const existing = await User.findOne({ username });
            if (existing) {
                throw new Error('Username already exists');
            }

            const user = new User({ username, password, role });
            await user.save();
            return {
                id: user._id,
                username: user.username,
                role: user.role
            };
        },
    },
};
