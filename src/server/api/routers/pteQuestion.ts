import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {z} from "zod";

export const pteQuestionRouter= createTRPCRouter({

    list: publicProcedure.query(({ ctx }) => {
        return ctx.db.pte_question.findMany();
    }),

    create: publicProcedure
        .input(z.object({
            questionNo: z.string().min(1),
            title: z.string().min(1),
            type: z.string().min(1),
            content: z.string().min(1)
        }))
        .mutation(async ({ ctx, input }) => {

            await new Promise((resolve) => setTimeout(resolve, 1000));

            return ctx.db.pte_question.create({
                data: {
                    question_no: input.questionNo,
                    type: input.type,
                    title: input.title,
                    content: input.content
                },
            });
    }),
});
