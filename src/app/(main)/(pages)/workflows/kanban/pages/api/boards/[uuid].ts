// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/db';
import { validate } from 'uuid';
import { Column } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@clerk/nextjs/server';
import { randomHexColor } from '../../../utils/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = auth(); // Get authenticated user ID from Clerk
    if (!userId) {
        return res.status(401).end('Unauthorized');
    }
    if (!req.query.uuid || !validate(req.query.uuid.toString())) {
        return res.status(400).end('Invalid board UUID');
    }
    switch (req.method) {
        case 'DELETE': {
            return await deleteBoard(req, res, userId);
        }
        case 'GET': {
            return await getBoard(req, res, userId);
        }
        case 'PUT': {
            return await updateBoard(req, res, userId);
        }
        default:
            return res.status(405).end('Method not allowed');
    }
}

const deleteBoard = async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    const boardUUID = req.query.uuid?.toString();
    if (!boardUUID) {
        return res.status(400).end('Board UUID is required');
    }
    const result = await prisma.board.deleteMany({
        where: {
            uuid: boardUUID,
            clerkId: userId,
        },
    });
    if (result.count === 0) return res.status(404).end('Board not found');
    return res.status(200).end();
};

const getBoard = async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    try {
        const board = await prisma.board.findFirst({
            where: {
                uuid: req.query.uuid?.toString(),
                clerkId: userId,
            },
            include: {
                columns: {
                    include: {
                        tasks: {
                            include: {
                                subtasks: {
                                    orderBy: {
                                        id: 'asc',
                                    },
                                },
                            },
                            orderBy: {
                                position: 'asc',
                            },
                        },
                    },
                    orderBy: {
                        position: 'asc',
                    },
                },
            },
        });
        if (!board) {
            res.status(404).end('Board not found');
        } else {
            res.status(200).json(board);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const updateBoard = async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    const boardUUID = req.query.uuid?.toString();
    const currentBoardData = await prisma.board.findFirst({
        where: {
            uuid: boardUUID,
            clerkId: userId,
        },
        include: {
            columns: true,
        },
    });
    if (!currentBoardData) {
        return res.status(404).end('Board not found');
    }
    const columns: Column[] = req.body.columns;
    const columnsToDelete: string[] = [];

    if (columns) {
        const set = new Set();
        if (columns.some((col) => set.size === (set.add(col.name), set.size))) {
            return res.status(400).json({ error: 'Column names must be unique' });
        }
    }

    // Find out which columns were removed and delete them
    for (const column of currentBoardData.columns) {
        const found = columns.find((c) => c.uuid === column.uuid);
        if (!found) {
            columnsToDelete.push(column.uuid);
        }
    }
    // Create a new array of columns
    for (const column of columns) {
        if (!column.uuid) {
            column.uuid = uuidv4();
        }
    }

    await prisma.$transaction(async () => {
        if (req.body.name !== currentBoardData.name) {
            await prisma.board.updateMany({
                where: { uuid: boardUUID, clerkId: userId },
                data: { name: req.body.name },
            });
        }
        if (columnsToDelete.length) {
            await prisma.column.deleteMany({
                where: {
                    uuid: {
                        in: columnsToDelete,
                    },
                },
            });
        }
        for (const column of columns) {
            await prisma.column.upsert({
                where: {
                    uuid: column.uuid,
                },
                create: {
                    uuid: column.uuid,
                    name: column.name,
                    position: column.position,
                    clerkId: userId,
                    color: column.color || randomHexColor(),
                    board: {
                        connect: {
                            uuid: boardUUID,
                        },
                    },
                },
                update: {
                    name: column.name,
                    position: column.position,
                },
            });
        }
        return res.status(200).json('Board updated');
    });
};
