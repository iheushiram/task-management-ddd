import { PrismaClient } from "../../../../node_modules/.prisma/client/index"

const prisma = new PrismaClient()

async function main() {
  // ユーザーの作成
  const user1 = await prisma.user.create({
    data: {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      name: "John Doe",
      email: "john@example.com",
    },
  })

  const user2 = await prisma.user.create({
    data: {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d480",
      name: "Jane Smith",
      email: "jane@example.com",
    },
  })

  // プロジェクトの作成
  const project = await prisma.project.create({
    data: {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      name: "Sample Project",
      ownerId: user1.id,
    },
  })

  // プロジェクトメンバーの追加
  await prisma.projectMember.createMany({
    data: [
      { projectId: project.id, userId: user1.id },
      { projectId: project.id, userId: user2.id },
    ],
  })

  // タスクの作成
  await prisma.task.create({
    data: {
      id: "b1c2d3e4-f5g6-7890-bcde-f12345678901",
      title: "Sample Task",
      description: "This is a sample task",
      assigneeId: user1.id,
      projectId: project.id,
    },
  })

  console.log("Seed data created successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
