import { UserContext } from "@/context/UserContextProvider";
import { useContext } from "react";

const Menu = () => {
    const userContext = useContext(UserContext);

    return (
        <nav className="px-4 flex justify-between bg-slate-50 items-center shadow-sm">
            <div className="flex text-lg items-center">
                <div className="font-heading font-bold bg-pink-500 px-1.5 py-2 text-white mr-2 h-full">
                    T
                </div>
                <span className="font-heading font-semibold text-pink-500">
                    Timesheets
                </span>
            </div>
            {
                userContext.user && (
                    <div className="text-slate-700">
                        Olá, { userContext.user.fullName }
                    </div>
                )
            }
        </nav>
    );
};

export { Menu };
