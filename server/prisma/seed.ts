import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {
  await prisma.habit.deleteMany()
  await prisma.day.deleteMany()

  /**
   * Create habits
   */
  const habit1 = await prisma.habit.create({
    data: {
      title: 'Beber 2L água',
      createdAt: firstHabitCreationDate,
      habitWeekDays: {
        create: [{ week_day: 1 }, { week_day: 2 }, { week_day: 3 }],
      },
    },
  })

  const habit2 = await prisma.habit.create({
    data: {
      title: 'Exercitar',
      createdAt: secondHabitCreationDate,
      habitWeekDays: {
        create: [{ week_day: 3 }, { week_day: 4 }, { week_day: 5 }],
      },
    },
  })

  await prisma.habit.create({
    data: {
      title: 'Dormir 8h',
      createdAt: thirdHabitCreationDate,
      habitWeekDays: {
        create: [
          { week_day: 1 },
          { week_day: 2 },
          { week_day: 3 },
          { week_day: 4 },
          { week_day: 5 },
        ],
      },
    },
  })

  await Promise.all([
    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            habitId: habit1.id,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: {
            habitId: habit2.id,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [{ habitId: habit1.id }, { habitId: habit2.id }],
        },
      },
    }),
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
