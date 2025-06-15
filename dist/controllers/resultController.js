"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResult = exports.updateResult = exports.getStudentResults = exports.getResults = exports.getResult = exports.createResult = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const subjectResults_1 = require("../utils/subjectResults"); // adjust the import path
const resultValidator_1 = require("../validators/resultValidator");
const resultValidator_2 = require("../validators/resultValidator");
const getGrade_1 = __importDefault(require("../utils/getGrade"));
// @desc Creates New Result
// @route POST /results/:id
// privacy PRIVATE Users
const createResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const validateData = resultValidator_1.createResultSchema.parse(req.body);
    const { session, term, level } = validateData;
    const id = req.params.id;
    const user = req.user;
    if (!user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const student = yield prisma_1.prisma.student.findUnique({
        where: { id },
    });
    if (!student) {
        res.status(400);
        throw new Error('Student does not exist');
    }
    const resultExist = yield prisma_1.prisma.result.findFirst({
        where: {
            studentId: id,
            session,
            term,
            level,
        },
    });
    if (resultExist) {
        res.status(400);
        throw new Error('Result already generated!');
    }
    const addSubjects = (0, subjectResults_1.subjectResults)({ level });
    const baseData = {
        userId: user.id,
        studentId: id,
        level,
        subLevel: student.subLevel,
        firstName: student.firstName,
        lastName: student.lastName,
        otherName: (_a = student.otherName) !== null && _a !== void 0 ? _a : '',
        image: (_b = student.imageUrl) !== null && _b !== void 0 ? _b : '',
        session,
        term,
        subjectResults: addSubjects,
        teacherRemark: '',
        principalRemark: '',
    };
    let result;
    if (level === 'Lower Reception' || level === 'Upper Reception') {
        result = yield prisma_1.prisma.result.create({
            data: baseData,
        });
    }
    else {
        result = yield prisma_1.prisma.result.create({
            data: Object.assign(Object.assign({}, baseData), { position: '', totalScore: 0, averageScore: 0, affectiveAssessment: [
                    { aCategory: 'Attendance', grade: '-' },
                    { aCategory: 'Carefulness', grade: '-' },
                    { aCategory: 'Responsibility', grade: '-' },
                    { aCategory: 'Honesty', grade: '-' },
                    { aCategory: 'Neatness', grade: '-' },
                    { aCategory: 'Obedience', grade: '-' },
                    { aCategory: 'Politeness', grade: '-' },
                    { aCategory: 'Punctuality', grade: '-' },
                ], psychomotor: [
                    { pCategory: 'Handwriting', grade: '-' },
                    { pCategory: 'Drawing', grade: '-' },
                    { pCategory: 'Sport', grade: '-' },
                    { pCategory: 'Speaking', grade: '-' },
                    { pCategory: 'Music', grade: '-' },
                    { pCategory: 'Craft', grade: '-' },
                    { pCategory: 'ComputerPractice', grade: '-' },
                ] }),
        });
    }
    res.status(200).json(result);
}));
exports.createResult = createResult;
// @GET ALL RESULT
// @route GET api/results
// @privacy Private
const getResults = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const level = req.query.level;
    const keyword = req.query.keyword;
    const page = parseInt(req.query.pageNumber) || 1;
    const pageSize = 30;
    // Prisma filter
    const whereClause = Object.assign(Object.assign({}, (keyword && {
        OR: [
            { firstName: { contains: keyword, mode: 'insensitive' } },
            { lastName: { contains: keyword, mode: 'insensitive' } },
            { otherName: { contains: keyword, mode: 'insensitive' } },
        ],
    })), (level &&
        level !== 'All' && {
        level: { contains: level, mode: 'insensitive' },
    }));
    // If not admin, filter by their level/subLevel
    if (!user.isAdmin) {
        whereClause.level = user.level;
        whereClause.subLevel = user.subLevel;
    }
    const [results, totalCount] = yield Promise.all([
        prisma_1.prisma.result.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            skip: pageSize * (page - 1),
            take: pageSize,
        }),
        prisma_1.prisma.result.count({
            where: whereClause,
        }),
    ]);
    res.status(200).json({
        results,
        page,
        totalPages: Math.ceil(totalCount / pageSize),
    });
}));
exports.getResults = getResults;
// @GET STUDENT RESULT
// @route GET api/results/:id
// @privacy Private
const getResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.result.findFirst({
        where: {
            id: req.params.id,
        },
    });
    if (!result) {
        res.status(404);
        throw new Error('Result does not exist');
    }
    // If a student is making the request
    if (req.student) {
        const isOwner = req.student.id.toString() === result.studentId.toString();
        if (!isOwner) {
            res.status(401);
            throw new Error('Unauthorized Access!');
        }
        if (!result.isPaid) {
            res.status(401);
            throw new Error('Unable to access result, Please contact the admin');
        }
    }
    // If a teacher (user) is making the request, allow access regardless of isPaid
    // No additional checks needed unless you want to restrict teachers to only certain results
    res.status(200).json(result);
}));
exports.getResult = getResult;
const getStudentResults = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const user = req.user;
        if (!studentId) {
            res.status(400);
            throw new Error('invalid studentId');
        }
        const results = yield prisma_1.prisma.result.findMany({
            where: {
                studentId,
            },
        });
        if (!results) {
            res.status(404);
            throw new Error('Results not found!');
        }
        // If a student is making the request
        if (req.student) {
            const isOwner = req.student.id.toString() === studentId.toString();
            if (!isOwner) {
                res.status(401);
                throw new Error('Unauthorized Access!');
            }
        }
        res.status(200).json(results);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}));
