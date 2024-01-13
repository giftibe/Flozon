import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png"
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/carts";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";

import { authOptions } from "../../lib/authOptions";


async function searchProducts(formData: FormData) {
    "use server"

    const searchQuery = formData.get('searchQuery')?.toString();

    if (searchQuery) {
        redirect('/search/?query=' + searchQuery)
    }
}

export default async function navbar() {
    const session = await getServerSession(authOptions)
    const cart = await getCart()

    return (
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href={'/'} className="btn btn-ghost text-xl normal-case">
                        <Image src={Logo} width={40} height={40} alt="company Logo" />
                        Flozon
                    </Link>
                </div>

                <div className="flex-none gap-2">
                    <form action={searchProducts} className="form-control">
                        <input type="text"
                            name="searchQuery"
                            placeholder="Search"
                            className="input input-bordered w-full min-w-[100px]"
                        />

                    </form>
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session} />

                </div>
            </div>

        </div>
    )
}
