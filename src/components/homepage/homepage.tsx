import { revalidatePath } from "../../../node_modules/next/cache";
import {prisma} from "../../app/db"

export default async function Homepage() {
    const todos = await prisma.todo.findMany();

    async function addTodo(formData:FormData){
        "use server"
        const message = formData.get("createTodo")
        await prisma.todo.create({
            data:{
                content: message?.toString(),
            },
        });
        revalidatePath("/")
    }
    async function delTodo(formData: FormData) {
        "use server"
        const id = formData.get("todoId")
        await prisma.todo.delete({
            where:{
                id: parseInt(id),
            },
        });
        revalidatePath("/")
        
    }
    return (
        <div className='flex max-w-screen-lg w-full px-4 py-4 flex-col space-x-5 gap-4'>
            <h1>Moje Todo</h1>
            <form action={addTodo} className="flex w-full justify-between gap-4 ">
                <input name="createTodo" className="w-full rounded-lg" type="text"/>
                <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Přidat</button>
            </form>
            {
                todos.map((todo: any)=>(
                    <div className="flex flex-row justify-between center bg-slate-300 p-4 rounded-md ">
                        <p>{todo.content}</p>
                        <form action={delTodo}>
                            <button type="submit" name="todoId" value={todo.id} className="cursor-pointer:hover">x</button>
                        </form>
                    </div>
                )
                )}
        </div>
    );
}