exports.getStudentResults = getStudentResults;
const updateResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const validatedData = resultValidator_2.updateResultSchema.parse(req.body);
    const { subject, test, exam, grade, affectiveAssessments, psychomotorAssessments, teacherRemark, principalRemark, } = validatedData;
    // const testScore = Number(test);
    // const examScore = Number(exam);
    const result = yield prisma_1.prisma.result.findUnique({
        where: { id: req.params.id },
    });
    if (!result) {
        res.status(404);
        throw new Error('Result not found');
    }
    // if (
    //   result.level !== req.user.level ||
    //   result.subLevel !== req.user.subLevel
    // ) {
    //   res.status(401);
    //   throw new Error(
    //     'Unable to update this result, Please contact the class teacher'
    //   );
    // }
    // --- Update subjectResults array ---
    let updatedSubjectResults = result.subjectResults;
    if (subject) {
        const index = updatedSubjectResults.findIndex((s) => s.subject === subject);
        if (index === -1) {
            res.status(404);
            throw new Error('Subject not found in results');
        }
        const subjectToUpdate = updatedSubjectResults[index];
        if (result.level === 'Lower Reception' ||
            result.level === 'Upper Reception') {
            subjectToUpdate.grade = grade || subjectToUpdate.grade;
        }
        else {
            subjectToUpdate.testScore = test || subjectToUpdate.testScore;
            subjectToUpdate.examScore = exam || subjectToUpdate.examScore;
            subjectToUpdate.totalScore =
                subjectToUpdate.testScore + subjectToUpdate.examScore;
            subjectToUpdate.grade = (0, getGrade_1.default)(subjectToUpdate.totalScore);
        }
        updatedSubjectResults[index] = subjectToUpdate;
    }
    // --- Update affectiveAssessment array ---
    let updatedAffective = result.affectiveAssessment;
    if (affectiveAssessments === null || affectiveAssessments === void 0 ? void 0 : affectiveAssessments.length) {
        updatedAffective = updatedAffective.map((a) => {
            const incoming = affectiveAssessments.find((x) => x.aCategory === a.aCategory);
            return incoming ? Object.assign(Object.assign({}, a), { grade: incoming.grade }) : a;
        });
    }
    // --- Update psychomotor array ---
    let updatedPsychomotor = result.psychomotor;
    if (psychomotorAssessments === null || psychomotorAssessments === void 0 ? void 0 : psychomotorAssessments.length) {
        updatedPsychomotor = updatedPsychomotor.map((p) => {
            const incoming = psychomotorAssessments.find((x) => x.pCategory === p.pCategory);
            return incoming ? Object.assign(Object.assign({}, p), { grade: incoming.grade }) : p;
        });
    }
    // --- Recalculate total and average ---
    const totalScore = updatedSubjectResults.reduce((acc, s) => acc + s.totalScore, 0);
    const averageScore = totalScore / updatedSubjectResults.length;
    const updatedResult = yield prisma_1.prisma.result.update({
        where: { id: result.id },
        data: {
            subjectResults: updatedSubjectResults,
            affectiveAssessment: updatedAffective,
            psychomotor: updatedPsychomotor,
            totalScore,
            averageScore,
            teacherRemark: teacherRemark || result.teacherRemark,
            principalRemark: principalRemark || result.principalRemark,
        },
    });
    res.status(200).json(updatedResult);
}));
exports.updateResult = updateResult;
const deleteResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.result.findFirst({
        where: {
            id: req.params.id,
        },
    });
    if (!result) {
        res.status(404);
        throw new Error('Result not found!');
    }
    yield prisma_1.prisma.result.delete({
        where: {
            id: result.id,
        },
    });
    res.status(200).json({ message: 'Result Deleted successfully' });
}));
exports.deleteResult = deleteResult;
