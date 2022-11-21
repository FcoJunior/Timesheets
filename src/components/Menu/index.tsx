const Menu = () => {
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
            <div className="text-slate-700">Olá, Username</div>
        </nav>
    );
};

export { Menu };
