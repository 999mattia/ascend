import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const products = await prisma.products.findMany({
            where: {
                brand: 'Nike'
            }
        })
        res.status(200).json(products)
    }
}