import { NextRequest, NextResponse } from 'next';
import {prisma} from "../../db";

export async function GET(req: NextRequest, res: NextResponse) {
    const todos = await prisma.todo.findMany();
    res.json(todos);
}

export async function POST(req: NextRequest, res: NextResponse) {
    const { title, content, published } = req.body;
    const todo = await prisma.todo.create({
        data: {
            title,
            content: content,
            published: published
        },
    });
    res.json(todo);
}