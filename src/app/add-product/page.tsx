import { prisma } from "@/lib/db/prisma"
import FormSubmitButtom from '@/components/FormSubmitButtom'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { authOptions } from "../../lib/authOptions";

export const metadata = {
    title: 'Add Product - Flozon'
}

async function addProduct(formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('api/auth/Sign?callbackUrl=/add-product')
    }

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const price = Number(formData.get('price') || 0);

    if (!name || !description || !imageUrl || !price) {
        throw Error('Misssing required field')
    }
    await prisma.product.create({
        data: { name, description, imageUrl, price }
    })
    redirect('/')

}

export default async function AddProductPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('api/auth/Sign?callbackUrl=/add-product')
    }
    return (
        <div>
            <h1 className='text-lg mb-3 font-bold'>Add Product</h1>
            <form action={addProduct}>
                <input
                    required
                    name='name'
                    placeholder='Name'
                    className='mb-3 w-full input input-bordered'
                />
                <textarea
                    name="description"
                    required
                    placeholder='Description'
                    className='textarea textarea-bordered mb-3 w-fit '
                />
                <input
                    required
                    name='imageUrl'
                    placeholder='Image URL'
                    type='url'
                    className='mb-3 w-full input input-bordered'
                />
                <input
                    required
                    name='price'
                    placeholder='Price'
                    type='number'
                    className='mb-3 w-full input input-bordered'
                />
                <FormSubmitButtom className='btn-block '
                >
                    Add Product
                </FormSubmitButtom>
            </form>

        </div>
    )
}
